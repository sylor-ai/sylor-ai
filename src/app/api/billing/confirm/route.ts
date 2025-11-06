// FILE: src/app/api/billing/confirm/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

    const { sessionId } = await req.json().catch(() => ({} as any));
    if (!sessionId) return NextResponse.json({ ok: false, error: "missing-sessionId" }, { status: 400 });

    const secret = process.env.STRIPE_SECRET_KEY || "";
    if (!secret) return NextResponse.json({ ok: false, error: "stripe-misconfigured" }, { status: 500 });

    const stripe = new Stripe(secret, { apiVersion: "2025-10-29.clover" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const planId = ((session.metadata?.planId as string) || (session.metadata?.sylor_plan as string) || "").toLowerCase();
    const tenantId = ((session.metadata?.tenantId as string) || (session.client_reference_id as string) || "").trim();

    if (!planId || !tenantId) {
      return NextResponse.json({ ok: false, error: "missing-metadata" }, { status: 400 });
    }

    const db = getAdminFirestore();
    await db.collection("tenants").doc(tenantId).set(
      {
        id: tenantId,
        planId,
        stripeCustomerId: session.customer?.toString() || null,
        updatedAt: Date.now(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[billing/confirm]", e);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}

