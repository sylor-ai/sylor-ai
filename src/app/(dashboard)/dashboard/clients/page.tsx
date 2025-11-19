"use client";

import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/authed-fetch";
import { formatTimestamp } from "@/lib/utils";

type Workspace = {
  tenantId: string;
  name: string;
  type: string;
  role: string;
  isAgency?: boolean;
};

type ClientTenant = {
  id: string;
  businessName: string;
  createdAt?: any;
};

export default function ClientsPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [defaultTenantId, setDefaultTenantId] = useState<string | null>(null);
  const [clients, setClients] = useState<ClientTenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newClient, setNewClient] = useState({ name: "", niche: "", timeZone: "" });

  const currentWorkspace = workspaces.find((w) => w.tenantId === defaultTenantId) || null;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await authedFetch("/api/me/workspaces");
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Failed to load workspaces");
        if (!mounted) return;
        setWorkspaces(json.workspaces || []);
        setDefaultTenantId(json.defaultTenantId || null);
      } catch (err: any) {
        if (mounted) setError(err.message || "Failed to load workspaces");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!currentWorkspace || currentWorkspace.type !== "agency") return;
    let mounted = true;
    setLoading(true);
    setError(null);
    authedFetch("/api/agency/clients")
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) throw new Error(json.error || "Failed to load clients");
        if (mounted) setClients(json.clients || []);
      })
      .catch((err) => mounted && setError(err.message || "Failed to load clients"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [currentWorkspace]);

  const handleSwitch = async (tenantId: string) => {
    try {
      await authedFetch("/api/me/switch-tenant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId }),
      });
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Switch failed");
    }
  };

  const handleAddClient = async () => {
    if (!newClient.name.trim()) {
      setError("Client name is required.");
      return;
    }
    setAdding(true);
    setError(null);
    try {
      const res = await authedFetch("/api/agency/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to add client");
      setClients((prev) => [...prev, json.client]);
      setNewClient({ name: "", niche: "", timeZone: "" });
    } catch (err: any) {
      setError(err.message || "Failed to add client");
    } finally {
      setAdding(false);
    }
  };

  if (error) {
    return (
      <div className="p-6 text-sm text-rose-300">
        {error}
      </div>
    );
  }

  if (!currentWorkspace || currentWorkspace.type !== "agency") {
    return (
      <div className="p-6 text-sm text-white/60">
        This page is only available for agency accounts.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-white">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Clients</h1>
          <p className="text-sm text-white/60">
            Manage client workspaces under your agency.
          </p>
        </div>
        <div className="flex gap-2">
          <input
            className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
            placeholder="Client name"
            value={newClient.name}
            onChange={(e) => setNewClient((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
            placeholder="Niche (optional)"
            value={newClient.niche}
            onChange={(e) => setNewClient((p) => ({ ...p, niche: e.target.value }))}
          />
          <input
            className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
            placeholder="Time zone (optional)"
            value={newClient.timeZone}
            onChange={(e) => setNewClient((p) => ({ ...p, timeZone: e.target.value }))}
          />
          <button
            onClick={handleAddClient}
            disabled={adding}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {adding ? "Adding..." : "Add client"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-white/60">Loading clients...</div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30">
          {clients.length === 0 ? (
            <p className="text-sm text-white/60">
              You haven’t added any client accounts yet. Click “Add client” to create your first contractor.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-white/10 bg-white/5 text-left text-xs uppercase tracking-wide text-white/60">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Created</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                      <td className="px-3 py-2 font-medium text-white">{c.businessName}</td>
                      <td className="px-3 py-2 text-white/70">
                        {formatTimestamp((c as any).createdAt)}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => handleSwitch(c.id)}
                          className="rounded-md border border-white/15 px-3 py-1 text-xs text-white hover:border-white/40"
                        >
                          Switch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
