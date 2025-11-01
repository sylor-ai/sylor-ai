"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetupInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planFromUrl = (searchParams.get("plan") || "").toLowerCase();

  const [businessName, setBusinessName] = useState("UrbanLux Construction");
  const [businessPhone, setBusinessPhone] = useState("+1 (818) 555-1234");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessPhone,
          // we can store plan early, but final plan is chosen on /pricing
          plan: planFromUrl || undefined,
        }),
      });

      if (!res.ok) {
        setErr("Could not save business profile.");
        setLoading(false);
        return;
      }

      // ✅ new flow: setup → pricing (carry plan if we had it)
      const next = planFromUrl
        ? `/pricing?plan=${planFromUrl}`
        : `/pricing`;
      router.push(next);
    } catch (error: any) {
      console.error(error);
      setErr("Could not save business profile.");
      setLoading(false);
    }
  }

  const displayPlan = planFromUrl || "starter";

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      {/* Background blur glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-52 right-0 h-80 w-80 bg-purple-500/20 blur-[120px]" />
        <div className="absolute -bottom-40 left-0 h-80 w-80 bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold">
            S
          </div>
          <div>
            <p className="text-sm text-white/40">Setup</p>
            <p className="font-semibold text-white">Sylor.ai</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[18px] border border-white/10 bg-[#0f1011]/65 backdrop-blur p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <p className="text-xs text-white/35 mb-3">
            You will pick a plan next. Current:{" "}
            <span className="uppercase">{displayPlan}</span>
          </p>
          <h1 className="text-2xl font-semibold mb-2">
            Tell us about your business
          </h1>
          <p className="text-sm text-white/45 mb-6">
            We’ll use this info in your SMS, booking and dashboards.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business name */}
            <div>
              <label
                htmlFor="businessName"
                className="text-sm text-white/50 mb-1 block"
              >
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder="Enter your business name"
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
              />
            </div>

            {/* Business phone */}
            <div>
              <label
                htmlFor="businessPhone"
                className="text-sm text-white/50 mb-1 block"
              >
                Business phone
              </label>
              <input
                id="businessPhone"
                name="businessPhone"
                type="tel"
                value={businessPhone}
                onChange={(e) => setBusinessPhone(e.target.value)}
                required
                placeholder="Enter your business phone"
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
              />
            </div>

            {/* Error */}
            {err ? (
              <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
                {err}
              </p>
            ) : null}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[10px] bg-[#5c6cff] hover:bg-[#4f5edf] transition py-2 text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Continue to plan →"}
            </button>
          </form>

          <p className="mt-4 text-xs text-white/30">
            You can change this later in Settings → Business.
          </p>
        </div>
      </div>
    </div>
  );
}
