// src/app/setup/setup-client.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "@/lib/api";
import { Tenant } from "@/types";

export default function SetupClient() {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const t = await api.getTenant(currentUser.tenantId);
      if (t) {
        setTenant(t);
        setBusinessName(t.businessName || "");
        setBusinessPhone(t.businessPhone || "");
      }
    })();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white">
        <div className="h-8 w-8 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white px-4 text-center">
        You are not logged in.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    setError("");

    try {
      const tenantId = currentUser.tenantId;
      if (!tenantId) {
        throw new Error("Missing tenantId on user");
      }

      const updated = await api.completeBusinessSetup(tenantId, {
        businessName,
        businessPhone,
      });

      setTenant(updated);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("setup error", err);
      setError(err?.message || "Could not save setup.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] p-4 py-10 sm:py-0">
      <div className="w-full max-w-lg bg-[#0f1011]/70 border border-white/10 rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Finish your business setup
        </h1>
        <p className="text-sm text-white/40 mb-6">
          We use this info when we text your leads.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm text-white/50 mb-1"
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
              placeholder="UrbanLux Construction"
              className="w-full bg-[#0b0b0c] border border-white/10 rounded-md px-3 py-2.5 outline-none focus:border-white/40 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="businessPhone"
              className="block text-sm text-white/50 mb-1"
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
              placeholder="+1 (818) 555-1234"
              className="w-full bg-[#0b0b0c] border border-white/10 rounded-md px-3 py-2.5 outline-none focus:border-white/40 text-sm"
            />
          </div>

          {error ? <p className="text-red-400 text-sm">{error}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#5c6cff] hover:bg-[#4f5edf] transition-colors py-2.5 rounded-lg font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Continue to dashboard"}
          </button>
        </form>

        {tenant?.twilioNumber ? (
          <p className="text-xs text-white/30 mt-4">
            Sylor AI number provisioned: {tenant.twilioNumber}
          </p>
        ) : null}
      </div>
    </div>
  );
}
