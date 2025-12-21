// FILE: src/app/api/billing/portal/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
    if (!stripeSecret) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    const stripe = new Stripe(stripeSecret, { apiVersion: "2025-10-29.clover" });

    const { tenantId } = await assertTenantWriteContext(req as any);

    const db = getAdminFirestore();
    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    const tenantData = tenantSnap.exists ? (tenantSnap.data() as any) : null;
    const customerId = tenantData?.stripeCustomerId || null;
    if (!customerId) {
      return NextResponse.json({ error: "No Stripe customer for this account." }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || new URL(req.url).origin;
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return handleTenantApiError(err, "[billing portal] error");
  }
}
