import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { adminDb } from "@/lib/firebase-admin";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: "2024-06-20" })
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

    const ref = adminDb.collection("tenants").doc(tenantId);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "Tenant not found" },
        { status: 404 }
      );
    }

    const tenant = snap.data() || {};
    const subscriptionId = tenant.stripeSubscriptionId as string | undefined;

    if (subscriptionId) {
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    }

    await ref.update({
      hasActiveSubscription: false,
      status: "canceled",
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[admin] cancel-subscription failed", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to cancel subscription" },
      { status: err?.status ?? 500 }
    );
  }
}
