import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: "2025-10-29.clover",
    })
  : null;

type ParamsPromise = Promise<{ tenantId: string }>;

export async function POST(
  _req: Request,
  context: { params: ParamsPromise }
) {
  try {
    await requireSuperAdmin();

    const { tenantId } = await context.params;

    if (!tenantId) {
      return NextResponse.json(
        { ok: false, error: "Missing tenantId" },
        { status: 400 }
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { ok: false, error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const tenantRef = adminDb.collection("tenants").doc(tenantId);
    const snap = await tenantRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "Tenant not found" },
        { status: 404 }
      );
    }

    const data = snap.data() || {};
    const stripeSubscriptionId = data.stripeSubscriptionId as
      | string
      | undefined;

    if (stripeSubscriptionId) {
      await stripe.subscriptions.update(stripeSubscriptionId, {
        cancel_at_period_end: true,
      });
    }

    await tenantRef.update({
      hasActiveSubscription: false,
      status: "canceled",
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[admin] cancel-subscription failed", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}
