// FILE: src/lib/recent-leads.ts
import "server-only";
import { getAdminFirestore } from "@/lib/firebase-admin";

export type RecentLead = {
  id: string;
  name: string | null;
  phone: string | null;
  service?: string | null;
  source?: string | null;
  createdAt: Date | null;
};

export async function getRecentLeads(
  tenantId: string,
  limit = 6
): Promise<RecentLead[]> {
  const db = getAdminFirestore();
  const snap = await db
    .collection("tenants")
    .doc(tenantId)
    .collection("leads")
    .orderBy("created", "desc")
    .limit(limit)
    .get();

  return snap.docs.map((doc) => {
    const data = doc.data() as any;
    const createdRaw = data.createdAt ?? data.created ?? null;
    let createdAt: Date | null = null;
    if (createdRaw?.toDate) {
      createdAt = createdRaw.toDate();
    } else if (typeof createdRaw === "string") {
      const parsed = new Date(createdRaw);
      createdAt = Number.isNaN(parsed.getTime()) ? null : parsed;
    }

    return {
      id: doc.id,
      name: data.name ?? null,
      phone: data.phone ?? null,
      service: data.service ?? null,
      source: data.source ?? null,
      createdAt,
    };
  });
}
