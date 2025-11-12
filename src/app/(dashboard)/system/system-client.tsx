"use client";

import { useEffect, useMemo, useState } from "react";

type ServiceName = "stripe" | "openai" | "redis" | "telnyx";

type ServiceStatus = {
  ok: boolean;
  reason?: string;
};

type HealthResponse = {
  ok: boolean;
  services: Record<ServiceName, ServiceStatus>;
  env?: {
    nodeEnv?: string;
    commit?: string | null;
  };
};

export default function SystemClient() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchHealth() {
      try {
        if (!cancelled) setLoading(true);
        const res = await fetch("/api/health", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as HealthResponse;
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err: any) {
        console.error("[system] /api/health failed", err);
        if (!cancelled) {
          setError(err?.message || "Health check failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHealth().catch(() => {});
    const id = setInterval(fetchHealth, 60_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const services = useMemo(() => {
    return (name: ServiceName) => data?.services?.[name];
  }, [data]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold mb-1">System status</h1>
        <p className="text-sm text-white/40">
          Internal diagnostics for Stripe, OpenAI, Redis, and Telnyx.
        </p>
      </div>

      {loading && (
        <p className="text-sm text-white/50">Checking vital services…</p>
      )}

      {error && (
        <p className="text-sm text-red-400">
          Could not load health data: {error}
        </p>
      )}

      {data && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard label="Stripe" status={services("stripe")} />
          <StatusCard label="OpenAI" status={services("openai")} />
          <StatusCard label="Redis" status={services("redis")} />
          <StatusCard label="Telnyx" status={services("telnyx")} />
        </div>
      )}

      {data?.env && (
        <div className="text-xs text-white/40 space-y-1">
          <div>NODE_ENV: {data.env.nodeEnv || "unknown"}</div>
          <div>Commit: {data.env.commit || "n/a"}</div>
        </div>
      )}
    </div>
  );
}

function StatusCard({
  label,
  status,
}: {
  label: string;
  status?: ServiceStatus;
}) {
  const ok = status?.ok ?? false;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              ok ? "bg-emerald-400" : "bg-red-400"
            }`}
          />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-xs text-white/50">
          {ok ? "Operational" : "Issue"}
        </span>
      </div>
      {ok ? (
        <p className="text-xs text-white/45">
          Service looks healthy and reachable.
        </p>
      ) : (
        <p className="text-xs text-red-300">
          {status?.reason || "Unknown error"}
        </p>
      )}
    </div>
  );
}
