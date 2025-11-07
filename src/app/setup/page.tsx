// FILE: src/app/setup/page.tsx
import SetupClient from "./setup-client";

// In Next.js 16, searchParams can be a Promise
type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export default async function SetupPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Await the Promise to get the actual params
  const params = await searchParams;

  const rawPlan = params.plan;
  const plan =
    typeof rawPlan === "string"
      ? rawPlan
      : Array.isArray(rawPlan)
      ? rawPlan[0]
      : "starter";

  // No Suspense here either – just render the client-side setup UI
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      <SetupClient plan={plan} />
    </div>
  );
}
