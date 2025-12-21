// FILE: src/app/api/billing/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { resolvePlanConfig } from "@/lib/billing";
import { assertTenantWriteContext } from "@/lib/tenant-context";

const PRICE_TO_PLAN: Record<string, { planId: "agency_core" | "agency_scale" }> = {};
if (process.env.STRIPE_AGENCY_CORE_PRICE_ID) {
  PRICE_TO_PLAN[process.env.STRIPE_AGENCY_CORE_PRICE_ID] = { planId: "agency_core" };
}
if (process.env.STRIPE_AGENCY_SCALE_PRICE_ID) {
  PRICE_TO_PLAN[process.env.STRIPE_AGENCY_SCALE_PRICE_ID] = { planId: "agency_scale" };
}
const AGENCY_PLAN_PRICE_IDS = new Set(Object.keys(PRICE_TO_PLAN));

export async function POST(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenantId: activeTenant } = await assertTenantWriteContext(req as any);
    const { sessionId } = await req.json().catch(() => ({} as any));
    if (!sessionId) return NextResponse.json({ ok: false, error: "missing-sessionId" }, { status: 400 });

    const secret = process.env.STRIPE_SECRET_KEY || "";
    if (!secret) return NextResponse.json({ ok: false, error: "stripe-misconfigured" }, { status: 500 });

    const stripe = new Stripe(secret, { apiVersion: "2025-10-29.clover" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const planIdRaw = ((session.metadata?.planId as string) || (session.metadata?.sylor_plan as string) || "").toLowerCase();
    const tenantId = ((session.metadata?.tenantId as string) || (session.client_reference_id as string) || "").trim();
    const priceId =
      (session.metadata?.priceId as string) ||
      (session.metadata?.price_id as string) ||
      session?.line_items?.data?.[0]?.price?.id ||
      "";

    if (!planIdRaw || !tenantId) {
      return NextResponse.json({ ok: false, error: "missing-metadata" }, { status: 400 });
    }
    if (tenantId !== activeTenant) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    const mappedPlanId = priceId && PRICE_TO_PLAN[priceId] ? PRICE_TO_PLAN[priceId].planId : null;
    if (!mappedPlanId) {
      console.error("[billing/confirm] Unknown Stripe priceId", priceId);
      return NextResponse.json({ ok: false, error: "unknown-price" }, { status: 400 });
    }

    const isAgencyPlan = priceId ? AGENCY_PLAN_PRICE_IDS.has(priceId) : false;
    const planId = mappedPlanId || planIdRaw || "agency_core";
    const planConfig = resolvePlanConfig(planId);

    const db = getAdminFirestore();
    const tenantRef = db.collection("tenants").doc(tenantId);
    const existingSnap = await tenantRef.get();
    const existing = existingSnap.exists ? (existingSnap.data() as any) : {};

    const updates: Record<string, any> = {
      id: tenantId,
      planId,
      stripeCustomerId: session.customer?.toString() || null,
      updatedAt: Date.now(),
      hasActiveSubscription: true,
      monthlySmsLimit: planConfig.includedSms || null,
      overageRate: planConfig.overagePerSms ?? null,
    };

    if (isAgencyPlan && existing?.type !== "client") {
      updates.type = "agency";
      updates.parentAgencyId = null;
    } else if (!isAgencyPlan && existing?.type !== "client") {
      updates.type = "direct";
      updates.parentAgencyId = null;
    }

    await tenantRef.set(updates, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[billing/confirm]", e);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
