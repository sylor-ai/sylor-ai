// src/app/(dashboard)/dashboard/page.tsx
"use client";

const LEADS = [
  { name: "Kitchen remodel - Encino", time: "2m ago", status: "Scheduled", tag: "Remodeling" },
  { name: "Roof repair - Calabasas", time: "7m ago", status: "SMS sent", tag: "Roofing" },
  { name: "Pool build - Thousand Oaks", time: "12m ago", status: "Awaiting reply", tag: "Pools" },
  { name: "Landscaping - Woodland Hills", time: "19m ago", status: "Booked", tag: "Landscaping" },
];

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "Booked"
      ? "bg-amber-500/10 text-amber-200"
      : status === "Scheduled"
      ? "bg-emerald-500/10 text-emerald-100"
      : "bg-white/5 text-white/40";
  return <span className={`inline-flex rounded-[10px] px-2 py-0.5 text-xs ${cls}`}>{status}</span>;
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-white/35">Realtime view of your service leads and AI dispatcher.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-[10px] bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20">Today</button>
          <button className="rounded-[10px] bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10">
            Last 7 days
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[10px] bg-white/5 border border-white/5 p-4">
          <p className="text-xs text-white/45">New leads (today)</p>
          <p className="mt-2 text-3xl font-semibold">12</p>
          <p className="mt-1 text-xs text-emerald-300">+4 vs yesterday</p>
        </div>
        <div className="rounded-[10px] bg-white/5 border border-white/5 p-4">
          <p className="text-xs text-white/45">Booked on calendar</p>
          <p className="mt-2 text-3xl font-semibold">7</p>
          <p className="mt-1 text-xs text-emerald-300">92% answer rate</p>
        </div>
        <div className="rounded-[10px] bg-white/5 border border-white/5 p-4">
          <p className="text-xs text-white/45">Avg. reply time</p>
          <p className="mt-2 text-3xl font-semibold">4.3s</p>
          <p className="mt-1 text-xs text-white/40">AI auto-response</p>
        </div>
        <div className="rounded-[10px] bg-gradient-to-br from-purple-500/40 to-fuchsia-500/10 border border-purple-300/40 p-4">
          <p className="text-xs text-white/75">AI dispatcher</p>
          <p className="mt-2 text-lg font-semibold">24 jobs ready to assign</p>
          <p className="mt-1 text-xs text-white/70">4 jobs need human approval</p>
          <button className="mt-3 rounded-[10px] bg-white/15 px-3 py-1.5 text-xs">View queue →</button>
        </div>
      </div>

      {/* main content */}
      <div className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
        {/* latest leads */}
        <div className="rounded-[10px] bg-white/2 border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">Latest leads</p>
            <button className="text-xs text-white/40 hover:text-white">View all →</button>
          </div>

          {/* Mobile: cards */}
          <div className="md:hidden space-y-2">
            {LEADS.map((lead) => (
              <div
                key={lead.name}
                className="rounded-[12px] border border-white/10 bg-white/[0.04] p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white/95">{lead.name}</p>
                  <span className="text-[11px] text-white/35">{lead.time}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status={lead.status} />
                  <span className="inline-flex rounded-[10px] bg-white/5 px-2 py-0.5 text-xs text-white/60">
                    {lead.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-white/30 border-b border-white/5">
                  <th className="py-2">Lead</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Tag</th>
                  <th className="py-2 text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {LEADS.map((lead) => (
                  <tr key={lead.name} className="border-b border-white/5/10">
                    <td className="py-2">{lead.name}</td>
                    <td className="py-2">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="py-2">
                      <span className="inline-flex rounded-[10px] bg-white/5 px-2 py-0.5 text-xs text-white/60">
                        {lead.tag}
                      </span>
                    </td>
                    <td className="py-2 text-right text-xs text-white/35">{lead.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-white/30">
            Synced from Firestore: <code>/tenants/{`{tenantId}`}/leads</code>
          </p>
        </div>

        {/* right column */}
        <div className="space-y-4">
          <div className="rounded-[10px] bg-white/2 border border-white/5 p-4">
            <p className="text-sm font-medium mb-3">Today’s activity</p>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-white/80">AI booked <b>Roof repair - Calabasas</b> for Tue 10:30</p>
                  <p className="text-xs text-white/30">2m ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-purple-400" />
                <div>
                  <p className="text-white/80">New lead from <b>Landing page → Form 1</b></p>
                  <p className="text-xs text-white/30">7m ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
                <div>
                  <p className="text-white/80">SMS pending response — “Pool build - Thousand Oaks”</p>
                  <p className="text-xs text-white/30">12m ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] bg-gradient-to-b from-purple-500/15 to-[#050506] border border-purple-400/30 p-4">
            <p className="text-sm font-medium mb-2">AI suggestions</p>
            <p className="text-xs text-white/50 mb-4">These are actions Sylor can do right now:</p>
            <div className="space-y-2">
              <button className="w-full rounded-[10px] bg-white/5 px-3 py-1.5 text-left text-sm hover:bg-white/10">
                • Send follow-up SMS to 3 stale leads
              </button>
              <button className="w-full rounded-[10px] bg-white/5 px-3 py-1.5 text-left text-sm hover:bg-white/10">
                • Reassign 2 jobs to closer crews
              </button>
              <button className="w-full rounded-[10px] bg-white/5 px-3 py-1.5 text-left text-sm hover:bg-white/10">
                • Generate weekly performance report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
