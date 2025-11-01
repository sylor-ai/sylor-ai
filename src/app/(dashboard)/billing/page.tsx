"use client";

import Link from "next/link";

export default function BillingPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Billing</h1>
        <p className="text-sm text-white/35">
          Manage your plan, payment method and invoices.
        </p>
      </div>

      <div className="rounded-[10px] border border-white/5 bg-white/1 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-xs text-white/35 uppercase mb-1">Current plan</p>
          <p className="text-lg font-semibold">Starter — $149/mo</p>
          <p className="text-xs text-white/35 mt-1">
            Billed monthly. Change or cancel anytime.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/pricing"
            className="rounded-[10px] bg-white/0 border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5"
          >
            Change plan
          </Link>
          <Link
            href="/api/stripe-portal"
            className="rounded-[10px] bg-white text-black px-3 py-1.5 text-sm font-medium hover:bg-white/90"
          >
            Open customer portal
          </Link>
        </div>
      </div>

      <div className="rounded-[10px] border border-white/5 bg-white/1 p-4">
        <p className="text-sm font-medium mb-3">Invoices</p>
        <p className="text-xs text-white/30">
          Connected to Stripe. You can list invoices here by calling your
          backend.
        </p>
      </div>
    </div>
  );
}
