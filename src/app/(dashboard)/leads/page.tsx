// FILE: src/app/(dashboard)/leads/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { api } from "@/lib/api";
import type { Lead } from "@/types";

type NewLeadState = {
  name: string;
  phone: string;
  service: string;
  city: string;
  value: string;
  status: "New" | "Contacted" | "Booked" | "Closed";
};

const statusColors: Record<Lead["status"], string> = {
  New: "bg-blue-500/10 text-blue-300",
  Contacted: "bg-amber-500/10 text-amber-300",
  Booked: "bg-emerald-500/10 text-emerald-300",
  Closed: "bg-slate-500/10 text-slate-200",
};

export default function LeadsPage() {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [newLead, setNewLead] = useState<NewLeadState>({
    name: "",
    phone: "",
    service: "",
    city: "",
    value: "",
    status: "New",
  });

  // load leads once we have a user
  useEffect(() => {
    async function run() {
      if (loading) return;
      if (!currentUser) {
        router.push("/login");
        return;
      }
      // user exists
      const data = await api.getLeads(currentUser.tenantId);
      setLeads(data);
    }
    run();
  }, [loading, currentUser, router]);

  async function refreshLeads() {
    if (!currentUser) return;
    const data = await api.getLeads(currentUser.tenantId);
    setLeads(data);
  }

  async function handleCreateLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser) return;

    setSaving(true);
    await api.createLead(currentUser.tenantId, {
      name: newLead.name || "New Lead",
      phone: newLead.phone || "",
      service: newLead.service || "General",
      city: newLead.city || "",
      value: Number(newLead.value) || 0,
      status: newLead.status,
    });
    setSaving(false);
    setIsAddOpen(false);
    setNewLead({
      name: "",
      phone: "",
      service: "",
      city: "",
      value: "",
      status: "New",
    });
    await refreshLeads();
  }

  const filtered = leads.filter((lead) => {
    const matchesFilter = filter === "all" ? true : lead.status === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      q.length === 0
        ? true
        : lead.name.toLowerCase().includes(q) ||
          lead.phone.toLowerCase().includes(q) ||
          lead.service.toLowerCase().includes(q) ||
          (lead.city || "").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="p-6 text-slate-400">Loading leads...</div>;
  }

  if (!currentUser) {
    return (
      <div className="p-6 text-slate-400">
        You are not logged in. Redirecting to login...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="text-sm text-slate-400">
            All captured leads across your sources.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-brand-primary px-4 py-2 rounded-lg font-semibold"
        >
          + Add lead
        </button>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2" aria-label="Filter leads by status">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "all"
                ? "bg-slate-800 text-white"
                : "bg-slate-900/20 text-slate-300"
            }`}
          >
            All ({leads.length})
          </button>
          <button
            onClick={() => setFilter("New")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "New"
                ? "bg-slate-800 text-white"
                : "bg-slate-900/20 text-slate-300"
            }`}
          >
            New
          </button>
          <button
            onClick={() => setFilter("Contacted")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "Contacted"
                ? "bg-slate-800 text-white"
                : "bg-slate-900/20 text-slate-300"
            }`}
          >
            Contacted
          </button>
          <button
            onClick={() => setFilter("Booked")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "Booked"
                ? "bg-slate-800 text-white"
                : "bg-slate-900/20 text-slate-300"
            }`}
          >
            Booked
          </button>
          <button
            onClick={() => setFilter("Closed")}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === "Closed"
                ? "bg-slate-800 text-white"
                : "bg-slate-900/20 text-slate-300"
            }`}
          >
            Closed
          </button>
        </div>

        <div className="flex-1" />

        {/* Search with visible label for axe */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="lead-search"
            className="text-xs text-slate-400 font-medium"
          >
            Search leads
          </label>
          <input
            id="lead-search"
            name="lead-search"
            type="text"
            placeholder="Name, phone, service, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm w-64 outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-card rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-950/30">
            <tr>
              <th className="text-left py-3 pl-4 pr-2 text-slate-400 font-medium">
                Lead
              </th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">
                Service
              </th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">
                City
              </th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">
                Value
              </th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">
                Status
              </th>
              <th className="text-left py-3 px-2 text-slate-400 font-medium">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-slate-800/60 hover:bg-slate-900/25"
                >
                  <td className="py-3 pl-4 pr-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {lead.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {lead.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-slate-200">{lead.service}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-slate-300">
                      {lead.city && lead.city.trim().length > 0
                        ? lead.city
                        : "-"}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    }).format(lead.value || 0)}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-400 text-xs">
                    {lead.created || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Lead Modal */}
      {isAddOpen ? (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-lead-title"
        >
          <div className="w-full max-w-lg bg-slate-950/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 id="add-lead-title" className="text-lg font-semibold">
                Add new lead
              </h2>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-white"
                aria-label="Close add lead dialog"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateLead} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lead-name"
                  className="text-sm text-slate-200 font-medium"
                >
                  Name
                </label>
                <input
                  id="lead-name"
                  name="lead-name"
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  placeholder="Client name"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
                />
              </div>

              {/* Phone + City */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label
                    htmlFor="lead-phone"
                    className="text-sm text-slate-200 font-medium"
                  >
                    Phone
                  </label>
                  <input
                    id="lead-phone"
                    name="lead-phone"
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) =>
                      setNewLead((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label
                    htmlFor="lead-city"
                    className="text-sm text-slate-200 font-medium"
                  >
                    City
                  </label>
                  <input
                    id="lead-city"
                    name="lead-city"
                    value={newLead.city}
                    onChange={(e) =>
                      setNewLead((p) => ({ ...p, city: e.target.value }))
                    }
                    placeholder="Los Angeles"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              {/* Service */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lead-service"
                  className="text-sm text-slate-200 font-medium"
                >
                  Service
                </label>
                <input
                  id="lead-service"
                  name="lead-service"
                  value={newLead.service}
                  onChange={(e) =>
                    setNewLead((p) => ({ ...p, service: e.target.value }))
                  }
                  required
                  placeholder="Roofing, ADU, Kitchen..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
                />
              </div>

              {/* Value + Status */}
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-2">
                  <label
                    htmlFor="lead-value"
                    className="text-sm text-slate-200 font-medium"
                  >
                    Lead value ($)
                  </label>
                  <input
                    id="lead-value"
                    name="lead-value"
                    type="number"
                    min={0}
                    value={newLead.value}
                    onChange={(e) =>
                      setNewLead((p) => ({ ...p, value: e.target.value }))
                    }
                    placeholder="1500"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label
                    htmlFor="lead-status"
                    className="text-sm text-slate-200 font-medium"
                  >
                    Status
                  </label>
                  <select
                    id="lead-status"
                    name="lead-status"
                    value={newLead.status}
                    onChange={(e) =>
                      setNewLead((p) => ({
                        ...p,
                        status: e.target.value as NewLeadState["status"],
                      }))
                    }
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Booked">Booked</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-700 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-brand-primary text-sm font-semibold"
                >
                  {saving ? "Saving..." : "Save lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
