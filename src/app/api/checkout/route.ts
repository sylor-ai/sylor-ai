import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { verifyIdTokenFromRequest, getAdminFirestore } from "@/lib/firebase-admin";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

// you *can* still set it in Vercel → Environment Variables
// e.g. NEXT_PUBLIC_APP_URL=https://sylor.ai
const envAppUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!stripeSecret) {
  console.warn("⚠️ STRIPE_SECRET_KEY is missing in .env.local / env");
}

const stripe = new Stripe(stripeSecret || "", {
  apiVersion: "2025-10-29.clover",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const requestedPlan = (body.plan || body.planId || "").toLowerCase();
    const priceId =
      body.priceId ||
      (plan === "pro"
        ? "price_1SN3RrHBRIMb0ChwjSIbQaYn"
        : "price_1SN3ReHBRIMb0ChwEPz1g2w5");
    // Infer plan from priceId if not provided
    const proPrice = "price_1SN3RrHBRIMb0ChwjSIbQaYn";
    const starterPrice = "price_1SN3ReHBRIMb0ChwEPz1g2w5";
    const plan = requestedPlan || (priceId === proPrice ? "pro" : "starter");

    if (!stripeSecret) {
      return NextResponse.json(
        { error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    if (!priceId) {
      return NextResponse.json(
        { error: "Missing priceId" },
        { status: 400 }
      );
    }

    // 🔥 build baseUrl from the request if env not set
    const forwardedProto = req.headers.get("x-forwarded-proto");
    const forwardedHost = req.headers.get("x-forwarded-host");
    const host = req.headers.get("host");

    // priority:
    // 1. NEXT_PUBLIC_APP_URL (explicit)
    // 2. x-forwarded-proto + x-forwarded-host (Vercel/proxy)
    // 3. host (fallback)
    // 4. localhost (final fallback)
    const baseUrl =
      envAppUrl && envAppUrl.startsWith("http")
        ? envAppUrl
        : forwardedProto && forwardedHost
        ? `${forwardedProto}://${forwardedHost}`
        : host
        ? `https://${host}`
        : "http://localhost:3000";

    // optional auth: associate checkout to current user for webhook handling
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ error: "Missing auth" }, { status: 401 });
    }
    const uid = decoded.uid;
    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(uid).get();
    const userData = userSnap.exists ? (userSnap.data() as any) : null;
    const tenantId = userData?.tenantId || uid;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ✅ our new flow ends in dashboard
      success_url: `${baseUrl}/billing?checkout=success&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      // if user cancels on Stripe → back to pricing with the chosen plan
      cancel_url: `${baseUrl}/billing?checkout=canceled&reason=user`,
      client_reference_id: tenantId,
      metadata: { sylor_plan: plan, sylor_tenant_id: tenantId, planId: plan, tenantId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("💥 Stripe error:", err);
    return NextResponse.json(
      { error: err.message ?? "Stripe error" },
      { status: 500 }
    );
  }
}


