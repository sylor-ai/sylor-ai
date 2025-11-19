"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "@/lib/api";
import type { Lead } from "@/types";
import { DashboardButton } from "@/components/dashboard-button";
import { formatTimestamp, normalizeTimestamps } from "@/lib/utils";

type NewLeadState = {
  name: string;
  phone: string;
  service: string;
  city: string;
  value: string;
  status: "New" | "Contacted" | "Booked" | "Closed";
};

const statusColors: Record<Lead["status"], string> = {
  New: "bg-blue-500/10 text-blue-200",
  Contacted: "bg-amber-500/10 text-amber-200",
  Booked: "bg-emerald-500/10 text-emerald-200",
  Closed: "bg-slate-500/10 text-slate-200",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2) || "LD";
}

export default function LeadsPage() {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newLead, setNewLead] = useState<NewLeadState>({
    name: "",
    phone: "",
    service: "",
    city: "",
    value: "",
    status: "New",
  });

  useEffect(() => {
    async function load() {
      if (loading) return;
      if (!currentUser || !currentUser.tenantId) {
        return;
      }
      const data = await api.getLeads(currentUser.tenantId);
      setLeads(normalizeTimestamps(data));
    }
    load();
  }, [loading, currentUser, router]);

  async function refresh() {
    if (!currentUser || !currentUser.tenantId) return;
    const data = await api.getLeads(currentUser.tenantId);
    setLeads(normalizeTimestamps(data));
  }

  async function handleCreateLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser || !currentUser.tenantId) return;

    setSaving(true);
    await api.createLead(currentUser.tenantId, {
      name: newLead.name || "New lead",
      phone: newLead.phone,
      service: newLead.service || "General",
      city: newLead.city,
      value: Number(newLead.value) || 0,
      status: newLead.status,
    });
    setSaving(false);
    setIsAddOpen(false);
    setNewLead({ name: "", phone: "", service: "", city: "", value: "", status: "New" });
    await refresh();
  }

  const filtered = leads.filter((lead) => {
    const matchesFilter = filter === "all" ? true : lead.status === filter;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0
        ? true
        : lead.name.toLowerCase().includes(query) ||
          lead.phone.toLowerCase().includes(query) ||
          lead.service.toLowerCase().includes(query) ||
          (lead.city || "").toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="p-6 text-white/60">Loading leads...</div>;
  }

  if (!currentUser) {
    return <div className="p-6 text-white/60">You are not logged in.</div>;
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-white/60">
            All of your inbound prospects across SMS, web, and manual entry.
          </p>
        </div>
        <div className="flex gap-2">
          <DashboardButton onClick={() => setIsAddOpen(true)} className="rounded-[10px]">
            Add lead
          </DashboardButton>
          <DashboardButton
            onClick={() => router.push("/settings/public-link")}
            className="rounded-[10px]"
          >
            Share capture link
          </DashboardButton>
        </div>
      </header>

      <section className="panel space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2" aria-label="Filter leads by status">
            {(["all", "New", "Contacted", "Booked", "Closed"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key === "all" ? "all" : key)}
                className={`chip ${filter === key ? "!bg-white/12 !text-white !border-white/20" : ""}`}
              >
                {key === "all" ? `All (${leads.length})` : key}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex flex-col gap-1">
            <label htmlFor="lead-search" className="text-xs text-white/60 font-medium">
              Search leads
            </label>
            <input
              id="lead-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, phone, service, city..."
              className="w-64"
            />
          </div>
        </div>
      </section>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
            <tr>
              <th className="text-left py-3 pl-4 pr-2 font-medium">Lead</th>
              <th className="text-left py-3 px-2 font-medium">Service</th>
              <th className="text-left py-3 px-2 font-medium">City</th>
              <th className="text-left py-3 px-2 font-medium">Value</th>
              <th className="text-left py-3 px-2 font-medium">Status</th>
              <th className="text-left py-3 px-2 font-medium">Last activity</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-white/55">
                  No leads match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead.id} className="border-t border-white/8 transition hover:bg-white/5">
                  <td className="py-3 pl-4 pr-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-xs text-white/60">{lead.phone || "-"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-white/85">{lead.service}</td>
                  <td className="py-3 px-2 text-white/70">{lead.city?.trim() || "-"}</td>
                  <td className="py-3 px-2 text-white/80">
                    {currencyFormatter.format(lead.value || 0)}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-xs text-white/60">
                    {formatTimestamp(
                      (lead as any).lastMessageAt ||
                        (lead as any).updatedAt ||
                        (lead as any).createdAt ||
                        (lead as any).created
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isAddOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-lead-title"
        >
          <div className="w-full max-w-lg panel space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="add-lead-title" className="text-lg font-semibold">
                  Add a new lead
                </h2>
                <p className="text-xs text-white/55">
                  Quick-add a prospect manually. You can edit details later from the lead drawer.
                </p>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="rounded-[10px] border border-white/20 px-3 py-1 text-xs text-white/75 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-200 hover:shadow-[0_0_18px_rgba(255,0,0,0.45)]"
                type="button"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>Name</span>
                  <input
                    value={newLead.name}
                    onChange={(e) => setNewLead((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Jane Contractor"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>Phone</span>
                  <input
                    value={newLead.phone}
                    onChange={(e) => setNewLead((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>Service</span>
                <input
                  value={newLead.service}
                  onChange={(e) => setNewLead((prev) => ({ ...prev, service: e.target.value }))}
                  placeholder="Roof repair, ADU build, kitchen remodel"
                  required
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>City</span>
                  <input
                    value={newLead.city}
                    onChange={(e) => setNewLead((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="Los Angeles"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>Lead value ($)</span>
                  <input
                    type="number"
                    min={0}
                    value={newLead.value}
                    onChange={(e) => setNewLead((prev) => ({ ...prev, value: e.target.value }))}
                    placeholder="1500"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>Status</span>
                <div className="relative">
                  <select
                    value={newLead.status}
                    onChange={(e) =>
                      setNewLead((prev) => ({
                        ...prev,
                        status: e.target.value as NewLeadState["status"],
                      }))
                    }
                    className="appearance-none w-full bg-black/40 border border-white/15 rounded-[12px] px-3 py-2 pr-8 text-sm text-white/80 focus:border-white/30 transition"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Booked">Booked</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <DashboardButton
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="w-28 justify-center rounded-[10px]"
                >
                  Cancel
                </DashboardButton>
                <DashboardButton
                  type="submit"
                  disabled={saving}
                  className="w-28 justify-center rounded-[10px]"
                >
                  {saving ? "Saving..." : "Save lead"}
                </DashboardButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
