// FILE: src/app/auth/magic/complete/page.tsx
import { Suspense } from "react";
import MagicCompleteClient from "./magic-complete-client";

export const dynamic = "force-dynamic";

export default function MagicCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl">
            <h1 className="text-lg font-semibold mb-2">
              Completing your login&hellip;
            </h1>
            <p className="text-sm text-muted-foreground">
              Please wait a moment while we verify your magic link.
            </p>
          </div>
        </div>
      }
    >
      <MagicCompleteClient />
    </Suspense>
  );
}
