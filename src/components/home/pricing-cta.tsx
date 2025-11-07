"use client";

import Link from "next/link";

const PLANS = [
  {
    name: "Starter",
    price: "$149",
    tagline: "Per location / mo",
    includes: ["50 AI qualified leads", "SMS + web intake", "Operator fallbacks"],
  },
  {
    name: "Pro",
    price: "$399",
    tagline: "Per location / mo",
    includes: ["Unlimited automations", "Voice + calendar sync", "Advanced analytics & API"],
    highlight: true,
  },
];

export function PricingCTA() {
  return (
    <section
      id="pricing"
      className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0d0d16] via-[#07070b] to-[#030304] px-6 py-16 md:px-12 md:py-20"
    >
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">
          Pricing
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          Scale from your first 50 leads to thousands.
        </h2>
        <p className="text-white/70 text-lg">
          No credits, no usage throttles. All plans ship with AI, automations, and human-grade
          controls.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-[26px] border px-6 py-6 text-white backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.5)] ${
              plan.highlight ? "border-white/30 bg-white/10" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-2xl font-semibold">{plan.name}</p>
                <p className="text-sm text-white/50">{plan.tagline}</p>
              </div>
              {plan.highlight && (
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                  Most popular
                </span>
              )}
            </div>
            <p className="mt-6 text-4xl font-semibold">{plan.price}</p>
            <ul className="mt-6 space-y-2 text-white/70 text-sm">
              {plan.includes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={plan.highlight ? "btn-pill-primary w-full" : "btn-pill-outline w-full"}
            >
              {plan.highlight ? "Start Pro trial" : "Start Starter plan"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
