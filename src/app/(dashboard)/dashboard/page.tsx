import { cookies } from "next/headers";
import DashboardClient from "./dashboard-client";
import { getTenantStats, type DashboardStats } from "@/lib/tenant-stats";
import { getRecentLeads } from "@/lib/recent-leads";
import { verifySylorSession } from "@/lib/auth-server";
import { getAdminFirestore } from "@/lib/firebase-admin";

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

    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(firebaseUser.id).get();
    const tenantId = userSnap.get("tenantId");
    if (typeof tenantId === "string" && tenantId.trim().length > 0) {
      return tenantId.trim();
    }

    const tenantDoc = await db.collection("tenants").doc(firebaseUser.id).get();
    if (tenantDoc.exists) {
      return tenantDoc.id;
    }

    return firebaseUser.id;
  } catch (err) {
    console.warn("[dashboard] resolveTenantId failed", err);
  }

  return (
    process.env.DEMO_TENANT_ID ||
    process.env.DEFAULT_TENANT_ID ||
    process.env.NEXT_PUBLIC_DEMO_TENANT_ID ||
    null
  );
}

export default async function DashboardPage() {
  const tenantId = await resolveTenantId();

  if (!tenantId) {
    console.warn("[dashboard] No tenant id available, using empty stats");
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
