"use client";

import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/authed-fetch";

type Metrics = {
  totalLeads: number;
  conversationsEvaluated: number;
  avgFirstResponseMs: number | null;
  leadRepliedCount: number;
  leadRepliedNoAgentResponse: number;
  churnRiskScore: number;
};

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await authedFetch("/api/tenant/performance", { cache: "no-store" });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Failed to load performance");
        if (mounted) {
          setMetrics(json.metrics);
        }
      } catch (err) {
        if (mounted) setError((err as any)?.message || "Failed to load performance");
      } finally {
        mounted && setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const cards = [
    {
      label: "Total leads",
      value: metrics?.totalLeads ?? 0,
    },
    {
      label: "Conversations analyzed",
      value: metrics?.conversationsEvaluated ?? 0,
    },
    {
      label: "Avg first response",
      value:
        metrics?.avgFirstResponseMs != null
          ? `${Math.round(metrics.avgFirstResponseMs / 1000)}s`
          : "—",
    },
    {
      label: "Leads that replied",
      value: metrics?.leadRepliedCount ?? 0,
    },
    {
      label: "Leads w/ no agent reply",
      value: metrics?.leadRepliedNoAgentResponse ?? 0,
    },
    {
      label: "Churn risk score",
      value:
        metrics?.churnRiskScore != null
          ? `${metrics.churnRiskScore}%`
          : "—",
    },
  ];

  return (
    <div className="p-6 space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Performance</h1>
        <p className="text-sm text-white/60">
          Lead responsiveness and risk indicators.
        </p>
      </div>

      {loading && <div className="text-sm text-white/60">Loading...</div>}
      {error && (
        <div className="text-sm text-rose-400">Error: {error}</div>
      )}

      {metrics && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30"
              >
                <p className="text-sm text-white/70">{card.label}</p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30 text-sm text-white/70">
            <p className="font-semibold text-white mb-1">
              How we calculate churn risk
            </p>
            <p>
              The churn risk score is based on the percentage of leads who
              replied but never received any agent response. Reduce this by
              replying faster and ensuring AI or human follow-up.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
