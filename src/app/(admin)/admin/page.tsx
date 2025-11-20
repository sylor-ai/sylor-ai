"use client";

import { useEffect, useState } from "react";

type TenantRow = {
  id: string;
  name?: string | null;
  planId?: string | null;
  hasActiveSubscription?: boolean;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  status?: string | null;
  createdAt?: string | null;
  lastActiveAt?: string | null;
  ownersCount?: number | null;
  billingEmail?: string | null;
};

export default function AdminHome() {
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/tenants", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Failed to load tenants");
        }
        setTenants(data.tenants || []);
      } catch (err: any) {
        setError(err?.message || "Unable to load tenants.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (value?: string | null) => {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  };

  async function callAdminEndpoint(url: string) {
    const res = await fetch(url, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      throw new Error(data?.error || "Request failed");
    }
  }

  async function cancelSubscription(tenantId: string) {
    if (!confirm("Cancel this tenant's subscription?")) return;
    setActionLoading(tenantId);
    try {
      await callAdminEndpoint(
        `/api/admin/tenants/${tenantId}/cancel-subscription`
      );
      setTenants((prev) =>
        prev.map((tenant) =>
          tenant.id === tenantId
            ? {
                ...tenant,
                hasActiveSubscription: false,
                planId: null,
                status: "canceled",
              }
            : tenant
        )
      );
    } catch (err: any) {
      alert(err?.message || "Unable to cancel subscription.");
    } finally {
      setActionLoading(null);
    }
  }

  async function toggleFreeze(tenant: TenantRow) {
    const endpoint =
      tenant.status === "frozen" ? "unfreeze" : "freeze";
    if (
      tenant.status === "frozen"
        ? !confirm("Unfreeze this tenant?")
        : !confirm("Freeze this tenant? Their team will be locked out.")
    ) {
      return;
    }
    setActionLoading(`${tenant.id}-freeze`);
    try {
      await callAdminEndpoint(
        `/api/admin/tenants/${tenant.id}/${endpoint}`
      );
      setTenants((prev) =>
        prev.map((t) =>
          t.id === tenant.id
            ? { ...t, status: endpoint === "freeze" ? "frozen" : "active" }
            : t
        )
      );
    } catch (err: any) {
      alert(err?.message || "Unable to update tenant status.");
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteTenant(tenantId: string) {
    if (
      !confirm(
        "Mark this tenant as deleted? This will lock them out immediately."
      )
    ) {
      return;
    }
    setActionLoading(`${tenantId}-delete`);
    try {
      await callAdminEndpoint(`/api/admin/tenants/${tenantId}/delete`);
      setTenants((prev) =>
        prev.map((tenant) =>
          tenant.id === tenantId ? { ...tenant, status: "deleted" } : tenant
        )
      );
    } catch (err: any) {
      alert(err?.message || "Unable to delete tenant.");
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-white/60">Loading tenants…</p>;
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Tenants</h2>
        <p className="text-sm text-white/60">
          Internal overview of every workspace on Sylor.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-2 text-left">Tenant</th>
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Billing email</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-white">
                    {tenant.name || tenant.id}
                  </div>
                  <div className="text-xs text-white/45">{tenant.id}</div>
                </td>
                <td className="px-4 py-3 text-white/80">
                  {tenant.planId || "—"}
                  <div className="text-[11px] text-white/40">
                    {tenant.hasActiveSubscription ? "Active sub" : "No sub"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ${
                      tenant.status === "active"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : tenant.status === "frozen"
                        ? "bg-yellow-400/10 text-yellow-200"
                        : "bg-red-400/10 text-red-300"
                    }`}
                  >
                    {tenant.status || "unknown"}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-white/60">
                  {tenant.billingEmail || "—"}
                </td>
                <td className="px-4 py-3 text-xs text-white/50">
                  {formatDate(tenant.createdAt)}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => cancelSubscription(tenant.id)}
                    disabled={actionLoading === tenant.id}
                    className="rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-200 transition hover:bg-yellow-400/20 disabled:opacity-40"
                  >
                    Cancel sub
                  </button>
                  <button
                    onClick={() => toggleFreeze(tenant)}
                    disabled={actionLoading === `${tenant.id}-freeze`}
                    className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10 disabled:opacity-40"
                  >
                    {tenant.status === "frozen" ? "Unfreeze" : "Freeze"}
                  </button>
                  <button
                    onClick={() => deleteTenant(tenant.id)}
                    disabled={actionLoading === `${tenant.id}-delete`}
                    className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500/20 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tenants.length === 0 && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-sm text-white/50"
                  colSpan={6}
                >
                  No tenants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
