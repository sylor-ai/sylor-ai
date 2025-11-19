// FILE: src/app/setup/page.tsx
import { Suspense } from "react";
import SetupClient from "./setup-client";

type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function SetupPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const rawPlan = params.plan;
  const candidate =
    typeof rawPlan === "string"
      ? rawPlan
      : Array.isArray(rawPlan)
      ? rawPlan[0]
      : undefined;

  const plan =
    candidate === "agency_core" || candidate === "agency_scale"
      ? candidate
      : undefined;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
          <div className="text-sm text-white/60">Loading business setup...</div>
        </div>
      }
    >
      <SetupClient plan={plan} />
    </Suspense>
  );
}
