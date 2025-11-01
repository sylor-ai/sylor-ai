// FILE: src/app/pricing/page.tsx
"use client";

import { Suspense } from "react";
import PricingClient from "@/app/pricing/pricing-client";

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">Loading…</div>}>
      <PricingClient />
    </Suspense>
  );
}
