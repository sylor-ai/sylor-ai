// FILE: src/app/onboarding/page.tsx

import { Suspense } from "react";

// make sure Next doesn't try to do weird static export without data
export const dynamic = "force-dynamic";

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/60">Loading onboarding…</div>}>
      <OnboardingInner />
    </Suspense>
  );
}

// ──────────────────────────────────────────────
// actual client component
// ──────────────────────────────────────────────
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

function OnboardingInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // read ?plan=starter | pro
  const initialPlan =
    (searchParams.get("plan") as "starter" | "pro" | null) ?? "starter";

  const [plan, setPlan] = useState<"starter" | "pro">(initialPlan);

  async function handleContinue() {
    // after onboarding you were sending people to /setup or /dashboard
    router.push("/setup");
  }

  return (
    <div className="min-h-screen bg-[#050506] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-white/5 bg-[#0b0b0c]/70 backdrop-blur p-6 space-y-6">
        {/* top */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/35">
              Sylor.ai · Onboarding
            </p>
            <h1 className="text-xl font-semibold">Choose your plan</h1>
            <p className="text-sm text-white/40">
              You came from the marketing site with <code>?plan={initialPlan}</code>.
              You can change it here.
            </p>
          </div>
          {/* go back to dashboard */}
          <Link
            href="/dashboard"
            className="rounded-lg bg-white/5 hover:bg-white/10 px-3 py-1.5 text-sm text-white/70"
          >
            ← Back to dashboard
          </Link>
        </div>

        {/* plans */}
        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setPlan("starter")}
            className={`rounded-xl border p-4 text-left transition ${
              plan === "starter"
                ? "border-white/70 bg-white/5"
                : "border-white/5 hover:border-white/25"
            }`}
          >
            <p className="text-xs text-white/40 uppercase tracking-wide">
              Starter
            </p>
            <p className="mt-2 text-2xl font-bold">$149</p>
            <p className="text-sm text-white/45">50 leads / mo</p>
          </button>

          <button
            type="button"
            onClick={() => setPlan("pro")}
            className={`rounded-xl border p-4 text-left transition ${
              plan === "pro"
                ? "border-white/70 bg-white/5"
                : "border-white/5 hover:border-white/25"
            }`}
          >
            <p className="text-xs text-white/40 uppercase tracking-wide">Pro</p>
            <p className="mt-2 text-2xl font-bold">$399</p>
            <p className="text-sm text-white/45">Unlimited + voice agent</p>
          </button>
        </div>

        {/* actions */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            Current selection: <b>{plan}</b>
          </p>
          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-lg bg-white/0 border border-white/10 px-3 py-1.5 text-sm text-white/70 hover:bg-white/5"
            >
              ← Back to site
            </Link>
            <button
              onClick={handleContinue}
              className="rounded-lg bg-white text-sm text-black font-medium px-4 py-1.5 hover:bg-white/85 transition"
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
