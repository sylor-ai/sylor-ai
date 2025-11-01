import Stripe from "stripe";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const plan = (body.plan || "starter").toLowerCase();
    const priceId =
      body.priceId ||
      (plan === "pro"
        ? "price_1SN3RrHBRIMb0ChwjSIbQaYn"
        : "price_1SN3ReHBRIMb0ChwEPz1g2w5");

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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ✅ our new flow ends in dashboard
      success_url: `${baseUrl}/dashboard`,
      // if user cancels on Stripe → back to pricing with the chosen plan
      cancel_url: `${baseUrl}/pricing?plan=${plan}`,
      metadata: {
        sylor_plan: plan,
      },
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
