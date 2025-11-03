// FILE: src/app/onboarding/onboarding-client.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";
import { getFirebaseAuth } from "@/lib/firebase-admin";

export default function OnboardingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // plan from URL (?plan=starter|pro) – fallback to starter
  const selectedPlan = (searchParams.get("plan") || "starter").toLowerCase();

  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [industry, setIndustry] = useState(""); // we keep it in UI only
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setSaving(true);

    try {
      // 1) get current auth user
      const auth = getFirebaseAuth();
      const current = auth.currentUser;

      if (!current) {
        // not logged in → send to signup, keep plan in URL
        router.push(`/signup?plan=${selectedPlan}`);
        return;
      }

      // 2) get user profile so we know tenantId
      const userProfile = await api.getUserProfile(current.uid);
      if (!userProfile?.tenantId) {
        setErr("Could not load your workspace. Please sign in again.");
        setSaving(false);
        return;
      }

      // 3) update tenant with the fields that actually exist on Tenant
      //    (businessName, businessPhone) – DO NOT send `industry` here
      await api.completeBusinessSetup(userProfile.tenantId, {
        businessName,
        businessPhone,
      });

      // 4) make sure plan is saved (in case Stripe wasn’t used yet)
      await api.confirmCheckoutSession(
        userProfile.tenantId,
        selectedPlan as "starter" | "pro"
      );

      // 5) done → go to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErr("Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4 relative">
      {/* back to site */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80"
      >
        ← Back to site
      </button>

      <div className="w-full max-w-lg rounded-[18px] border border-white/10 bg-[#0f1011]/70 p-8 shadow-xl">
        <p className="text-xs text-white/35 mb-2">Step 2 of 2</p>
        <h1 className="text-2xl font-semibold mb-2">Set up your workspace</h1>
        <p className="text-sm text-white/45 mb-6">
          We’ll connect new leads to this business profile. You chose:{" "}
          <span className="text-white">{selectedPlan.toUpperCase()}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/55 mb-1 block">
              Business name
            </label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              placeholder="UrbanLux Construction"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="text-sm text-white/55 mb-1 block">
              Business phone
            </label>
            <input
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              required
              placeholder="+1 (818) 555-2312"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          {/* UI-only field – we DON'T send it to Firestore right now */}
          <div>
            <label className="text-sm text-white/55 mb-1 block">
              Industry / service
            </label>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Roofing, Remodeling, ADU, Landscaping..."
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
            <p className="mt-1 text-[10px] text-white/25">
              (This is just for your AI later — not required.)
            </p>
          </div>

          {err ? (
            <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
              {err}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Finish & go to dashboard →"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">
          You can change all of this later from Settings.
        </p>
      </div>
    </div>
  );
}
