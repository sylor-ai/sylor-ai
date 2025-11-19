// FILE: src/app/setup/setup-client.tsx
"use client";

import SetupInner from "./_setup-inner";

// Thin client wrapper for the setup flow
export default function SetupClient(props: { plan?: string }) {
  return <SetupInner initialPlan={props.plan} />;
}
