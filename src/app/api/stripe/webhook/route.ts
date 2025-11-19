import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { logBillingEvent } from "@/lib/billing";
import { resolvePlanConfig } from "@/lib/billing";

const PRICE_TO_PLAN: Record<string, { planId: "agency_core" | "agency_scale" }> = {};
if (process.env.STRIPE_AGENCY_CORE_PRICE_ID) {
  PRICE_TO_PLAN[process.env.STRIPE_AGENCY_CORE_PRICE_ID] = { planId: "agency_core" };
}
if (process.env.STRIPE_AGENCY_SCALE_PRICE_ID) {
  PRICE_TO_PLAN[process.env.STRIPE_AGENCY_SCALE_PRICE_ID] = { planId: "agency_scale" };
}
const AGENCY_PLAN_PRICE_IDS = new Set(Object.keys(PRICE_TO_PLAN));

export const dynamic = "force-dynamic";

async function findTenantIdByCustomer(customerId: string) {
  const db = getAdminFirestore();
  const snap = await db
    .collection("tenants")
    .where("stripeCustomerId", "==", customerId)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return snap.docs[0].id;
}

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json({ ok: false, error: "missing-keys" }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-10-29.clover" });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ ok: false, error: "no-signature" }, { status: 400 });

  const buf = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error("[stripe/webhook] signature verify failed", err?.message);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const obj = event.data.object as any;
    const customerId: string | null = obj?.customer
      ? typeof obj.customer === "string"
        ? obj.customer
        : obj.customer?.id
      : null;
    const tenantId = customerId ? await findTenantIdByCustomer(customerId) : null;

    const db = getAdminFirestore();

    const logEvent = async (type: string, amount?: number | null, status?: string) => {
      if (!tenantId) return;
      await db
        .collection("tenants")
        .doc(tenantId)
        .collection("events")
        .add({
          type,
          amount: amount ?? null,
          status: status ?? null,
          createdAt: new Date(),
          stripeEventId: event.id,
        })
        .catch(() => null);
      await logBillingEvent(tenantId, {
        type,
        amount: amount ?? undefined,
        billingPeriod: undefined,
        status,
      }).catch(() => null);
    };

    switch (event.type) {
      case "checkout.session.completed": {
        const customerRef = obj?.customer
          ? typeof obj.customer === "string"
            ? obj.customer
            : obj.customer?.id
          : null;
        const plan =
          (obj?.metadata?.planId as string) ||
          (obj?.metadata?.sylor_plan as string) ||
          "agency_core";
        let tenant = tenantId;
        if (!tenant && customerId) {
          tenant = await findTenantIdByCustomer(customerId);
        }
        const tenantDocId =
          tenant ||
          (obj?.metadata?.tenantId as string) ||
          (obj?.metadata?.sylor_tenant_id as string) ||
          (obj?.client_reference_id as string) ||
          null;
        if (tenantDocId) {
          const existingSnap = await db.collection("tenants").doc(tenantDocId).get();
          const existing = existingSnap.exists ? (existingSnap.data() as any) : {};
          const priceId =
            (obj?.metadata?.priceId as string) ||
            (obj?.metadata?.price_id as string) ||
            (obj?.display_items?.[0]?.price?.id as string) ||
            (obj?.line_items?.data?.[0]?.price?.id as string) ||
            (obj?.subscription_details?.metadata?.price as string) ||
            "";
          const isAgencyPlan = priceId ? AGENCY_PLAN_PRICE_IDS.has(priceId) : false;
          const mappedPlanId =
            priceId && PRICE_TO_PLAN[priceId] ? PRICE_TO_PLAN[priceId].planId : plan;
          if (isAgencyPlan && !mappedPlanId) {
            console.error("[stripe/webhook] Unknown agency priceId", priceId);
            break;
          }
          const planConfig = resolvePlanConfig(mappedPlanId || plan);
          const tenantUpdate: Record<string, any> = {
            stripeCustomerId: customerRef,
            planId: mappedPlanId,
            updatedAt: new Date(),
            hasActiveSubscription: !!isAgencyPlan,
            monthlySmsLimit: planConfig.includedSms || null,
            overageRate: planConfig.overagePerSms ?? null,
          };
          if (isAgencyPlan && existing?.type !== "client") {
            tenantUpdate.type = "agency";
            tenantUpdate.parentAgencyId = null;
            tenantUpdate.planId = mappedPlanId;
          } else if (!isAgencyPlan && existing?.type !== "client") {
            tenantUpdate.type = "direct";
            tenantUpdate.parentAgencyId = null;
            tenantUpdate.planId = mappedPlanId || plan;
          }
          await db.collection("tenants").doc(tenantDocId).set(tenantUpdate, { merge: true });
        }
        break;
      }
      case "invoice.finalized": {
        const amount = obj?.amount_due ? obj.amount_due / 100 : null;
        await logEvent("invoice_finalized", amount, obj?.status ?? null);
        break;
      }
      case "invoice.paid": {
        const amount = obj?.amount_paid ? obj.amount_paid / 100 : null;
        await logEvent("invoice_paid", amount, obj?.status ?? "paid");
        break;
      }
      case "invoice.payment_failed": {
        const amount = obj?.amount_due ? obj.amount_due / 100 : null;
        await logEvent("invoice_payment_failed", amount, obj?.status ?? "failed");
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe/webhook] handler error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
