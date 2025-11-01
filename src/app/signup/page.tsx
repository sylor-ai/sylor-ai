"use client";

import { Suspense } from "react";
import SignupClient from "@/app/signup/signup-client";

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center">
          Loading…
        </div>
      }
    >
      <SignupClient />
    </Suspense>
  );
}
