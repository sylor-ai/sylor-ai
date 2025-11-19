// FILE: src/app/signup/success/page.tsx
import SignupSuccessClient from "./signup-success-client";

type RawSearchParams = {
  [key: string]: string | string[] | undefined;
};

type SearchParams = Promise<RawSearchParams>;

export default async function SignupSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const rawSessionId = params.session_id ?? (params.sessionId as string | undefined);
  const rawPlan = params.plan;

  const sessionId = typeof rawSessionId === "string" ? rawSessionId : undefined;

  const plan =
    typeof rawPlan === "string" &&
    (rawPlan === "agency_core" || rawPlan === "agency_scale")
      ? rawPlan
      : undefined;

  return <SignupSuccessClient sessionId={sessionId ?? null} plan={plan} />;
}
