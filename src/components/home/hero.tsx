"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sparks = [
  { x: "15%", y: "10%", delay: "0s" },
  { x: "70%", y: "25%", delay: "2s" },
  { x: "40%", y: "60%", delay: "4s" },
];

const NAV_ITEMS = [
  { label: "Features", href: "#features", icon: "spark" },
  { label: "Product", href: "#product", icon: "box" },
  { label: "Customers", href: "#customers", icon: "users" },
  { label: "Pricing", href: "#pricing", icon: "cards" },
];

function MobileNavIcon({ name }: { name: string }) {
  const base =
    "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80";
  switch (name) {
    case "spark":
      return (
        <span className={base}>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 3 2 8-2 10 7-6 7 6-2-10 2-8-7 6-7-6Z" />
          </svg>
        </span>
      );
    case "box":
      return (
        <span className={base}>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3 2 9l10 6 10-6-10-6Z" />
            <path d="M2 15l10 6 10-6" />
            <path d="M12 3v18" />
          </svg>
        </span>
      );
    case "users":
      return (
        <span className={base}>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
      );
    case "cards":
      return (
        <span className={base}>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M7 15h2" />
          </svg>
        </span>
      );
    default:
      return <span className={base} />;
  }
}

export function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileNav = () => setMobileOpen(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <section className="relative w-full overflow-hidden overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(114,99,255,0.35),transparent_75%),linear-gradient(120deg,#05050a,#04040a_45%,#05050a)] px-4 pb-96 pt-24 sm:px-6 md:px-12 md:pt-28">
      {/* glowing background bits */}
      {sparks.map((spark, idx) => (
        <span
          key={idx}
          className="pointer-events-none absolute h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-[#5c5cff]/40 to-transparent blur-3xl"
          style={{
            top: spark.y,
            left: spark.x,
            animationDelay: spark.delay,
          }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,106,255,0.2),transparent_90%)]" />

      {/* ===== FIXED GLASS NAVBAR ===== */}
      <header className="fixed top-3 left-0 right-0 z-[60] flex justify-center px-4 sm:px-6">
        <div className="relative w-full max-w-4xl rounded-[15px] border border-white/15 bg-black/45 px-4 py-1.5 text-xs text-white/70 shadow-[0_22px_60px_rgba(5,5,10,0.55)] backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            {/* logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={closeMobileNav}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7f6dff] to-[#49e0d4] text-sm font-semibold text-black">
                S
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                Sylor AI
              </span>
            </Link>

            {/* desktop links */}
            <nav className="hidden items-center gap-3 text-[13px] md:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-[15px] px-3 py-1 transition hover:bg-white/10 hover:text-white"
                  onClick={closeMobileNav}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* desktop ctas */}
            <div className="hidden items-center gap-3 sm:flex">
              <a
                href="/login"
                className="btn-pill-outline min-w-[0] !h-7 w-28 px-0 text-[12px] text-white/80"
                onClick={closeMobileNav}
              >
                Log in
              </a>
              <a
                href="/signup"
                className="btn-pill-primary min-w-[0] !h-7 w-28 px-0 text-[12px]"
                onClick={closeMobileNav}
              >
                Get started
              </a>
            </div>

            {/* mobile cta + hamburger */}
            <div className="flex items-center gap-2 sm:hidden">
              <a
                href="/signup"
                className="rounded-full border border-white/20 px-3 py-1 text-[13px] text-white transition hover:border-white/60"
                onClick={closeMobileNav}
              >
                Join
              </a>
              <button
                type="button"
                aria-label="Open menu"
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/60 ${
                  mobileOpen ? "bg-white/10" : "bg-white/0"
                }`}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                <div className="space-y-1.5">
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition ${
                      mobileOpen ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-4 rounded-full bg-current transition ${
                      mobileOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 rounded-full bg-current transition ${
                      mobileOpen ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ===== MOBILE OVERLAY + DRAWER (OUTSIDE HEADER) ===== */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-[80] bg-black/55 sm:hidden"
          onClick={closeMobileNav}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-[90] flex h-screen w-[82%] max-w-[320px] flex-col border-r border-white/10 bg-[#05050a] shadow-[0_25px_80px_rgba(0,0,0,0.85)] transition-transform duration-300 sm:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={closeMobileNav}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                S
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sylor AI</p>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                  Platform
                </p>
              </div>
            </Link>
            <span className="text-[11px] uppercase tracking-[0.45em] text-white/30">
              Menu
            </span>
          </div>
          <nav className="flex flex-col gap-1 px-4 py-5 text-sm text-white/80">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-[12px] border border-white/10 px-3 py-2 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                onClick={closeMobileNav}
              >
                <MobileNavIcon name={item.icon} />
                <span className="text-base">{item.label}</span>
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/30" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto w-full border-t border-white/10 px-4 pb-6 pt-5">
            <div className="rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
              <p className="text-sm font-semibold text-white">Always on</p>
              <p className="mt-1">
                Sylor AI handles every lead within seconds - even after hours.
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="/login"
                className="w-full rounded-[12px] border border-white/20 px-4 py-3 text-center text-sm text-white/80 transition hover:border-white/50 hover:text-white"
                onClick={closeMobileNav}
              >
                Log in
              </a>
              <a
                href="/signup"
                className="w-full rounded-[12px] bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
                onClick={closeMobileNav}
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HERO CONTENT ===== */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
            Sylor AI
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            Live
          </span>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Your AI Dispatcher That,{" "}
            <span className="bg-gradient-to-r from-[#9a88ff] to-[#6ef1e3] bg-clip-text text-transparent">
              Never Sleeps.
            </span>
          </h1>
          <p className="text-[0.95rem] leading-relaxed text-white/65 md:text-[1.05rem] md:max-w-2xl">
            Sylor is your 24/7 AI Sales Assistant for Contractors — it instantly answers leads, books jobs, and fills your calendar while you sleep.
          </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="/signup" className="btn-pill-primary">
                Start free trial
              </a>
              <a href="/pricing" className="btn-pill-outline">
                See pricing
              </a>
            </div>
          <div className="flex flex-wrap items-center gap-6 pt-6 text-sm text-white/50">
            <div>
              <p className="text-xl font-semibold text-white">2m+</p>
              <p>Leads handled by Sylor automations</p>
            </div>
            <div className="hidden h-10 w-px bg-white/10 sm:block" />
            <div>
              <p className="text-xl font-semibold text-white">24/7</p>
              <p>Human-grade replies, every channel</p>
            </div>
          </div>
        </div>

        <div className="relative mt-10 w-full max-w-sm md:mt-0">
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6 shadow-[0_35px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-sm text-white/70">
              <span className="uppercase tracking-[0.3em]">Live Inbox</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                Online
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {["Solar install?", "Estimate for ADU?", "Booked for Friday"].map(
                (msg, idx) => (
                  <div
                    key={msg}
                    className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>
                        {idx === 0
                          ? "Inbound"
                          : idx === 1
                          ? "AI reply"
                          : "Booked"}
                      </span>
                      <span>just now</span>
                    </div>
                    <p className="mt-2 text-sm text-white">{msg}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 hidden rounded-[20px] border border-white/10 bg-black/60 px-5 py-4 shadow-[0_25px_60px_rgba(0,0,0,0.55)] md:block">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Response time
            </p>
            <p className="text-3xl font-semibold leading-tight text-white">
              4.3<span className="text-lg text-white/70"> sec</span>
            </p>
            <p className="mt-1 text-xs text-emerald-300">
              99.8% faster than human teams
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
