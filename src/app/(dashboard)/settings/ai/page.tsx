import { Suspense } from "react";
import AiSettingsClient from "./ai-client";

export default function AiSettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-white/60">Loading...</div>}>
      <AiSettingsClient />
    </Suspense>
  );
}

