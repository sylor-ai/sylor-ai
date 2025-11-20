import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getActiveTenantForRequest } from "@/lib/tenant-context";
import type { PlanId } from "@/types";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const envAppUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!stripeSecret) {
  console.warn("[checkout] STRIPE_SECRET_KEY is missing in env");
}

const stripe = new Stripe(stripeSecret || "", {
  apiVersion: "2025-10-29.clover",
});

const PLAN_TO_PRICE: Record<PlanId, string | undefined> = {
  agency_core: process.env.STRIPE_AGENCY_CORE_PRICE_ID,
  agency_scale: process.env.STRIPE_AGENCY_SCALE_PRICE_ID,
};

export async function POST(req: NextRequest) {
  try {
    const { tenantId, tenant, user } = await getActiveTenantForRequest(req as any);
    if (!user) {
      throw Object.assign(new Error("unauthorized"), { status: 401 });
    }
    if (!tenantId || !tenant) {
      throw Object.assign(new Error("no-tenant"), { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const plan = (body.planId || body.plan || "") as PlanId;
    if (!plan || !["agency_core", "agency_scale"].includes(plan)) {
      return NextResponse.json({ ok: false, error: "Invalid plan" }, { status: 400 });
    }

    const priceId = PLAN_TO_PRICE[plan];

    if (!stripeSecret) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    if (!priceId) {
      console.error("[checkout] Plan not configured", {
        planId: plan,
        env_core_set: !!process.env.STRIPE_AGENCY_CORE_PRICE_ID,
        env_scale_set: !!process.env.STRIPE_AGENCY_SCALE_PRICE_ID,
      });
      return NextResponse.json(
        { ok: false, error: "Plan not configured", planId: plan },
        { status: 400 }
      );
    }

    const forwardedProto = req.headers.get("x-forwarded-proto");
    const forwardedHost = req.headers.get("x-forwarded-host");
    const host = req.headers.get("host");

    const headerUrl =
      forwardedProto && forwardedHost
        ? `${forwardedProto}://${forwardedHost}`
        : host
        ? `${req.nextUrl.protocol}//${host}`
        : null;

    // Prefer the current request host (important for localhost) and fallback to NEXT_PUBLIC_APP_URL.
    const baseUrl =
      headerUrl && headerUrl.startsWith("http")
        ? headerUrl
        : envAppUrl && envAppUrl.startsWith("http")
        ? envAppUrl
        : "http://localhost:3000";

    const db = getAdminFirestore();
    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    const tenantData = tenantSnap.exists ? (tenantSnap.data() as any) : null;
    let stripeCustomerId = tenantData?.stripeCustomerId || null;

    if (stripeCustomerId) {
      // Validate existing customer; if it no longer exists, create a fresh one.
      try {
        await stripe.customers.retrieve(stripeCustomerId);
      } catch (err: any) {
        const code = err?.code || err?.raw?.code;
        if (code === "resource_missing") {
          stripeCustomerId = null;
        } else {
          throw err;
        }
      }
    }

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        metadata: { tenantId },
      });
      stripeCustomerId = customer.id;
      await db.collection("tenants").doc(tenantId).set({ stripeCustomerId }, { merge: true });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: stripeCustomerId || undefined,
      success_url: `${baseUrl}/signup/success?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/billing/activate?plan=${plan}&status=cancelled`,
      client_reference_id: tenantId,
      metadata: {
        sylor_plan: plan,
        sylor_tenant_id: tenantId,
        planId: plan,
        tenantId,
        priceId,
      },
    });

    return NextResponse.json({ ok: true, url: session.url, sessionId: session.id });
  } catch (err: any) {
    console.error("[checkout] Stripe error:", err);
    const status =
      typeof err?.status === "number"
        ? err.status
        : err?.message === "unauthorized"
        ? 401
        : err?.message === "no-tenant"
        ? 400
        : 500;

    return NextResponse.json(
      { ok: false, error: err?.message ?? "internal-error" },
      { status }
    );
  }
}
