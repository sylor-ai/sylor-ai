"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const PLAN_CONFIG: Record<
  string,
  { label: string; price: string; stripePriceId: string }
> = {
  starter: {
    label: "Starter plan",
    price: "$149 / month",
    stripePriceId: "price_1SN3ReHBRIMb0ChwEPz1g2w5",
  },
  pro: {
    label: "Pro plan",
    price: "$399 / month",
    stripePriceId: "price_1SN3RrHBRIMb0ChwjSIbQaYn",
  },
};

export default function PricingClient() {
  const searchParams = useSearchParams();
  const plan = (searchParams.get("plan") || "starter").toLowerCase();
  const planData = PLAN_CONFIG[plan] ?? PLAN_CONFIG.starter;

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleCheckout() {
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: planData.stripePriceId,
          plan,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Checkout error:", txt);
        setErr("Could not create checkout session.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      window.location.href = "/setup?plan=" + plan;
    } catch (e) {
      console.error(e);
      setErr("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[14px] border border-white/10 bg-[#0d0d0e]/60 p-6">
        <p className="text-xs text-white/35 mb-2">
          You chose: {plan.toUpperCase()}
        </p>
        <h1 className="text-xl font-semibold mb-2">Secure payment</h1>
        <p className="text-sm text-white/45 mb-6">
          We’ll create your Sylor tenant after payment.
        </p>

        <div className="rounded-[12px] bg-white/5 p-4 mb-6">
          <p className="text-sm font-medium mb-1">{planData.label}</p>
          <p className="text-2xl font-bold mb-1">
            {plan === "pro" ? "$399" : "$149"}
            <span className="text-sm text-white/45"> / month</span>
          </p>
          <p className="text-xs text-white/35">
            Billed monthly. Change or cancel anytime.
          </p>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50"
        >
          {loading ? "Creating session..." : "Continue to Stripe →"}
        </button>

        {err ? (
          <p className="mt-4 text-xs text-red-400 bg-red-400/10 rounded-[8px] px-3 py-2">
            {err}
          </p>
        ) : null}
      </div>
    </div>
  );
}
