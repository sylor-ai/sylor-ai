import { Suspense } from "react";
import LeadCaptureClient from "./lead-capture-client";

export default function LeadCapturePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white">
          Loading…
        </div>
      }
    >
      <LeadCaptureClient />
    </Suspense>
  );
}

