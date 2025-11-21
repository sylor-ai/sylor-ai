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

type SortOption =
  | "recent"
  | "oldest"
  | "value-high"
  | "value-low"
  | "name-asc"
  | "name-desc";

type EditLeadState = {
  name: string;
  phone: string;
  service: string;
  city: string;
  value: string;
  status: Lead["status"];
  email: string;
};

const selectFieldClass =
  "select-pill appearance-none rounded-[999px] border border-white/15 bg-gradient-to-r from-white/10 via-white/5 to-transparent px-4 py-2 pr-10 text-sm text-white/80 shadow-[0_12px_30px_rgba(5,5,9,0.4)] focus:border-white/40 focus:outline-none focus:ring-0";

const statusColors: Record<Lead["status"], string> = {
  New: "bg-[#1a5bff1f] text-[#9ec4ff] border border-[#3c7dff66]",
  Contacted: "bg-[#ffb3471f] text-[#ffd59c] border border-[#ffb34766]",
  Booked: "bg-[#0fff8b1c] text-[#96ffd0] border border-[#0fff8b66]",
  Closed: "bg-[#a3b1c51f] text-[#d7e2ff] border border-[#a3b1c566]",
};

const leadStatuses: Lead["status"][] = ["New", "Contacted", "Booked", "Closed"];

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "recent", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "value-high", label: "Value: high → low" },
  { value: "value-low", label: "Value: low → high" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "name-desc", label: "Name Z → A" },
];

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
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [editLead, setEditLead] = useState<EditLeadState | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [expandedMobileLeadId, setExpandedMobileLeadId] = useState<string | null>(null);
  const [sortPanelOpen, setSortPanelOpen] = useState(false);
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

  function toggleExpandedMobile(leadId: string) {
    setExpandedMobileLeadId((prev) => (prev === leadId ? null : leadId));
  }

  function openLeadDrawer(lead: Lead) {
    setActiveLead(lead);
    setEditLead({
      name: lead.name || "",
      phone: lead.phone || "",
      service: lead.service || "",
      city: lead.city || "",
      value: lead.value ? String(lead.value) : "",
      status: lead.status || "New",
      email: lead.email || "",
    });
    setEditError(null);
  }

  function closeLeadDrawer() {
    setActiveLead(null);
    setEditLead(null);
    setEditError(null);
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

  async function handleUpdateLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentUser?.tenantId || !activeLead || !editLead) return;

    setEditSaving(true);
    setEditError(null);
    try {
      await api.updateLead(currentUser.tenantId, activeLead.id, {
        name: editLead.name?.trim() || "New lead",
        phone: editLead.phone?.trim() || "",
        service: editLead.service?.trim() || "General",
        city: editLead.city?.trim() || "",
        email: editLead.email?.trim() || "",
        value: Number(editLead.value) || 0,
        status: editLead.status,
      });
      await refresh();
      closeLeadDrawer();
    } catch (err: any) {
      setEditError(err?.message || "Failed to save lead");
    } finally {
      setEditSaving(false);
    }
  }

  async function handleDeleteLead() {
    if (!currentUser?.tenantId || !activeLead) return;
    const confirmed = window.confirm(
      `Delete lead “${activeLead.name || activeLead.id}”? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleteLoading(true);
    setEditError(null);
    try {
      await api.deleteLead(currentUser.tenantId, activeLead.id);
      await refresh();
      closeLeadDrawer();
    } catch (err: any) {
      setEditError(err?.message || "Failed to delete lead");
    } finally {
      setDeleteLoading(false);
    }
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

  function getLeadTimestamp(lead: Lead) {
    const raw =
      (lead as any).updatedAt ||
      (lead as any).lastMessageAt ||
      (lead as any).createdAt ||
      (lead as any).created ||
      lead.created;
    if (!raw) return 0;
    if (typeof raw === "number") return raw;
    if (typeof raw === "string") {
      const parsed = Date.parse(raw);
      return Number.isNaN(parsed) ? 0 : parsed;
    }
    if (typeof raw?.toDate === "function") {
      return raw.toDate().getTime();
    }
    return 0;
  }

  const sortedLeads = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return getLeadTimestamp(b) - getLeadTimestamp(a);
      case "oldest":
        return getLeadTimestamp(a) - getLeadTimestamp(b);
      case "value-high":
        return (b.value || 0) - (a.value || 0);
      case "value-low":
        return (a.value || 0) - (b.value || 0);
      case "name-asc":
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      case "name-desc":
        return b.name.localeCompare(a.name, undefined, { sensitivity: "base" });
      default:
        return 0;
    }
  });

  const displayLeads = sortedLeads;

  if (loading) {
    return <div className="p-6 text-white/60">Loading leads...</div>;
  }

  if (!currentUser) {
    return <div className="p-6 text-white/60">You are not logged in.</div>;
  }

  return (
    <div className="space-y-8 min-h-full pb-10">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between gap-3 md:block">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <p className="hidden text-sm text-white/60 md:block">
            All of your inbound prospects across SMS, web, and manual entry.
          </p>
          <div className="md:hidden">
            <DashboardButton
              onClick={() => setIsAddOpen(true)}
              className="rounded-[10px] px-3 py-2 text-sm"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="10" y1="4" x2="10" y2="16" />
                <line x1="4" y1="10" x2="16" y2="10" />
              </svg>
            </DashboardButton>
          </div>
        </div>
        <div className="hidden gap-2 md:flex">
          <DashboardButton onClick={() => setIsAddOpen(true)} className="rounded-[10px] px-4">
            Add lead
          </DashboardButton>
          <DashboardButton
            onClick={() => router.push("/settings/public-link")}
            className="hidden rounded-[10px] md:inline-flex"
          >
            Share capture link
          </DashboardButton>
        </div>
      </header>

      <section className="panel space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div
            className="flex gap-2 justify-center md:justify-start"
            aria-label="Filter leads by status"
          >
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
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <label htmlFor="lead-search" className="text-xs text-white/60 font-medium">
              Search leads
            </label>
            <input
              id="lead-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, phone, service, city..."
              className="w-full md:w-64"
            />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <label htmlFor="lead-sort" className="text-xs text-white/60 font-medium">
              Sort leads
            </label>
            <div className="relative w-full md:w-48">
              <button
                type="button"
                className={`${selectFieldClass} w-full text-left md:hidden`}
                onClick={() => setSortPanelOpen(true)}
              >
                {sortOptions.find((o) => o.value === sortBy)?.label || "Newest first"}
              </button>
              <select
                id="lead-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className={`${selectFieldClass} hidden w-full md:block`}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 hidden items-center text-white/60 md:flex">
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
          </div>
        </div>
      </section>

      <div className="hidden md:block card overflow-hidden">
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
            {displayLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-white/55">
                  No leads match the current filters.
                </td>
              </tr>
            ) : (
              displayLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-white/8 transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open lead ${lead.name}`}
                  onClick={() => openLeadDrawer(lead)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLeadDrawer(lead);
                    }
                  }}
                >
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
                      className={`inline-flex min-w-[96px] items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[lead.status]}`}
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

      <div className="space-y-3 md:hidden">
        {displayLeads.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-white/55">
            No leads match the current filters.
          </div>
        ) : (
          displayLeads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openLeadDrawer(lead)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-base font-semibold text-white">{lead.name}</p>
                </button>
                <span
                  className={`inline-flex min-w-[96px] justify-center rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[lead.status]}`}
                >
                  {lead.status}
                </span>
                <button
                  onClick={() => toggleExpandedMobile(lead.id)}
                  aria-label="Toggle lead details"
                  className="rounded-full border border-white/20 p-1 text-white/70"
                >
                  <svg
                    className={`h-4 w-4 transition ${expandedMobileLeadId === lead.id ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </button>
              </div>
              {expandedMobileLeadId === lead.id ? (
                <div className="mt-3 space-y-2 text-xs text-white/70">
                  <div>
                    <p className="uppercase text-white/40">Phone</p>
                    <p>{lead.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="uppercase text-white/40">Service</p>
                    <p>{lead.service}</p>
                  </div>
                  <div>
                    <p className="uppercase text-white/40">City</p>
                    <p>{lead.city?.trim() || "—"}</p>
                  </div>
                  <div>
                    <p className="uppercase text-white/40">Value</p>
                    <p>{currencyFormatter.format(lead.value || 0)}</p>
                  </div>
                  <div>
                    <p className="uppercase text-white/40">Last activity</p>
                    <p>
                      {formatTimestamp(
                        (lead as any).lastMessageAt ||
                          (lead as any).updatedAt ||
                          (lead as any).createdAt ||
                          (lead as any).created
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => openLeadDrawer(lead)}
                    className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-white/80 underline"
                  >
                    Edit lead
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 11l4 4 6-10" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>

      {sortPanelOpen ? (
        <div className="fixed inset-0 z-40 flex flex-col md:hidden">
          <button
            className="flex-1 bg-black/60"
            aria-label="Close sort options"
            onClick={() => setSortPanelOpen(false)}
          />
          <div className="w-full rounded-t-3xl border border-white/10 bg-[#050509] p-6 shadow-2xl">
            <p className="mb-4 text-center text-sm font-semibold text-white/70">Sort leads</p>
            <div className="space-y-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setSortPanelOpen(false);
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-sm transition ${
                    sortBy === opt.value
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-white/10 text-white/80 hover:border-white/20"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}


      {activeLead && editLead ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-lead-title"
        >
          <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#050509]/95 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">Lead details</p>
                <h2 id="edit-lead-title" className="text-2xl font-semibold">
                  {activeLead.name || "Unnamed lead"}
                </h2>
                <p className="text-sm text-white/55">
                  Created{" "}
                  {formatTimestamp(
                    (activeLead as any).updatedAt ||
                      (activeLead as any).createdAt ||
                      activeLead.created
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLeadDrawer}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/80 transition hover:border-red-400 hover:text-red-200 hover:shadow-[0_0_18px_rgba(255,0,0,0.5)]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleUpdateLead} className="space-y-4 px-6 py-6">
              {editError ? (
                <div className="rounded-[14px] border border-red-500/40 bg-red-500/10 px-4 py-2 text-xs text-red-200">
                  {editError}
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>Name</span>
                  <input
                    value={editLead.name}
                    onChange={(e) =>
                      setEditLead((prev) => (prev ? { ...prev, name: e.target.value } : prev))
                    }
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>Phone</span>
                  <input
                    value={editLead.phone}
                    onChange={(e) =>
                      setEditLead((prev) => (prev ? { ...prev, phone: e.target.value } : prev))
                    }
                    placeholder="+1 (555) 123-4567"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>Email</span>
                <input
                  type="email"
                  value={editLead.email}
                  onChange={(e) =>
                    setEditLead((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                  }
                  placeholder="lead@email.com"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>Service</span>
                <input
                  value={editLead.service}
                  onChange={(e) =>
                    setEditLead((prev) => (prev ? { ...prev, service: e.target.value } : prev))
                  }
                  required
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>City</span>
                  <input
                    value={editLead.city}
                    onChange={(e) =>
                      setEditLead((prev) => (prev ? { ...prev, city: e.target.value } : prev))
                    }
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-white/70">
                  <span>Lead value ($)</span>
                  <input
                    type="number"
                    min={0}
                    value={editLead.value}
                    onChange={(e) =>
                      setEditLead((prev) => (prev ? { ...prev, value: e.target.value } : prev))
                    }
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm text-white/70">
                <span>Status</span>
                <div className="relative">
                  <select
                    value={editLead.status}
                    onChange={(e) =>
                      setEditLead((prev) =>
                        prev ? { ...prev, status: e.target.value as Lead["status"] } : prev
                      )
                    }
                    className={`${selectFieldClass} w-full`}
                  >
                    {leadStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
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

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteLead}
                  disabled={deleteLoading}
                  className="rounded-[12px] border border-red-400/70 px-4 py-1.5 text-sm font-semibold text-red-200 transition hover:border-red-300 hover:text-red-100 disabled:opacity-60"
                >
                  {deleteLoading ? "Deleting…" : "Delete lead"}
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeLeadDrawer}
                    className="rounded-[10px] border border-white/25 px-5 py-2 text-sm font-medium text-white/85 hover:border-white/40"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editSaving}
                    className="rounded-[10px] bg-white/90 px-5 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:bg-white disabled:opacity-60"
                  >
                    {editSaving ? "Saving…" : "Save lead"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isAddOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-lead-title"
        >
          <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#050509]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <h2 id="add-lead-title" className="text-2xl font-semibold">
                  Add a new lead
                </h2>
                <p className="text-sm text-white/55">
                  Quick-add a prospect manually. You can edit details later from the lead drawer.
                </p>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/80 transition hover:border-red-400 hover:text-red-200 hover:shadow-[0_0_18px_rgba(255,0,0,0.5)]"
                type="button"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 pt-5">
              <div className="grid gap-5 md:grid-cols-2">
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

              <div className="grid gap-5 md:grid-cols-2">
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
                    className={`${selectFieldClass} w-full`}
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

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="rounded-[10px] border border-white/25 px-6 py-2 text-sm font-semibold text-white/85 hover:border-white/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-[10px] bg-white/90 px-6 py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.25)] hover:bg-white disabled:opacity-60"
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
