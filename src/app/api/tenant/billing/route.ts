import { NextRequest, NextResponse } from "next/server";
import {
  getAdminFirestore,
} from "@/lib/firebase-admin";
import { resolvePlanConfig } from "@/lib/billing";
import { getUsageStats, ensureTenantUsageDefaults } from "@/lib/usage";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantWriteContext(req as any);
    const db = getAdminFirestore();

    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    if (!tenantSnap.exists) {
      return NextResponse.json(
        { ok: false, error: "tenant-not-found" },
        { status: 404 }
      );
    }
    const tenant = tenantSnap.data() as any;
    const planConfig = resolvePlanConfig(tenant?.planId);

    await ensureTenantUsageDefaults(tenantId);
    const usageRaw = await getUsageStats(tenantId);
    const serializeTs = (v: any) => {
      try {
        if (v?.toDate) return v.toDate();
        if (typeof v?.seconds === "number") return new Date(v.seconds * 1000);
        if (v) return new Date(v);
      } catch {}
      return null;
    };
    const usageHistory = Array.isArray(usageRaw?.usageHistory)
      ? usageRaw.usageHistory.map((h: any) => ({
          ...h,
          periodStart: serializeTs(h?.periodStart),
          periodEnd: serializeTs(h?.periodEnd),
        }))
      : [];
    const usage = usageRaw
      ? {
          ...usageRaw,
          billingCycleStart: serializeTs(usageRaw.billingCycleStart),
          usageHistory,
        }
      : null;

    return NextResponse.json({
      ok: true,
      planId: tenant?.planId ?? null,
      plan: planConfig,
      usage,
      stripeCustomerId: tenant?.stripeCustomerId || null,
      hasActiveSubscription: !!tenant?.hasActiveSubscription,
    });
  } catch (err) {
    return handleTenantApiError(err, "[tenant/billing] error");
  }
}
