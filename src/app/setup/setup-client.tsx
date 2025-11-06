// FILE: src/app/setup/setup-client.tsx
"use client";

import SetupInner from "./_setup-inner";

// Thin client wrapper for the setup flow. The inner component
// reads the selected plan from the URL (?plan=...) and handles
// saving business profile, then routes to pricing.
export default function SetupClient(_props: { plan?: string }) {
  return <SetupInner />;
}

