import { cookies } from "next/headers";
import DashboardClient from "./dashboard-client";
import { getTenantStats, type DashboardStats } from "@/lib/tenant-stats";
import { getRecentLeads } from "@/lib/recent-leads";
import { verifySylorSession } from "@/lib/auth-server";
import { getActiveTenantIdForUser } from "@/lib/tenant-context";

export const dynamic = "force-dynamic";

const EMPTY_STATS: DashboardStats = {
  totalLeads: 0,
  conversationsWaiting: 0,
  appointmentsThisWeek: 0,
  messagesLast7d: 0,
};

async function resolveTenantId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("sylor_session")?.value ?? null;
    if (!session) return null;

    const firebaseUser = await verifySylorSession(session);
    if (!firebaseUser?.id) return null;

    const resolved = await getActiveTenantIdForUser(firebaseUser.id);
    if (resolved) {
      return resolved;
    }
  } catch (err) {
    console.warn("[dashboard] resolveTenantId failed", err);
  }
  return null;
}

export default async function DashboardPage() {
  const tenantId = await resolveTenantId();

  if (!tenantId) {
    // No tenant yet (no memberships) -- render empty stats quietly.
    return <DashboardClient stats={EMPTY_STATS} recentLeads={[]} />;
  }

  let stats: DashboardStats = EMPTY_STATS;
  let recentLeads: Array<{
    id: string;
    name: string | null;
    phone: string | null;
    service?: string | null;
    source?: string | null;
    createdAt: string | null;
  }> = [];

  try {
    const [s, leads] = await Promise.all([
      getTenantStats(tenantId),
      getRecentLeads(tenantId, 8),
    ]);
    stats = s;
    recentLeads = leads.map((lead) => ({
      ...lead,
      createdAt: lead.createdAt ? lead.createdAt.toISOString() : null,
    }));
  } catch (err) {
    console.error("[dashboard] failed to load data", err);
  }

  return <DashboardClient stats={stats} recentLeads={recentLeads} />;
}
