"use client";

import Link from "next/link";

export function FooterCTA() {
  return (
    <footer className="rounded-[32px] border border-white/10 bg-black/40 px-6 py-16 md:px-12 md:py-20 text-center space-y-6">
      <p className="text-sm uppercase tracking-[0.4em] text-white/45">
        Ready when you are
      </p>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
        Launch Sylor AI in under a weekend.
      </h2>
      <p className="text-white/70 max-w-3xl mx-auto text-lg">
        Onboard with our team, connect your calendar + CRM, and let Sylor greet every lead by
        Monday morning.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/signup" className="btn-pill-primary">
          Start free trial
        </Link>
        <Link href="/pricing" className="btn-pill-outline">
          Talk to us
        </Link>
      </div>
      <p className="pt-6 text-xs text-white/40">
        (c) {new Date().getFullYear()} Sylor AI - Built for modern service businesses.
      </p>
    </footer>
  );
}
