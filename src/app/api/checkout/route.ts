import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

if (!stripeSecret) {
  console.warn("⚠️ STRIPE_SECRET_KEY is missing in .env.local");
}

// keep your apiVersion, but you can set it to a stable one if needed
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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // ✅ NEW FLOW:
      // pricing -> stripe -> DASHBOARD
      success_url: `${appUrl}/dashboard`,
      cancel_url: `${appUrl}/pricing?plan=${plan}`,
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
