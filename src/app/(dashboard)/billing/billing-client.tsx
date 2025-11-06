"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import type { Plan } from "@/types";

export default function BillingClient() {
  const searchParams = useSearchParams();
  const { currentUser, loading } = useCurrentUser();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!currentUser) return;
      try {
        const p = await api.getCurrentPlan(currentUser.tenantId);
        setPlan(p);
      } catch {}
    })();
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      const status = searchParams.get("checkout");
      const sessionId = searchParams.get("session_id");
      if (!currentUser || status !== "success" || !sessionId) return;
      try {
        const token = await (await import("@/lib/firebase")).getFirebaseAuth().currentUser?.getIdToken();
        await fetch("/api/billing/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ sessionId }),
        });
        const p = await api.getCurrentPlan(currentUser.tenantId);
        setPlan(p);
      } catch {}
    })();
  }, [searchParams, currentUser]);

  if (loading) {
    return <div className="min-h-[40vh] flex items-center justify-center text-white/60">Loading billing...</div>;
  }

  if (!currentUser) {
    return <div className="min-h-[40vh] flex items-center justify-center text-white/60">Please log in to view billing.</div>;
  }

  const isPro = plan?.id === "pro";

  async function handleUpgrade() {
    setBusy(true);
    setErr(null);
    try {
      const { redirectUrl } = await api.createStripeCheckoutSession("pro");
      window.location.href = redirectUrl;
    } catch (e: any) {
      setErr(e?.message || "Could not start checkout.");
      setBusy(false);
    }
  }

  async function handleManageBilling() {
    setBusy(true);
    setErr(null);
    try {
      const token = await (await import("@/lib/firebase")).getFirebaseAuth().currentUser?.getIdToken();
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Portal error");
      window.location.href = data.url as string;
    } catch (e: any) {
      setErr(e?.message || "Could not open billing portal.");
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-white/60">Manage your Sylor AI subscription and invoices.</p>
      </div>

      <div className="panel">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-white/60">Current plan</p>
            <p className="mt-2 text-lg font-semibold">{plan ? plan.name : "Starter"}</p>
            <p className="text-sm text-white/45">{plan ? `$${plan.price}/month` : "Free preview mode"}</p>
          </div>
          <div className="flex gap-2">
            {!isPro && (
              <button onClick={handleUpgrade} disabled={busy} className="btn-primary disabled:opacity-50">
                Upgrade to Pro
              </button>
            )}
            <button onClick={handleManageBilling} disabled={busy} className="btn-ghost disabled:opacity-50">
              Manage billing
            </button>
          </div>
        </div>
        {err && <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">{err}</div>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className={`card ${!isPro ? "ring-1 ring-white/20" : "opacity-70"}`}>
          <p className="text-xs text-white/60">Starter</p>
          <p className="mt-2 text-2xl font-semibold">$149/mo</p>
          <ul className="mt-3 text-sm text-white/75 space-y-1">
            <li>50 leads per month</li>
            <li>SMS automation</li>
            <li>Basic analytics</li>
          </ul>
        </div>
        <div className={`card ${isPro ? "ring-1 ring-purple-400/40" : ""}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/70">Pro</p>
            {isPro && <span className="chip !bg-emerald-500/10 !text-emerald-200 !border-emerald-400/30">Current plan</span>}
          </div>
          <p className="mt-2 text-2xl font-semibold">$399/mo</p>
          <ul className="mt-3 text-sm text-white/80 space-y-1">
            <li>Unlimited leads</li>
            <li>SMS & voice AI</li>
            <li>Advanced analytics</li>
            <li>Calendar sync</li>
          </ul>
          {!isPro && (
            <button onClick={handleUpgrade} disabled={busy} className="btn-primary mt-4 disabled:opacity-50">
              Go Pro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
