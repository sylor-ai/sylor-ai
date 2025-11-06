// FILE: src/lib/plan-server.ts
import { getAdminFirestore } from "@/lib/firebase-admin";

export type PlanId = "starter" | "pro";

export async function getTenantPlan(tenantId: string): Promise<PlanId | null> {
  try {
    const db = getAdminFirestore();
    const snap = await db.collection("tenants").doc(tenantId).get();
    if (!snap.exists) return null;
    const data = snap.data() as any;
    const planId = (data?.planId ?? null) as string | null;
    if (planId === "starter" || planId === "pro") return planId;
    return null;
  } catch {
    return null;
  }
}

