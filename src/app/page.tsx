"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function HomePage() {
  // which button opened the picker: "nav" | "hero" | null
  const [planPickerOpen, setPlanPickerOpen] = useState<"nav" | "hero" | null>(
    null
  );

  // refs to detect outside clicks
  const navPickerRef = useRef<HTMLDivElement | null>(null);

  // close plan picker on outside click + on scroll (mobile friendly)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const insideNav = navPickerRef.current?.contains(target);
      if (!insideNav) {
        setPlanPickerOpen(null);
      }
    }
    function handleScroll() {
      setPlanPickerOpen(null);
    }
    document.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // used in pricing section / product CTA – can preselect plan
  function goTo(plan: "starter" | "pro") {
    // ✅ flow: home -> signup -> setup -> pricing -> stripe -> dashboard
    window.location.href = `/signup?plan=${plan}`;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white scroll-smooth">
      {/* TOP NAV */}
      <header className="sticky top-3 z-50 flex justify-center pointer-events-none">
        {/* ✅ center on mobile, wider on desktop */}
        <div className="pointer-events-auto mx-auto mt-2 flex h-14 w-full max-w-[430px] md:max-w-6xl items-center justify-between gap-4 rounded-[10px] border border-white/5 bg-neutral-300/6 px-2 backdrop-blur-md">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold">
              S
            </div>
            <span className="text-base font-semibold tracking-tight">
              Sylor.ai
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-2 text-sm text-white/60">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-[10px] px-3 py-1 hover:bg-white/5 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-2 md:gap-3 relative">
            {/* ✅ login button same height as CTA */}
            <Link
              href="/login"
              className="h-9 md:h-10 inline-flex items-center justify-center rounded-[6px] bg-[#161616] border border-white/5 px-3 md:px-4 text-sm text-white/80 hover:border-white/30 transition"
            >
              Log in
            </Link>

            {/* NAV get started → open plan picker */}
            <div
              ref={navPickerRef}
              className="relative"
              onMouseLeave={() =>
                setPlanPickerOpen((prev) => (prev === "nav" ? null : prev))
              }
            >
              {/* ✅ keep your gradient EXACTLY, just fixed height */}
              <button
  onClick={() =>
    setPlanPickerOpen((prev) => (prev === "nav" ? null : "nav"))
  }
  className="relative inline-flex h-9 md:h-9 items-center justify-center gap-2 rounded-[8px] p-[1px] bg-[linear-gradient(120deg,#ff5f6d,#ffc371,#71f6c8,#5b5fff,#ff5f6d)] bg-[length:200%_200%] transition-all duration-300 hover:animate-gradient-move"
>
  <span className="rounded-[8px] bg-white px-5 md:px-5 py-1.5 text-sm font-semibold text-black flex items-center gap-2">
    Get started
    <span className="text-lg leading-none">→</span>
  </span>
</button>


              {/* NAV plan picker dropdown */}
              {planPickerOpen === "nav" ? (
                <div className="absolute right-0 top-12 z-50 w-52 rounded-[16px] border border-white/10 bg-[#0f1011] shadow-xl p-2 space-y-1">
                  <p className="text-xs text-white/40 px-2 pb-1">
                    Choose a plan to start
                  </p>
                  <button
                    onClick={() => goTo("starter")}
                    className="w-full text-left rounded-[10px] px-2 py-1.5 text-sm hover:bg-white/5 flex items-center justify-between"
                  >
                    Starter{" "}
                    <span className="text-white/30 text-xs">$149/mo</span>
                  </button>
                  <button
                    onClick={() => goTo("pro")}
                    className="w-full text-left rounded-[10px] px-2 py-1.5 text-sm hover:bg-white/5 flex items-center justify-between"
                  >
                    Pro <span className="text-white/30 text-xs">$399/mo</span>
                  </button>
                </div>
              ) : null}
            </div>

            {/* mobile menu placeholder */}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/0 hover:bg-white/5 transition md:hidden"
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1">
                <span className="block h-0.5 w-4 bg-white/70 rounded" />
                <span className="block h-0.5 w-4 bg-white/70 rounded" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>
        {/* HERO */}
        <section className="relative" id="hero">
          {/* 🚫 DO NOT TOUCH GRADIENTS — keeping exactly as you had */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-20%] top-[-28%] h-[20px] w-[620px] bg-[radial-gradient(circle,_rgba(121,92,255,0.55)_0%,rgba(10,10,11,0)_50%)] blur-[150px]" />
            <div className="absolute left-[-25%] bottom-[-35%] h-[520px] w-[520px] bg-[radial-gradient(circle,_rgba(255,188,120,0.42)_56%,rgba(10,10,11,0)_80%)] blur-[150px]" />
          </div>

          {/* ✅ content centered on mobile */}
          <div className="mx-auto flex w-full max-w-[430px] md:max-w-6xl flex-col gap-10 px-4 pb-16 pt-16 md:flex-row md:items-center md:pb-20 md:pt-20">
            {/* hero left */}
            <div className="relative z-10 flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-[10px] border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                AI lead intake & dispatching for service businesses
              </div>
              <h1 className="text-[2.6rem] leading-[2.6rem] md:text-5xl md:leading-tight font-semibold tracking-tight text-white">
                The next generation
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-amber-200">
                  of AI operations.
                </span>
              </h1>
              <p className="max-w-xl text-base text-white/55 md:text-lg">
                Sylor.ai replies to new leads in seconds, books them on your
                Google Calendar, and syncs every message into your dashboard —
                so no job is left behind.
              </p>

              {/* HERO actions */}
              <div className="flex flex-wrap gap-3 relative">
                {/* hero → straight to /signup */}
                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="rounded-[10px] bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90 transition"
                >
                  Get started for free →
                </button>
                <Link
                  href="#product"
                  className="rounded-[10px] border border-white/10 bg-white/0 px-5 py-2 text-sm text-white/80 hover:border-white/40 transition"
                >
                  Request a demo
                </Link>
              </div>

              <div className="pt-4">
                <p className="text-xs uppercase tracking-wide text-white/40">
                  Trusted by teams building on
                </p>
                <div className="mt-3 flex flex-wrap gap-6 text-sm text-white/30">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Vercel
                  </span>
                  <span>Firebase</span>
                  <span>Stripe</span>
                  <span>Twilio</span>
                </div>
              </div>
            </div>

            {/* hero right */}
            <div className="relative z-10 flex-1 flex justify-center md:justify-end">
              <div className="w-full max-w-md rounded-[20px] border border-white/5 bg-[#0c0c0d]/80 p-4 shadow-[0_0_90px_rgba(129,106,255,0.25)]">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-white/60">Leads inbox</p>
                  <span className="rounded-[10px] bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                    12 new
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      name: "Kitchen remodel - Encino",
                      time: "2m ago",
                      status: "Scheduled",
                      color: "bg-emerald-500/10 text-emerald-200",
                    },
                    {
                      name: "Roof repair - Calabasas",
                      time: "4m ago",
                      status: "SMS sent",
                      color: "bg-white/5 text-white/40",
                    },
                    {
                      name: "Pool build - Thousand Oaks",
                      time: "8m ago",
                      status: "Awaiting reply",
                      color: "bg-white/5 text-white/40",
                    },
                    {
                      name: "Landscaping - Woodland Hills",
                      time: "12m ago",
                      status: "Booked",
                      color: "bg-amber-500/10 text-amber-200",
                    },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-[10px] bg-white/[0.015] px-3 py-2.5"
                    >
                      <div>
                        <p className="text-sm text-white/95">{item.name}</p>
                        <p className="text-xs text-white/30">{item.time}</p>
                      </div>
                      <span
                        className={`rounded-[10px] px-2 py-1 text-xs ${item.color}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[14px] border border-purple-500/40 bg-purple-500/5 p-4">
                  <p className="text-xs text-purple-50/70">
                    Sylor Agent · Smart reply
                  </p>
                  <p className="mt-2 text-sm text-white/90">
                    “Hi John 👋 We got your request for a roof inspection. I can
                    book you for <b>Tue 10:30am</b> — does that work?”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="mx-auto w-full max-w-[430px] md:max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Built for teams that can’t miss a lead
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/50">
                Every new submission, call, or SMS becomes a tracked
                conversation. Your crew sees the same data, in real time.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="#product"
                className="rounded-[10px] border border-white/10 px-4 py-1.5 text-sm text-white/70 hover:border-white/40"
              >
                Watch demo
              </Link>
              <Link
                href="#docs"
                className="rounded-[10px] bg-white/5 px-4 py-1.5 text-sm text-white/90 hover:bg-white/10"
              >
                Explore docs
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Instant SMS reply",
                desc: "Respond in <5 seconds to every lead across web, forms, or ads.",
              },
              {
                title: "Calendar auto-booking",
                desc: "AI proposes times and writes to Google Calendar for you.",
              },
              {
                title: "Multi-tenant ready",
                desc: "Your current Firestore tenant model drops in cleanly.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-[10px] border border-white/5 bg-white/2 p-5 hover:border-purple-400/40 hover:-translate-y-1 transition"
                style={{ backgroundColor: "rgba(13,13,14,0.35)" }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] bg-white/5">
                  <span className="text-lg">✦</span>
                </div>
                <h3 className="text-base font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{card.desc}</p>
                <Link
                  href="#docs"
                  className="mt-4 inline-block text-sm text-purple-200/80 hover:text-purple-100"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT */}
        <section
          id="product"
          className="mx-auto w-full max-w-[430px] md:max-w-6xl px-4 pb-16 sm:px-6 lg:px-8"
        >
          <div className="rounded-[10px] border border-white/5 bg-gradient-to-b from-white/5 to-white/[0.01] p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wide">
                  SYLOR OPS VIEW
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  One place for leads, SMS, calls and appointments.
                </h2>
                <p className="mt-3 max-w-xl text-sm text-white/50">
                  Stop switching tabs. Your dispatcher, your AI agent, and your
                  client comms all stay in a single modern interface.
                </p>
              </div>
              <button
                onClick={() => goTo("starter")}
                className="rounded-[10px] bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/15"
              >
                Start chatting →
              </button>
            </div>

            {/* fake dashboard */}
            <div className="mt-8 overflow-hidden rounded-[10px] border border-white/10 bg-[#0a0a0b]">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <p className="ml-3 text-xs text-white/40">
                  sylor.ai/dashboard/leads
                </p>
              </div>
              <div className="grid gap-0 md:grid-cols-[280px,1fr]">
                {/* left list */}
                <div className="border-r border-white/5 bg-[#0c0c0d] p-4">
                  <p className="text-xs text-white/40 mb-3 uppercase tracking-wide">
                    Inbox
                  </p>
                  <div className="space-y-2">
                    {["Needs reply", "Scheduled today", "Follow up", "Missed"].map(
                      (l, idx) => (
                        <button
                          key={l}
                          type="button"
                          className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-sm text-left ${
                            idx === 0
                              ? "bg-white/5 text-white"
                              : "text-white/40 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>{l}</span>
                          <span className="rounded-[10px] bg-white/10 px-2 py-0.5 text-xs text-white/70">
                            {idx === 0 ? 6 : idx === 1 ? 3 : 2}
                          </span>
                        </button>
                      )
                    )}
                  </div>
                  <p className="mt-6 text-xs text-white/30">
                    Synced with Firebase → tenants → leads
                  </p>
                </div>

                {/* right conversation */}
                <div className="p-5 space-y-4">
                  <p className="text-sm text-white/50" id="demo">
                    Conversation · #1342
                  </p>
                  <div className="space-y-3">
                    <div className="inline-block max-w-lg rounded-[10px] bg-white/5 px-4 py-2 text-sm text-white/90">
                      Client: “Hi, I need a bathroom remodel in Winnetka.”
                    </div>
                    <div className="inline-block max-w-lg rounded-[10px] bg-purple-500/10 px-4 py-2 text-sm text-white/90">
                      Sylor Agent: “Thanks! I can send someone **tomorrow 11:30
                      AM** or **Thu 9:00 AM**. Which works?”
                    </div>
                    <div className="inline-block max-w-lg rounded-[10px] bg-white/5 px-4 py-2 text-sm text-white/80">
                      Client: “Tomorrow is good.”
                    </div>
                  </div>
                  <div className="rounded-[10px] border border-white/10 bg-white/0 p-3 flex items-center justify-between">
                    <p className="text-sm text-white/50">
                      Google Calendar · Appointment will be created
                    </p>
                    <button
                      type="button"
                      className="rounded-[10px] bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/15"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section
          id="pricing"
          className="mx-auto w-full max-w-[430px] md:max-w-6xl px-4 pb-16 sm:px-6 lg:px-8"
        >
          <div className="rounded-[10px] border border-white/5 bg-gradient-to-r from-purple-500/5 via-slate-900 to-slate-900/30 p-8 text-center">
            <p className="text-sm text-white/50">Pricing</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Start free. Then just $149/mo.
            </h2>
            <p className="mt-2 text-sm text-white/50 max-w-2xl mx-auto">
              Perfect for contractors, remodeling companies, pool & landscaping,
              roofing, ADU teams — anyone who lives on inbound leads.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {/* STARTER */}
              <div className="rounded-[10px] bg-black/10 border border-white/5 px-6 py-4 text-left w-full max-w-sm">
                <p className="text-xs text-white/40 uppercase tracking-wide">
                  Starter
                </p>
                <p className="mt-2 text-3xl font-bold">$149</p>
                <p className="text-sm text-white/40">per month</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>• 50 leads / mo</li>
                  <li>• SMS automation</li>
                  <li>• Google Calendar booking</li>
                </ul>
                <button
                  onClick={() => goTo("starter")}
                  className="mt-4 inline-flex rounded-[10px] bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/15"
                >
                  Choose Starter
                </button>
              </div>
              {/* PRO */}
              <div className="rounded-[10px] bg-white text-left px-6 py-4 text-slate-950 w-full max-w-sm">
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Pro
                </p>
                <p className="mt-2 text-3xl font-bold">$399</p>
                <p className="text-sm text-slate-500">per month</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Unlimited leads</li>
                  <li>• Voice agent + SMS</li>
                  <li>• Multi-location / tenants</li>
                </ul>
                <button
                  onClick={() => goTo("pro")}
                  className="mt-4 block w-full rounded-[10px] bg-slate-950 py-2 text-center text-sm text-white hover:bg-slate-900"
                >
                  Choose Pro
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8" id="docs">
        <div className="mx-auto flex w-full max-w-[430px] md:max-w-6xl flex-col gap-4 px-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Sylor.ai. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition rounded-[10px]">
              Status
            </Link>
            <Link href="#" className="hover:text-white transition rounded-[10px]">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition rounded-[10px]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
