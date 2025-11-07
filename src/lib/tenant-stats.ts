// FILE: src/lib/tenant-stats.ts
import "server-only";
import { getAdminFirestore } from "@/lib/firebase-admin";

export type DashboardStats = {
  totalLeads: number;
  conversationsWaiting: number;
  appointmentsThisWeek: number;
  messagesLast7d: number;
};

export async function getTenantStats(
  tenantId: string
): Promise<DashboardStats> {
  const db = getAdminFirestore();
  const tenantRef = db.collection("tenants").doc(tenantId);

  const leadsRef = tenantRef.collection("leads");
  const conversationsRef = tenantRef.collection("conversations");
  const messagesRef = tenantRef.collection("messages");
  const appointmentsRef = tenantRef.collection("appointments");

  const [leadsSnap, conversationsSnap] = await Promise.all([
    leadsRef.get(),
    conversationsRef.get(),
  ]);

  const totalLeads = leadsSnap.size;
  const conversationsWaiting = conversationsSnap.size;

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAhead = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const messagesSnap = await messagesRef.get();
  const messagesLast7d = messagesSnap.docs.filter((doc) => {
    const created = doc.get("createdAt") ?? doc.get("created");
    const date =
      typeof created?.toDate === "function"
        ? created.toDate()
        : created
        ? new Date(created)
        : null;
    return date ? date >= sevenDaysAgo : false;
  }).length;

  const appointmentsSnap = await appointmentsRef.get();
  const appointmentsThisWeek = appointmentsSnap.docs.filter((doc) => {
    const start = doc.get("startTime") ?? doc.get("start");
    const date =
      typeof start?.toDate === "function"
        ? start.toDate()
        : start
        ? new Date(start)
        : null;
    if (!date) return false;
    return date >= now && date <= weekAhead;
  }).length;

  return {
    totalLeads,
    conversationsWaiting,
    appointmentsThisWeek,
    messagesLast7d,
  };
}
