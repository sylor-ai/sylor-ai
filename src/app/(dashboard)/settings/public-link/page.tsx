"use client";

import { Suspense } from "react";
import PublicLinkClient from "./public-link-client";

export default function PublicLinkPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70">
            Loading...
          </div>
        </div>
      }
    >
      <PublicLinkClient />
    </Suspense>
  );
}
