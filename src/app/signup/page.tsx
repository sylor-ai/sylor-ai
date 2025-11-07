"use client";

import { Suspense } from "react";
import SignupClient from "@/app/signup/signup-client";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <Suspense fallback={null}>
        <SignupClient />
      </Suspense>
    </div>
  );
}
