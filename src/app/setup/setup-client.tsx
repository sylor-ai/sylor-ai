// FILE: src/app/setup/setup-client.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "@/lib/api";
import { Tenant } from "@/types";

export default function SetupClient() {
  const router = useRouter();
  // ✅ this is what the hook actually returns
  const { currentUser, loading } = useCurrentUser();

  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 1) when we have a user, load the tenant
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

  // 2) loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="h-8 w-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // 3) if not logged in → back to login
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
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
      // we must have a tenantId from the user
      const tenantId = currentUser.tenantId;
      if (!tenantId) {
        throw new Error("Missing tenantId on user");
      }

      // this will also mock-provision a twilio number (see api.completeBusinessSetup)
      const updated = await api.completeBusinessSetup(tenantId, {
        businessName,
        businessPhone,
      });

      setTenant(updated);
      // go to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("setup error", err);
      setError(err?.message || "Could not save setup.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="w-full max-w-lg bg-glass-bg border border-glass-border rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Finish your business setup
        </h1>
        <p className="text-dark-text-secondary mb-6">
          We use this info when we text your leads.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* BUSINESS NAME */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm text-dark-text-secondary mb-1"
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
              className="w-full bg-slate-900/50 border border-glass-border rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-brand-primary text-white"
            />
          </div>

          {/* BUSINESS PHONE */}
          <div>
            <label
              htmlFor="businessPhone"
              className="block text-sm text-dark-text-secondary mb-1"
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
              className="w-full bg-slate-900/50 border border-glass-border rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-brand-primary text-white"
            />
          </div>

          {/* ERROR */}
          {error ? <p className="text-red-400 text-sm">{error}</p> : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand-primary hover:bg-brand-secondary transition-colors py-3 rounded-lg font-semibold text-white"
          >
            {saving ? "Saving..." : "Continue to dashboard"}
          </button>
        </form>

        {/* show current tenant info if we already have */}
        {tenant?.twilioNumber ? (
          <p className="text-xs text-dark-text-secondary mt-4">
            Sylor AI number provisioned: {tenant.twilioNumber}
          </p>
        ) : null}
      </div>
    </div>
  );
}
