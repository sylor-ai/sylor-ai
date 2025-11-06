"use client";

import { Suspense } from "react";
import PublicLinkClient from "./public-link-client";

export default function PublicLinkPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <PublicLinkClient />
    </Suspense>
  );
}

