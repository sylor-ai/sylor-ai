// src/app/setup/page.tsx
"use client";

import { Suspense } from "react";
import SetupInner from "@/app/setup/_setup-inner";

export const dynamic = "force-dynamic";

export default function SetupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
          <div className="text-sm text-white/40">Loading setup...</div>
        </div>
      }
    >
      <SetupInner />
    </Suspense>
  );
}
