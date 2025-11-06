// FILE: src/app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-10-29.clover" });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ ok: false }, { status: 400 });

  const buf = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error("[stripe webhook] signature verify failed", err?.message);
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const db = getAdminFirestore();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const plan = (
          (session.metadata?.planId as string) ||
          (session.metadata?.sylor_plan as string) ||
          "starter"
        ).toLowerCase();
        const tenantId = (
          (session.metadata?.tenantId as string) ||
          (session.metadata?.sylor_tenant_id as string) ||
          (session.client_reference_id as string) ||
          ""
        ).trim();
        const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;

        if (tenantId) {
          await db
            .collection("tenants")
            .doc(tenantId)
            .set(
              {
                id: tenantId,
                planId: plan,
                stripeCustomerId: customerId || null,
                updatedAt: Date.now(),
              },
              { merge: true }
            );
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
        if (customerId) {
          // Optional: mark plan as unpaid or grace period
          // You can query tenants where stripeCustomerId == customerId
        }
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe webhook] handler error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
