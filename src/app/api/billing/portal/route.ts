// FILE: src/app/api/billing/portal/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
    if (!stripeSecret) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    const stripe = new Stripe(stripeSecret, { apiVersion: "2025-10-29.clover" });

    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const db = getAdminFirestore();
    const tenantSnap = await db.collection("tenants").doc(decoded.uid).get();
    const tenant = tenantSnap.exists ? (tenantSnap.data() as any) : null;
    const customerId = tenant?.stripeCustomerId;
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
    console.error("[billing portal] error", err);
    return NextResponse.json({ error: err?.message || "server-error" }, { status: 500 });
  }
}

