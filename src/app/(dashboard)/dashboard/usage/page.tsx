"use client";

import { useEffect, useMemo, useState } from "react";
import { formatTimestamp, normalizeTimestamps } from "@/lib/utils";
import { authedFetch } from "@/lib/authed-fetch";

type UsageResponse = {
  ok: boolean;
  monthlySmsCount: number;
  monthlySmsLimit: number;
  overageRate: number | null;
  overageCount: number;
  estimatedBill: number;
  billingCycleStart: any;
  usageHistory: Array<{
    periodStart?: any;
    periodEnd?: any;
    smsCount?: number;
    limit?: number;
    overageRate?: number | null;
    overageCount?: number;
  }>;
};

export default function UsagePage() {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workspace, setWorkspace] = useState<{ tenantId: string; type: string } | null>(null);
  const [clientUsage, setClientUsage] = useState<
    Array<{ tenantId: string; name: string; monthlySmsCount: number }>
  >([]);
  const [clientUsageError, setClientUsageError] = useState<string | null>(null);
  const [clientUsageLoading, setClientUsageLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const workspacesRes = await authedFetch("/api/me/workspaces", { cache: "no-store" });
        const wsJson = await workspacesRes.json().catch(() => ({} as any));
        const active =
          wsJson?.workspaces?.find((w: any) => w.tenantId === wsJson?.defaultTenantId) ||
          wsJson?.workspaces?.[0] ||
          null;
        if (mounted) {
          setWorkspace(
            active ? { tenantId: active.tenantId, type: active.type || "direct" } : null
          );
        }

        const res = await authedFetch("/api/tenant/usage", { cache: "no-store" });
        const json = await res.json();
        const normalized = normalizeTimestamps(json) as UsageResponse;
        if (mounted) setData(normalized);
      } catch (err: any) {
        if (mounted) setError(err.message || "Failed to load usage");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    setLoading(true);
    load();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (workspace?.type !== "agency") return;
    setClientUsageLoading(true);
    (async () => {
      try {
        const res = await authedFetch("/api/agency/usage-summary", { cache: "no-store" });
        const json = await res.json();
        if (!mounted) return;
        if (Array.isArray(json?.clients)) {
          setClientUsage(json.clients);
          setClientUsageError(null);
        } else {
          setClientUsageError("Unable to load client usage");
        }
      } catch (err: any) {
        if (mounted) setClientUsageError(err?.message || "Unable to load client usage");
      } finally {
        if (mounted) setClientUsageLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [workspace?.type]);

  const progress = useMemo(() => {
    if (!data) return 0;
    if (!data.monthlySmsLimit) return 0;
    return Math.min(
      100,
      Math.round((data.monthlySmsCount / data.monthlySmsLimit) * 100)
    );
  }, [data]);

  const warning = useMemo(() => {
    if (!data || !data.monthlySmsLimit) return null;
    const pct = (data.monthlySmsCount / data.monthlySmsLimit) * 100;
    if (pct >= 100) return { level: "red", text: "Limit reached — overage billing applies." };
    if (pct >= 80) return { level: "yellow", text: "High usage — overage may apply soon." };
    return null;
  }, [data]);

  return (
    <div className="p-6 space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Usage</h1>
        <p className="text-sm text-white/60">
          Monthly SMS consumption and overage estimates.
        </p>
      </div>

      {loading && <div className="text-sm text-white/60">Loading usage...</div>}
      {error && (
        <div className="text-sm text-rose-400">Error loading usage: {error}</div>
      )}

      {data && (
        <>
          {warning && (
            <div
              className={`rounded-md border px-3 py-2 text-sm ${
                warning.level === "red"
                  ? "border-red-400/40 bg-red-500/10 text-red-200"
                  : "border-yellow-400/40 bg-yellow-500/10 text-yellow-200"
              }`}
            >
              {warning.text}
            </div>
          )}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">SMS this month</p>
                <p className="text-2xl font-semibold">
                  {data.monthlySmsCount.toLocaleString()}{" "}
                  <span className="text-base font-normal text-white/50">
                    / {data.monthlySmsLimit.toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="text-right text-sm text-white/60">
                Billing cycle start: {formatTimestamp(data.billingCycleStart)}
              </div>
            </div>
            <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/70">
              <div>
                Overage count:{" "}
                <span className="font-semibold text-white">
                  {data.overageCount.toLocaleString()}
                </span>
              </div>
              <div>
                Overage rate:{" "}
                <span className="font-semibold text-white">
                  {data.overageRate != null ? `$${data.overageRate}/SMS` : "—"}
                </span>
              </div>
              <div>
                Est. overage bill:{" "}
                <span className="font-semibold text-white">
                  {data.estimatedBill
                    ? `$${data.estimatedBill.toFixed(2)}`
                    : "$0.00"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Usage history</h2>
              <p className="text-sm text-white/60">
                Previous cycles (most recent last)
              </p>
            </div>
            {data.usageHistory.length === 0 ? (
              <p className="text-sm text-white/60">No history yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
                    <tr>
                      <th className="px-3 py-2">Period start</th>
                      <th className="px-3 py-2">Period end</th>
                      <th className="px-3 py-2">SMS</th>
                      <th className="px-3 py-2">Limit</th>
                      <th className="px-3 py-2">Overage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.usageHistory.map((h, idx) => {
                      const over =
                        typeof h.overageCount === "number" ? h.overageCount : 0;
                      return (
                        <tr
                          key={idx}
                          className="border-b border-white/5 last:border-0 hover:bg-white/5"
                        >
                          <td className="px-3 py-2">
                            {formatTimestamp(h.periodStart)}
                          </td>
                          <td className="px-3 py-2">
                            {formatTimestamp(h.periodEnd)}
                          </td>
                          <td className="px-3 py-2">
                            {(h.smsCount ?? 0).toLocaleString()}
                          </td>
                          <td className="px-3 py-2">
                            {(h.limit ?? 0).toLocaleString()}
                          </td>
                          <td className="px-3 py-2">
                            {over > 0 ? over.toLocaleString() : "0"}
                            {h.overageRate
                              ? ` @ $${h.overageRate}/SMS`
                              : ""}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {workspace?.type === "agency" && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Client usage</h2>
                {clientUsageLoading && (
                  <span className="text-sm text-white/60">Loading clients…</span>
                )}
              </div>
              {clientUsageError && (
                <p className="text-sm text-rose-300">{clientUsageError}</p>
              )}
              {!clientUsageLoading && clientUsage.length === 0 && !clientUsageError ? (
                <p className="text-sm text-white/60">No client usage yet.</p>
              ) : null}
              {clientUsage.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
                      <tr>
                        <th className="px-3 py-2">Client</th>
                        <th className="px-3 py-2">SMS this month</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientUsage.map((c) => (
                        <tr
                          key={c.tenantId}
                          className="border-b border-white/5 last:border-0 hover:bg-white/5"
                        >
                          <td className="px-3 py-2">{c.name || "Client"}</td>
                          <td className="px-3 py-2">
                            {c.monthlySmsCount?.toLocaleString?.() ?? "0"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
