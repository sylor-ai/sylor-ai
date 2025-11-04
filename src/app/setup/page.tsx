import { Suspense } from "react";
import SetupClient from "./setup-client";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function SetupPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const rawPlan = searchParams.plan;
  const plan =
    typeof rawPlan === "string"
      ? rawPlan
      : Array.isArray(rawPlan)
      ? rawPlan[0]
      : "starter";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
          <div className="text-sm text-white/60">
            Loading business setup…
          </div>
        </div>
      }
    >
      <SetupClient plan={plan} />
    </Suspense>
  );
}
