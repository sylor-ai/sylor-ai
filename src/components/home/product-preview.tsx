"use client";

const TIMELINE = [
  {
    title: "Lead captured - Web form",
    body: '"Hey! Looking for a kitchen remodel quote in Austin."',
    badge: "Inbound",
  },
  {
    title: "Sylor AI",
    body: '"Great news -- we can get you a same-week walkthrough. Does Thursday 10:30 AM work?"',
    badge: "AI Reply",
  },
  {
    title: "Lead confirmed",
    body: '"Perfect. Please send the calendar invite."',
    badge: "Booked",
  },
];

export function ProductPreview() {
  return (
    <section
      id="product"
      className="grid gap-8 lg:grid-cols-2 items-center rounded-[32px] border border-white/10 bg-gradient-to-br from-[#08080c] via-[#050506] to-[#020203] px-6 py-16 md:px-12 md:py-20"
    >
      <div className="space-y-6">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">
          Operating Canvas
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          See every conversation, calendar slot, and payment in one glass board.
        </h2>
        <p className="text-white/70 text-lg leading-relaxed">
          The Sylor console blends analytics, automations, and live control into a single surface.
          Drag to reassign AI, drop in templates, or let Sylor handle the entire thread
          automatically.
        </p>
        <ul className="space-y-2 text-white/70">
          <li>- Live presence + typing indicators for AI vs. human.</li>
          <li>- Bring your CRM via API -- Sylor syncs context instantly.</li>
          <li>- Command palette for &quot;pause AI&quot;, &quot;send proposal&quot;, &quot;collect payment&quot;.</li>
        </ul>
      </div>

      <div className="relative">
        <div className="rounded-[28px] border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] px-6 py-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Conversation timeline</span>
            <span className="text-emerald-300 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Syncing
            </span>
          </div>
          <div className="space-y-6">
            {TIMELINE.map((item) => (
              <div key={item.title} className="space-y-2">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{item.title}</span>
                  <span className="px-2 py-0.5 rounded-full border border-white/15 text-white/60 uppercase tracking-[0.3em]">
                    {item.badge}
                  </span>
                </div>
                <p className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -left-10 -bottom-10 hidden md:block rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          <p className="text-xs text-white/50 uppercase tracking-[0.3em]">
            Automation status
          </p>
          <p className="text-base text-white mt-1">Sylor AI replying automatically.</p>
        </div>
      </div>
    </section>
  );
}
