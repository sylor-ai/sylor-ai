// FILE: src/app/(public)/setup/page.tsx
"use client";

import React, { useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const search = useSearchParams();
  const plan = search.get("plan") || "starter";

  const [businessName, setBusinessName] = useState("UrbanLux Construction");
  const [businessPhone, setBusinessPhone] = useState("+1 (718) 455-1334");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const auth = getFirebaseAuth();
      const current = auth.currentUser;
      if (!current) {
        setError("You are not logged in.");
        setSaving(false);
        return;
      }
      const idToken = await current.getIdToken();

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          businessName,
          businessPhone,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Could not save business profile.");
        setSaving(false);
        return;
      }

      // success → go to plan or dashboard
      router.push(`/pricing?plan=${plan}`);
    } catch (err) {
      console.error(err);
      setError("Could not save business profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/5 bg-[rgba(10,10,11,0.5)] backdrop-blur-xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <div className="mb-6">
          <p className="text-xs text-white/30 mb-2 tracking-wide">
            1. Account <span className="text-white/15">→</span> 2. Business
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Tell us about your business
          </h1>
          <p className="text-sm text-white/40 mt-1">
            We’ll use this info in your SMS, booking and dashboards.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business name */}
          <div className="space-y-1">
            <label
              htmlFor="businessName"
              className="text-sm text-white/60 font-medium"
            >
              Business name
            </label>
            <input
              id="businessName"
              name="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              className="w-full rounded-xl bg-[#0b0b0c] border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-white/40 focus:ring-0"
              placeholder="Your business name"
            />
          </div>

          {/* Business phone */}
          <div className="space-y-1">
            <label
              htmlFor="businessPhone"
              className="text-sm text-white/60 font-medium"
            >
              Business phone
            </label>
            <input
              id="businessPhone"
              name="businessPhone"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              required
              className="w-full rounded-xl bg-[#0b0b0c] border border-white/10 px-3 py-2.5 text-sm outline-none focus:border-white/40"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {error ? (
            <div className="rounded-xl bg-[#2a1212] border border-[#ff5f5f22] text-[#ffbfbf] text-sm px-3 py-2">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-xl bg-[#5C6CFF] hover:bg-[#6d7aff] transition text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : "Continue to plan →"}
          </button>

          <p className="text-xs text-white/30 mt-1 text-center">
            You can change this later in Settings → Business.
          </p>
        </form>
      </div>
    </div>
  );
}
