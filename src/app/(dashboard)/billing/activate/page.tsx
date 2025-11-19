import { Suspense } from "react";
import type { PlanId } from "@/types";
import ActivatePlanClient from "./activate-plan-client";

type SearchParams = Promise<{ plan?: string }>;

export default async function ActivatePlanPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const rawPlan = params.plan;
  const planId: PlanId | undefined =
    rawPlan === "agency_core" || rawPlan === "agency_scale"
      ? rawPlan
      : undefined;

  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <ActivatePlanClient initialPlanId={planId} />
    </Suspense>
  );
}
