// FILE: src/app/signup/page.tsx
"use client";

import SignupClient from "@/app/signup/signup-client";

export default function SignupPage() {
  // No Suspense here – just render the client component directly
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <SignupClient />
    </div>
  );
}
