"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PlanId } from "@/types";
import { getPlanById } from "@/lib/pricing";
import { getFirebaseAuth } from "@/lib/firebase";

type PlanOption = "agency_core" | "agency_scale";

export default function ActivatePlanClient({
  initialPlanId,
}: {
  initialPlanId?: PlanId;
}) {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | undefined>(
    initialPlanId as PlanOption | undefined
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getFirebaseAuth();

  const plans = useMemo(() => {
    const all: PlanOption[] = ["agency_core", "agency_scale"];
    if (initialPlanId) return [initialPlanId as PlanOption];
    return all;
  }, [initialPlanId]);

  const handleContinue = async () => {
    if (!selectedPlan) {
      setError("Please choose a plan.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      router.push(`/signup?plan=${selectedPlan}`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ planId: selectedPlan }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not create checkout session.");
      }

      const data = await res.json();
      if (data.url) {
        // Persist session id locally so we can recover it on the success page if query params are missing.
        if (typeof window !== "undefined" && data.sessionId) {
          try {
            sessionStorage.setItem("sylor_last_checkout_session", data.sessionId as string);
          } catch {}
        }
        window.location.href = data.url;
      } else {
        throw new Error("Missing checkout URL.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const renderPlanCard = (planId: PlanOption) => {
    const plan = getPlanById(planId);
    if (!plan) return null;
    const isSelected = selectedPlan === planId;
    return (
      <div
        key={planId}
        className={`rounded-2xl border p-4 space-y-2 cursor-pointer transition ${
          isSelected ? "border-white/70 bg-white/10" : "border-white/10 bg-white/5 hover:border-white/40"
        }`}
        onClick={() => setSelectedPlan(planId)}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-white/50 tracking-wide">{plan.id}</p>
            <h2 className="text-xl font-semibold text-white">{plan.name}</h2>
          </div>
          <p className="text-3xl font-bold text-white">${plan.price.toLocaleString()}/mo</p>
        </div>
        <ul className="space-y-1 text-sm text-white/75">
          {plan.features.map((f) => (
            <li key={f}>- {f}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-6 text-white space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Activate your plan</h1>
        <p className="text-sm text-white/60">
          {initialPlanId
            ? "Confirm and continue to Stripe, or skip for now."
            : "Choose a plan to continue to Stripe, or skip for now."}
        </p>
      </div>

      <div className={`grid gap-4 ${plans.length > 1 ? "md:grid-cols-2" : "grid-cols-1"} max-w-3xl`}>
        {plans.map(renderPlanCard)}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={handleSkip} className="btn-ghost">
          Skip for now
        </button>
        <button
          onClick={handleContinue}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Redirecting..." : "Continue to Stripe →"}
        </button>
      </div>

      {error && (
        <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
          {error}
        </div>
      )}
    </div>
  );
}
