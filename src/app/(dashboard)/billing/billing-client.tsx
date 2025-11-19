"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { authedFetch } from "@/lib/authed-fetch";
import type { PlanId } from "@/types";

type PlanOption = "agency_core" | "agency_scale";

const DISPLAY_PLANS: Record<PlanOption, { id: PlanOption; name: string; price: number; includedSms: number; overageRate: number; maxSubAccounts: number }> = {
  agency_core: {
    id: "agency_core",
    name: "Agency Core",
    price: 1499,
    includedSms: 20000,
    overageRate: 0.02,
    maxSubAccounts: 10,
  },
  agency_scale: {
    id: "agency_scale",
    name: "Agency Scale",
    price: 2499,
    includedSms: 50000,
    overageRate: 0.018,
    maxSubAccounts: 25,
  },
};

type BillingResponse = {
  ok: boolean;
  planId: PlanId | null;
  plan: {
    id: PlanId;
    name: string;
    monthlyFee: number;
    includedSms: number;
    overagePerSms: number;
  } | null;
  hasActiveSubscription: boolean;
  usage?: {
    monthlySmsCount?: number;
    monthlySmsLimit?: number;
    estimatedBill?: number;
    usageHistory?: any[];
  } | null;
  stripeCustomerId?: string | null;
};

function currency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export default function BillingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser, loading } = useCurrentUser();
  const [billing, setBilling] = useState<BillingResponse | null>(null);
  const [tenantType, setTenantType] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    if (loading) return;
    if (!currentUser || !currentUser.tenantId) {
      router.push("/login");
      return;
    }

    let cancelled = false;
    const fetchBilling = async () => {
      setStatus("loading");
      setErr(null);
      try {
        const res = await authedFetch("/api/tenant/billing", { cache: "no-store" });
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Failed to load billing data.");
        }
        const json = (await res.json()) as BillingResponse;
        if (cancelled) return;
        setBilling(json);
        setTenantType(json?.plan?.id ? null : null);
        setStatus("ready");
      } catch (e: any) {
        if (cancelled) return;
        setErr(e?.message || "Could not load billing data.");
        setStatus("error");
      }
    };
    fetchBilling();
    return () => {
      cancelled = true;
    };
  }, [currentUser, loading, router]);

  useEffect(() => {
    (async () => {
      const statusParam = searchParams.get("checkout");
      const sessionId = searchParams.get("session_id");
      if (!currentUser || !currentUser.tenantId || statusParam !== "success" || !sessionId) return;
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
        const res = await authedFetch("/api/tenant/billing", { cache: "no-store" });
        if (res.ok) {
          const json = (await res.json()) as BillingResponse;
          setBilling(json);
          setStatus("ready");
        }
      } catch {}
    })();
  }, [searchParams, currentUser, router]);

  const planInfo = useMemo(() => {
    const pid = billing?.plan?.id || billing?.planId;
    if (pid === "agency_core" || pid === "agency_scale") {
      return DISPLAY_PLANS[pid];
    }
    return DISPLAY_PLANS.agency_core;
  }, [billing]);

  if (status === "loading" || status === "idle" || loading) {
    return <div className="min-h-[40vh] flex items-center justify-center text-white/60">Loading billing...</div>;
  }

  if (status === "error" || err) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Billing</h1>
        <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {err || "Could not load billing data. Please refresh or log in again."}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <div className="min-h-[40vh] flex items-center justify-center text-white/60">Please log in to view billing.</div>;
  }

  const usage = billing?.usage || null;
  const noActivePlan = !billing?.hasActiveSubscription || !billing?.planId;
  const isScale = planInfo.id === "agency_scale";
  const isClientTenant = tenantType === "client";

  const handleSelectPlan = (planId: PlanOption) => {
    router.push(`/billing/activate?plan=${planId}`);
  };

  async function handleUpgrade() {
    setBusy(true);
    setErr(null);
    try {
      const res = await authedFetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: "agency_scale" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Could not start checkout.");
      }
      window.location.href = data.url as string;
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
        {isClientTenant && (
          <p className="mt-2 text-xs text-white/50">
            This account is billed via your agency. Usage is visible here, but billing is managed by your agency.
          </p>
        )}
      </div>

      {noActivePlan ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/70">
            You’re currently in trial / not on a paid plan. Choose a plan to activate billing.
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[DISPLAY_PLANS.agency_core, DISPLAY_PLANS.agency_scale].map((p) => (
              <div key={p.id} className="card ring-1 ring-white/15">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/70">{p.name}</p>
                </div>
                <p className="mt-2 text-2xl font-semibold">${p.price.toLocaleString()}/mo</p>
                <ul className="mt-3 text-sm text-white/80 space-y-1">
                  <li>{p.includedSms.toLocaleString()} SMS included</li>
                  <li>${p.overageRate}/SMS overage</li>
                  <li>Up to {p.maxSubAccounts} client accounts</li>
                  <li>AI SMS follow-up & booking</li>
                </ul>
                {!isClientTenant && (
                  <button
                    onClick={() => handleSelectPlan(p.id)}
                    className="btn-primary mt-4 disabled:opacity-50"
                  >
                    Choose {p.name}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="panel">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-white/60">Current plan</p>
                <p className="mt-2 text-lg font-semibold">{planInfo.name}</p>
                <p className="text-sm text-white/45">
                  ${planInfo.price.toLocaleString(undefined, { minimumFractionDigits: 0 })}/month — Includes{" "}
                  {planInfo.includedSms.toLocaleString()} SMS — ${planInfo.overageRate}/SMS over
                </p>
              </div>
              <div className="flex gap-2">
                {!isScale && !isClientTenant && (
                  <button onClick={handleUpgrade} disabled={busy} className="btn-primary disabled:opacity-50">
                    Upgrade to Scale
                  </button>
                )}
                {!isClientTenant && (
                  <button onClick={handleManageBilling} disabled={busy} className="btn-ghost disabled:opacity-50">
                    Manage billing
                  </button>
                )}
              </div>
            </div>
            {err && (
              <div className="mt-3 text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                {err}
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {([DISPLAY_PLANS.agency_core, DISPLAY_PLANS.agency_scale] as Array<(typeof DISPLAY_PLANS)[PlanOption]>).map(
              (p) => {
                const isCurrent = planInfo.id === p.id;
                return (
                  <div key={p.id} className={`card ${isCurrent ? "ring-1 ring-purple-400/40" : "ring-1 ring-white/15"}`}>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-white/70">{p.name}</p>
                      {isCurrent && (
                        <span className="chip !bg-emerald-500/10 !text-emerald-200 !border-emerald-400/30">
                          Current plan
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-2xl font-semibold">${p.price.toLocaleString()}/mo</p>
                    <ul className="mt-3 text-sm text-white/80 space-y-1">
                      <li>{p.includedSms.toLocaleString()} SMS included</li>
                      <li>${p.overageRate}/SMS overage</li>
                      <li>Up to {p.maxSubAccounts} client accounts</li>
                      <li>AI SMS follow-up & booking</li>
                    </ul>
                    {!isCurrent && !isClientTenant && (
                      <button onClick={handleUpgrade} disabled={busy} className="btn-primary mt-4 disabled:opacity-50">
                        Switch to {p.name}
                      </button>
                    )}
                  </div>
                );
              }
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20">
              <p className="text-sm text-white/60">This month</p>
              <p className="text-xl font-semibold text-white">
                {usage?.monthlySmsCount?.toLocaleString() ?? 0} /{" "}
                {usage?.monthlySmsLimit?.toLocaleString() ?? planInfo.includedSms.toLocaleString()} SMS
              </p>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(
              ((usage?.monthlySmsCount ?? 0) /
                ((usage?.monthlySmsLimit ?? planInfo.includedSms) || 1)) *
                          100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20">
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/60">Est. overage</p>
                <p className="text-xl font-semibold text-white">
                  {usage?.estimatedBill ? currency(usage.estimatedBill) : "$0.00"}
                </p>
              </div>
              <p className="text-xs text-white/50 mt-2">
                Based on your current usage and plan limits. Overages billed at ${planInfo.overageRate}/SMS.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-lg font-semibold text-white">Usage history</p>
              <p className="text-sm text-white/60">Last 3 periods</p>
            </div>
            {!usage?.usageHistory?.length ? (
              <p className="text-sm text-white/60">No history yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
                    <tr>
                      <th className="px-3 py-2">Start</th>
                      <th className="px-3 py-2">End</th>
                      <th className="px-3 py-2">SMS</th>
                      <th className="px-3 py-2">Overage</th>
                      <th className="px-3 py-2">Est. billed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...(usage.usageHistory || [])]
                      .slice(-3)
                      .reverse()
                      .map((h: any, idx: number) => {
                        const overage = typeof h.overageCount === "number" ? h.overageCount : 0;
                        const rate =
                          typeof h.overageRate === "number" ? h.overageRate : planInfo.overageRate;
                        const billed = overage * (rate || 0);
                        return (
                          <tr
                            key={idx}
                            className="border-b border-white/5 last:border-0 hover:bg-white/5"
                          >
                            <td className="px-3 py-2">
                              {h.periodStart ? new Date(h.periodStart).toLocaleDateString() : "—"}
                            </td>
                            <td className="px-3 py-2">
                              {h.periodEnd ? new Date(h.periodEnd).toLocaleDateString() : "—"}
                            </td>
                            <td className="px-3 py-2">
                              {(h.smsCount ?? 0).toLocaleString()}
                            </td>
                            <td className="px-3 py-2">
                              {overage > 0 ? overage.toLocaleString() : "0"}
                            </td>
                            <td className="px-3 py-2">
                              {billed ? currency(billed) : "$0.00"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
