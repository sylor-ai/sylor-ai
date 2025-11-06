"use client";

import { useSearchParams } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { useState } from "react";

const PLAN_CONFIG = {
  starter: {
    label: "Starter",
    price: 149,
    desc: ["50 leads / mo", "SMS automation", "Google Calendar booking"],
    stripePriceId: "price_1SN3ReHBRIMb0ChwEPz1g2w5",
  },
  pro: {
    label: "Pro",
    price: 399,
    desc: ["Unlimited leads", "Voice agent + SMS", "Multi-location / tenants"],
    stripePriceId: "price_1SN3RrHBRIMb0ChwjSIbQaYn",
  },
} as const;

export default function PricingClient() {
  const searchParams = useSearchParams();
  const initial = (searchParams.get("plan") || "starter").toLowerCase();
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro">(
    initial === "pro" ? "pro" : "starter"
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleCheckout() {
    setErr("");
    setLoading(true);

    const planData = PLAN_CONFIG[selectedPlan];

    try {
      const auth = getFirebaseAuth();
      const token = await auth.currentUser?.getIdToken();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          priceId: planData.stripePriceId,
          plan: selectedPlan,
          // on the API side set success_url to /dashboard now
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

      // fallback
      window.location.href = "/dashboard";
    } catch (e) {
      console.error(e);
      setErr("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Choose your plan
        </h1>
        <p className="text-sm text-white/50 mb-8 text-center">
          You’ve already created your workspace. Pick a billing plan to activate it.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* starter */}
          <button
            onClick={() => setSelectedPlan("starter")}
            className={`rounded-[14px] border px-6 py-5 text-left transition ${
              selectedPlan === "starter"
                ? "border-white/70 bg-white/5"
                : "border-white/10 bg-white/0 hover:border-white/30"
            }`}
          >
            <p className="text-xs text-white/40 uppercase tracking-wide mb-2">
              Starter
            </p>
            <p className="text-3xl font-bold mb-1">$149</p>
            <p className="text-sm text-white/40 mb-4">per month</p>
            <ul className="space-y-2 text-sm text-white/70">
              {PLAN_CONFIG.starter.desc.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </button>

          {/* pro */}
          <button
            onClick={() => setSelectedPlan("pro")}
            className={`rounded-[14px] border px-6 py-5 text-left transition ${
              selectedPlan === "pro"
                ? "border-white/70 bg-white/5"
                : "border-white/10 bg-white/0 hover:border-white/30"
            }`}
          >
            <p className="text-xs text-white/40 uppercase tracking-wide mb-2">
              Pro
            </p>
            <p className="text-3xl font-bold mb-1">$399</p>
            <p className="text-sm text-white/40 mb-4">per month</p>
            <ul className="space-y-2 text-sm text-white/70">
              {PLAN_CONFIG.pro.desc.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="rounded-[10px] bg-white text-black px-6 py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? "Redirecting to Stripe..." : "Continue to Stripe →"}
          </button>
        </div>

        {err ? (
          <p className="mt-4 text-center text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2 inline-block">
            {err}
          </p>
        ) : null}
      </div>
    </div>
  );
}
