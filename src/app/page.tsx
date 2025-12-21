"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

const capabilities = [
  {
    title: "Multichannel inbox",
    desc: "One place for inbound SMS, missed calls, forms, and web chat with AI handling first response.",
  },
  {
    title: "Calendar-aware AI",
    desc: "Understands your availability, books appointments, and avoids double booking in real time.",
  },
  {
    title: "Human-grade tone",
    desc: "Writes like your best dispatcher - empathetic, concise, and on-brand across every touch.",
  },
  {
    title: "Operator visibility",
    desc: "Live timeline of every touch, with pause/override controls and SLA alerts for your team.",
  },
];

const testimonials = [
  {
    quote: "We turned on Sylor Friday night and woke up to a booked calendar. Clients think it's a human.",
    name: "Morgan J.",
    title: "CEO, Peak Roofing",
  },
  {
    quote: "Response times dropped to seconds, and my team only steps in when high intent is detected.",
    name: "Carlos R.",
    title: "Founder, Brightline Services",
  },
];

const pricing = [
  {
    name: "Agency Core",
    price: "$1,499",
    features: ["20,000 SMS included", "Up to 10 client accounts", "Usage billed by billing owner"],
    cta: "Activate plan",
    popular: false,
  },
  {
    name: "Agency Scale",
    price: "$2,499",
    features: ["50,000 SMS included", "Up to 25 client accounts", "Fair overage for high-volume sends"],
    cta: "Activate plan",
    popular: true,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050509] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,99,255,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(102,217,255,0.15),transparent_32%),linear-gradient(140deg,rgba(25,25,35,0.8),rgba(5,5,9,0.9))]" />
      <div className="relative isolate">
        <TopNav />
        <Hero />
        <Capabilities />
        <Product />
        <TestimonialsSection />
        <Pricing />
        <FinalCTA />
      </div>
    </div>
  );
}

function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-3 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-[#050509]/40 px-3 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl">
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#7f6dff] to-[#58e0cf] text-xs font-semibold text-black">
                  S
                </div>
                <span className="text-sm font-medium text-white tracking-tight">Sylor AI</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <a href="#features" className="text-sm text-white/70 hover:text-white">Features</a>
              <a href="#product" className="text-sm text-white/70 hover:text-white">Product</a>
              <a href="#customers" className="text-sm text-white/70 hover:text-white">Customers</a>
              <a href="#pricing" className="text-sm text-white/70 hover:text-white">Pricing</a>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link href="/login" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Log in</Link>
              <Link href="/signup" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90">Get started</Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <Link href="/signup" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90">Join</Link>
              <button
                type="button"
                aria-label="Open menu"
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/90"
                onClick={() => setMenuOpen(true)}
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm border-r border-white/10 bg-[#050509]/95 p-5 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-semibold">S</div>
                <div>
                  <div className="text-white font-semibold leading-tight">Sylor AI</div>
                  <div className="text-white/50 text-xs tracking-[0.22em]">PLATFORM</div>
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-white/80"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <nav className="space-y-3">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Product", href: "#product" },
                  { label: "Customers", href: "#customers" },
                  { label: "Pricing", href: "#pricing" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/90"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-white font-semibold">Always on</div>
                <div className="mt-1 text-white/60 text-sm">Sylor AI handles every lead within seconds - even after hours.</div>
              </div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-center text-white/85"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-2xl bg-white px-4 py-4 text-center font-semibold text-black"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-16 pt-24 sm:px-6 lg:px-8" id="features" style={{ scrollMarginTop: "120px" }}>
      <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            Sylor AI
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your AI Dispatcher That{" "}
            <span className="bg-gradient-to-r from-[#9a88ff] via-[#7cd6ff] to-[#6ef1e3] bg-clip-text text-transparent">
              Never Sleeps.
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70">
            Sylor is your 24/7 AI sales assistant for contractors - instantly answering leads, booking jobs, and filling your calendar while you sleep.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/signup" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_15px_45px_rgba(255,255,255,0.18)] hover:-translate-y-[1px] transition">
              Start free trial
            </a>
            <a href="/pricing" className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/80 hover:border-white/60 transition">
              See pricing
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-white/60">
            <div>
              <p className="text-2xl font-semibold text-white">2m+</p>
              <p>Leads handled by Sylor automations</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <p className="text-2xl font-semibold text-white">24/7</p>
              <p>Human-grade replies across every channel</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-[#6f63ff]/20 blur-3xl" />
          <div className="absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-[#6ef1e3]/15 blur-3xl" />
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
              <span>Live inbox</span>
              <span className="flex items-center gap-2 text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Online
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: "Inbound", text: "Solar install?", time: "just now" },
                { label: "AI reply", text: "Got it - best time this week?", time: "4s" },
                { label: "Booked", text: "Friday, 2:30 PM confirmed", time: "1m" },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{item.label}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-white">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -right-8 -bottom-10 hidden rounded-2xl border border-white/10 bg-black/60 px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:block">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">Response time</p>
            <p className="text-3xl font-semibold leading-tight text-white">
              4.3<span className="text-lg text-white/60"> sec</span>
            </p>
            <p className="text-xs text-emerald-300">99.8% faster than human teams</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section id="features" style={{ scrollMarginTop: "120px" }} className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Capabilities</p>
            <h2 className="text-3xl font-semibold tracking-tight">AI ops for teams that run on leads.</h2>
          </div>
          <div className="text-sm text-white/60">Multichannel coverage, on-brand responses, and total operator control.</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((cap) => (
            <div key={cap.title} className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">{cap.title}</p>
                <span className="h-2 w-2 rounded-full bg-white/30" />
              </div>
              <p className="mt-2 text-sm text-white/65">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Product() {
  return (
    <section id="product" style={{ scrollMarginTop: "120px" }} className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Product</p>
          <h2 className="text-3xl font-semibold tracking-tight">See every conversation, calendar slot, and payment in one operating canvas.</h2>
          <ul className="space-y-3 text-white/70">
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              AI handles first touch; operators can pause, edit, or take over instantly.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Calendar-aware scheduling with travel buffers and business hours.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Live telemetry: inbound, AI reply, booked status with health indicator.
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -left-8 -top-10 h-36 w-36 rounded-full bg-[#7f6dff]/20 blur-3xl" />
          <div className="absolute -right-8 -bottom-10 h-40 w-40 rounded-full bg-[#6ef1e3]/20 blur-3xl" />
          <div className="relative space-y-3 rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">Syncing</span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/50">Automation status</span>
            </div>
            {[
              { title: "Inbound", body: "New lead: Kitchen remodel inquiry", badge: "Now" },
              { title: "AI Reply", body: "Great! Do mornings work? I can book you for Thu 10am.", badge: "4s" },
              { title: "Booked", body: "Confirmed: Thu 10am with Sam | Calendar + CRM synced", badge: "done" },
            ].map((row) => (
              <div key={row.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{row.title}</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/70">{row.badge}</span>
                </div>
                <p className="mt-2 text-white">{row.body}</p>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/70">
              <span>Automation status</span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">Healthy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="customers" style={{ scrollMarginTop: "120px" }} className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Customers</p>
          <h2 className="text-3xl font-semibold tracking-tight">Teams that run on Sylor.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-white/10 bg-black/25 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <p className="text-lg text-white/90 leading-relaxed">“{t.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-white">{t.name}</p>
              <p className="text-xs text-white/50">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{ scrollMarginTop: "120px" }} className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Pricing</p>
        <h2 className="text-3xl font-semibold tracking-tight">Pick the plan that fits your agency.</h2>
        <p className="text-white/60">Included SMS, client account caps, and transparent overage.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {pricing.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] ${tier.popular ? "ring-1 ring-[#8ad4ff]/60" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/50">{tier.name}</p>
                <p className="text-3xl font-semibold text-white">{tier.price}</p>
              </div>
              {tier.popular && <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Most popular</span>}
            </div>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="/pricing"
                className="block w-full rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black shadow-[0_15px_45px_rgba(255,255,255,0.2)] hover:bg-white/90"
              >
                Activate plan
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-14 text-center shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-12">
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">Ready when you are</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Launch Sylor AI in under a weekend.</h2>
        <p className="mt-3 text-white/70">Onboard with our team, connect your calendar + CRM, and let Sylor greet every lead by Monday morning.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/signup" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_15px_45px_rgba(255,255,255,0.2)] hover:bg-white/90">
            Start free trial
          </a>
          <a href="/pricing" className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/80 hover:border-white/60">
            Talk to us
          </a>
        </div>
        <p className="pt-6 text-xs text-white/40">(c) 2025 Sylor AI - Built for modern service businesses.</p>
      </div>
    </section>
  );
}

