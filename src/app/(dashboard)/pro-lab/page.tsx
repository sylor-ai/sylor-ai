// FILE: src/app/(dashboard)/pro-lab/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySylorSession } from "@/lib/auth-server";
import { getTenantPlan } from "@/lib/plan-server";

export default async function ProLabPage() {
  const session = cookies().get("sylor_session")?.value || null;
  if (!session) redirect("/login?redirectTo=/pro-lab");

  const user = await verifySylorSession(session);
  if (!user) redirect("/login?redirectTo=/pro-lab");

  const plan = await getTenantPlan(user.id);
  const isPro = plan === "pro";

  if (!isPro) {
    return (
      <div className="max-w-2xl mx-auto py-10 text-white">
        <h1 className="text-2xl font-semibold mb-2">Pro Lab</h1>
        <p className="text-sm text-white/60 mb-4">
          This feature is available on the Pro plan.
        </p>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/80 mb-3">Unlock advanced automations and AI tools.</p>
          <div className="flex gap-2">
            <a
              href="/billing"
              className="inline-flex items-center rounded-xl bg-white text-black px-4 py-2 text-sm font-medium"
            >
              Upgrade to Pro
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 text-white">
      <h1 className="text-2xl font-semibold mb-2">Pro Lab</h1>
      <p className="text-sm text-white/60 mb-6">
        Experimental automations and AI assistants for Pro customers.
      </p>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-white/80">Coming soon: workflow automations, multi-channel campaigns, and more.</p>
      </div>
    </div>
  );
}

