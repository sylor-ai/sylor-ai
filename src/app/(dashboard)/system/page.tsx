"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";

type SummaryResponse = {
  ok: boolean;
  audits: Array<any>;
  tenants: Array<any>;
};

export default function SystemPage() {
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const auth = getFirebaseAuth();
        const token = await auth.currentUser?.getIdToken();
        const res = await fetch("/api/system/summary", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Request failed");
        setData(json);
      } catch (e: any) {
        setError(e?.message || "Failed to load");
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-10 text-white">
        <h1 className="text-xl font-semibold mb-2">System</h1>
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-white/60">Loading...</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 text-white">
      <h1 className="text-xl font-semibold mb-2">System</h1>
      <p className="text-sm text-white/60 mb-6">Admin-only diagnostics</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium mb-3">Recent audit logs</h2>
          <div className="space-y-2 text-sm">
            {data.audits.map((a) => (
              <div key={a.id} className="flex items-center justify-between border-b border-white/5 py-1">
                <div>
                  <div className="text-white/85">{a.type}</div>
                  <div className="text-xs text-white/40">{a.userId}</div>
                </div>
                <div className="text-xs text-white/40">{new Date(a.ts).toLocaleString()}</div>
              </div>
            ))}
            {data.audits.length === 0 && <div className="text-white/50 text-sm">No logs</div>}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium mb-3">Recent tenants</h2>
          <div className="space-y-2 text-sm">
            {data.tenants.map((t) => (
              <div key={t.id} className="flex items-center justify-between border-b border-white/5 py-1">
                <div>
                  <div className="text-white/85">{t.businessName || t.id}</div>
                  <div className="text-xs text-white/40">plan: {t.planId || "none"}</div>
                </div>
                <div className="text-xs text-white/40">{t.updatedAt ? new Date(t.updatedAt).toLocaleString() : ""}</div>
              </div>
            ))}
            {data.tenants.length === 0 && <div className="text-white/50 text-sm">No tenants</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

