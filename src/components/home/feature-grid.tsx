"use client";

const FEATURES = [
  {
    title: "Multichannel inbox",
    description:
      "Unify SMS, web chat, and lead forms with AI that triages, qualifies, and routes instantly.",
    pill: "Realtime routing",
  },
  {
    title: "Calendar-aware AI",
    description:
      "Reads your availability, books jobs, sends reminders, and reschedules without double-booking.",
    pill: "Calendar sync",
  },
  {
    title: "Human-grade tone",
    description:
      "Train Sylor with your brand voice and services. Every reply feels handcrafted -- even at 2:00 a.m.",
    pill: "Brand voice",
  },
  {
    title: "Operator visibility",
    description:
      "Full audit trail, handoff controls, and AI / human collaboration so you never lose context.",
    pill: "Control center",
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="rounded-[32px] border border-white/10 bg-[#050507]/60 px-6 py-16 md:px-12 md:py-20 shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
    >
      <div className="flex flex-col gap-4 mb-10">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">
          Capabilities
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          AI ops for teams that run on leads.
        </h2>
        <p className="text-white/70 text-lg max-w-3xl">
          Sylor plugs into your existing workflows -- no rip-and-replace. Each module feels native,
          with thoughtful shortcuts for modern operators.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {FEATURES.map((feature) => (
          <article
            key={feature.title}
            className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-[#0f0f1a] via-[#08080f] to-[#050506] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,_rgba(113,99,255,0.25),transparent_55%)]" />
            <div className="relative z-10 space-y-4">
              <span className="inline-flex text-xs uppercase tracking-[0.3em] text-white/60">
                {feature.pill}
              </span>
              <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="text-white/65 leading-relaxed">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
