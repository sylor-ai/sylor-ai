"use client";

import { Suspense } from "react";
import ResetPasswordClient from "./reset-password-client";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#050509] text-white">
          <div className="rounded-[18px] border border-white/10 bg-[#0b0c10]/80 px-6 py-4 text-sm text-white/70">
            Loading reset form…
          </div>
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
