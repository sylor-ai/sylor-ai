"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { PlanId } from "@/types";

type PlanOption = "agency_core" | "agency_scale";

const PLAN_CONFIG: Record<PlanOption, { label: string; price: number; desc: string[] }> = {
  agency_core: {
    label: "Agency Core",
    price: 1499,
    desc: ["20,000 SMS included", "Up to 10 client accounts", "AI SMS follow-up + booking"],
  },
  agency_scale: {
    label: "Agency Scale",
    price: 2499,
    desc: [
      "50,000 SMS included",
      "Up to 25 client accounts",
      "AI SMS follow-up + booking",
      "Lower overage: $0.018/SMS",
    ],
  },
};

export default function PricingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const initial = (searchParams.get("plan") || "agency_core").toLowerCase() as PlanOption;
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(
    initial === "agency_scale" ? "agency_scale" : "agency_core"
  );
  const [, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChoosePlan = (planId: PlanId) => {
    if (!currentUser) {
      router.push(`/signup?plan=${planId}`);
      return;
    }
    router.push(`/billing/activate?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-2 text-center">Choose your plan</h1>
        <p className="text-sm text-white/50 mb-8 text-center">
          You&apos;ve already created your workspace. Pick a billing plan to activate it.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {([
            { id: "agency_core", blurb: "Best for new agency rollouts" },
            { id: "agency_scale", blurb: "For growing agencies" },
          ] as Array<{ id: PlanOption; blurb: string }>).map(({ id, blurb }) => {
            const plan = PLAN_CONFIG[id];
            const isSelected = selectedPlan === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedPlan(id)}
                className={`rounded-[14px] border px-6 py-5 text-left transition ${
                  isSelected ? "border-white/70 bg-white/5" : "border-white/10 bg-white/0 hover:border-white/30"
                }`}
              >
                <p className="text-xs text-white/40 uppercase tracking-wide mb-1">{plan.label}</p>
                <p className="text-sm text-white/30 mb-2">{blurb}</p>
                <p className="text-3xl font-bold mb-1">${plan.price.toLocaleString()}</p>
                <p className="text-sm text-white/40 mb-4">per month</p>
                <ul className="space-y-2 text-sm text-white/70">
                  {plan.desc.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handleChoosePlan(selectedPlan)}
            className="rounded-[10px] bg-white text-black px-6 py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50"
          >
            Choose plan
          </button>
        </div>

        {error ? (
          <p className="mt-4 text-center text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2 inline-block">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
