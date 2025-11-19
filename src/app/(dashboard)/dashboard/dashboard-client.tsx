"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardButton } from "@/components/dashboard-button";
import { authedFetch } from "@/lib/authed-fetch";
import { useCurrentUser } from "@/hooks/use-current-user";

type DashboardStats = {
  totalLeads: number;
  conversationsWaiting: number;
  appointmentsThisWeek: number;
  messagesLast7d: number;
};

type RecentLead = {
  id: string;
  name: string | null;
  phone: string | null;
  service?: string | null;
  source?: string | null;
  createdAt: string | null;
};

type Props = {
  stats: DashboardStats;
  recentLeads: RecentLead[];
};

type AnalyticsOverview = {
  leadsCountToday: number;
  leadsCountLast7Days: number;
  appointmentsLast7Days: number;
  aiMessagesLast7Days: number;
  leadsByDay: Array<{ date: string; label?: string; count: number }>;
};

type TimelineEvent = {
  id: string;
  label: string;
  prefix: string;
  emphasis?: string;
  suffix?: string;
};

const statCardClass =
  "relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(132,120,255,0.3)_0%,rgba(19,17,32,0.92)_45%,rgba(6,6,10,1)_100%)] px-6 py-6 shadow-[0_42px_70px_rgba(5,5,9,0.65)] backdrop-blur";

export default function DashboardClient({ stats, recentLeads }: Props) {
  const router = useRouter();
  const { currentUser, loading: userLoading } = useCurrentUser();

  const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  useEffect(() => {
    if (userLoading) return;
    if (!currentUser) {
      router.push("/login");
      return;
    }

    let active = true;

    (async () => {
      try {
        const res = await authedFetch("/api/analytics/overview", {
          cache: "no-store",
        });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const data = await res.json().catch(() => null);
        if (!active) return;

        if (data?.ok === false) {
          throw new Error(data?.error || "Failed to load analytics");
        }

        setAnalytics({
          leadsCountToday: data?.leadsCountToday ?? 0,
          leadsCountLast7Days: data?.leadsCountLast7Days ?? 0,
          appointmentsLast7Days: data?.appointmentsLast7Days ?? 0,
          aiMessagesLast7Days: data?.aiMessagesLast7Days ?? 0,
          leadsByDay: Array.isArray(data?.leadsByDay) ? data.leadsByDay : [],
        });
        setAnalyticsError(null);
      } catch (err: any) {
        if (!active) return;
        setAnalytics(null);
        const msg = err?.message || "";
        setAnalyticsError(
          msg.includes("401")
            ? "Please sign in again."
            : "Could not load metrics."
        );
      } finally {
        if (active) {
          setAnalyticsLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [userLoading, currentUser, router]);

  const formatNumber = (value: number) =>
    Number.isFinite(value) ? value.toLocaleString() : "0";

  const analyticsCards = [
    {
      label: "Leads Today",
      subtitle: "Captured since midnight",
      value: analytics?.leadsCountToday ?? 0,
    },
    {
      label: "Leads (7d)",
      subtitle: "Across every source",
      value: analytics?.leadsCountLast7Days ?? 0,
    },
    {
      label: "Appointments (7d)",
      subtitle: "Booked via AI + humans",
      value: analytics?.appointmentsLast7Days ?? 0,
    },
    {
      label: "AI Messages (7d)",
      subtitle: "Automated SMS replies",
      value: analytics?.aiMessagesLast7Days ?? 0,
    },
  ];

  const metrics = [
    {
      label: "Leads",
      subtitle: "Active across all sources",
      value: stats.totalLeads.toLocaleString(),
    },
    {
      label: "Conversations",
      subtitle: "Waiting in your inbox",
      value: stats.conversationsWaiting.toLocaleString(),
    },
    {
      label: "Appointments",
      subtitle: "Booked this week",
      value: stats.appointmentsThisWeek.toLocaleString(),
    },
    {
      label: "Messages (7d)",
      subtitle: "AI replies + human follow-up",
      value: stats.messagesLast7d.toLocaleString(),
    },
  ];

  const goNewLead = () => router.push("/leads?new=1");

  const goShareLeadLink = async () => {
    try {
      const res = await fetch("/api/settings/public-link", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));

      if (
        res.ok &&
        data?.ok &&
        data.publicSlug &&
        data.publicCaptureEnabled
      ) {
        const base =
          process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
        const url = `${base}/lead/${data.publicSlug}`;
        await navigator.clipboard?.writeText(url);
      } else {
        router.push("/settings/public-link");
      }
    } catch {
      router.push("/settings/public-link");
    }
  };

  const goAiSettings = () => router.push("/settings/ai");
  const goMessages = () => router.push("/messages");

  const derivedLeadEvents: TimelineEvent[] = recentLeads.slice(0, 2).map(
    (lead, index) => ({
      id: lead.id ?? `lead-${index}`,
      label: "LEAD",
      prefix: "New lead captured from",
      emphasis: lead.source || "public lead link",
      suffix: ".",
    })
  );

  const fallbackEvents: TimelineEvent[] = [
    {
      id: "ai-event",
      label: "AI",
      prefix: "Sylor AI auto-replied to",
      emphasis: leadDescriptor(recentLeads[0]),
      suffix: ".",
    },
    {
      id: "billing-event",
      label: "BILLING",
      prefix: "Subscription upgraded to",
      emphasis: "Pro",
      suffix: ".",
    },
  ];

  const timelineEvents = [...derivedLeadEvents, ...fallbackEvents].slice(0, 3);

  return (
    <div className="space-y-8 text-white">
      {/* Page header */}
      <header className="space-y-2">
        <p className="text-sm text-white/60">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Your home services command center.
        </h1>
      </header>

      {/* Top stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsCards.map((card) => (
          <article key={card.label} className={statCardClass}>
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/15 opacity-40" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/9 to-transparent" />
            <div className="relative flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                {card.label}
              </p>
              <p className="text-4xl font-semibold text-white">
                {analyticsLoading ? "—" : formatNumber(card.value)}
              </p>
              <p className="text-[11px] text-white/40">{card.subtitle}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Chart */}
      <section className="rounded-[28px] border border-white/15 bg-[#090a10]/80 px-6 py-6 shadow-[0_32px_60px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-medium text-white/90">
              Lead flow (last 14 days)
            </h2>
            <p className="text-xs text-white/55">
              Daily leads captured across all channels.
            </p>
          </div>
          {analyticsLoading ? (
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              Loading
            </span>
          ) : null}
        </div>
        <div className="h-48">
          {analyticsError && !analyticsLoading ? (
            <p className="text-sm text-rose-300">{analyticsError}</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.leadsByDay ?? []}>
                <CartesianGrid
                  stroke="rgba(255,255,255,0.08)"
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="label"
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.4)"
                  tick={{ fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f0f16",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {/* Lower metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((card) => (
          <article key={card.label} className={statCardClass}>
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/15 opacity-40" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/9 to-transparent" />
            <div className="relative flex flex-col gap-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                {card.label}
              </p>
              <p className="text-4xl font-semibold text-white">
                {card.value}
              </p>
              <p className="text-[11px] text-white/40">{card.subtitle}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <DashboardButton onClick={goNewLead}>Add lead</DashboardButton>
        <DashboardButton variant="ghost" onClick={goMessages}>
          View messages
        </DashboardButton>
        <DashboardButton variant="ghost" onClick={goShareLeadLink}>
          Share lead link
        </DashboardButton>
        <DashboardButton variant="ghost" onClick={goAiSettings}>
          AI Settings
        </DashboardButton>
      </div>

      {/* Bottom cards */}
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] border border-white/15 bg-[#090a10]/80 px-6 py-6 space-y-5 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur h-full">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-medium text-white/90">
                Recent activity
              </h2>
              <p className="text-xs text-white/55">
                Latest events across your workspace.
              </p>
            </div>
            <button
              className="text-xs text-white/60 hover:text-white/85 transition"
              onClick={() => router.push("/leads")}
            >
              View all
            </button>
          </div>

          <ul className="space-y-3">
            {timelineEvents.map((event) => (
              <li
                key={event.id}
                className="flex items-center gap-3 rounded-[18px] border border-white/8 bg-[#0f0f16] px-3 py-2"
              >
                <span className="px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-white/65 rounded-full bg-white/5 border border-white/10">
                  {event.label}
                </span>
                <p className="text-sm text-white/80">
                  {event.prefix}{" "}
                  {event.emphasis ? (
                    <span className="font-semibold text-white">
                      {event.emphasis}
                    </span>
                  ) : null}
                  {event.suffix}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[28px] border border-white/15 bg-[#090a10]/80 px-6 py-6 space-y-4 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur h-full">
          <h2 className="text-sm font-medium text-white/90">
            Launch checklist
          </h2>
          <ul className="space-y-2 text-sm text-white/65 list-disc list-inside">
            <li>Confirm your business profile in Settings.</li>
            <li>Share your public lead link with customers.</li>
            <li>Send a test conversation to ensure AI responses.</li>
            <li>Connect billing when you&apos;re ready to scale.</li>
          </ul>
          <DashboardButton
            variant="ghost"
            className="w-max border-white/12 bg-[#111017] text-white/80 hover:bg-white/10"
            onClick={() => router.push("/settings/public-link")}
          >
            Manage public link
          </DashboardButton>
        </article>
      </section>
    </div>
  );
}

function leadDescriptor(lead?: RecentLead) {
  if (!lead) return "Roof repair - Calabasas";
  return (
    lead.service ||
    lead.name ||
    lead.phone ||
    "Roof repair - Calabasas"
  );
}
