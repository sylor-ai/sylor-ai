import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { ensureTenantUsageDefaults, getUsageStats } from "@/lib/usage";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req as any);
    const db = getAdminFirestore();

    await ensureTenantUsageDefaults(tenantId);
    const stats = await getUsageStats(tenantId);
    if (!stats) {
      return NextResponse.json({ ok: false, error: "tenant-not-found" }, { status: 404 });
    }

    const serializeTs = (v: any) => {
      try {
        if (v?.toDate) return v.toDate();
        if (typeof v?.seconds === "number") return new Date(v.seconds * 1000);
        if (v) return new Date(v);
      } catch {}
      return null;
    };

    const usageHistory = Array.isArray(stats.usageHistory)
      ? stats.usageHistory.map((h: any) => ({
          ...h,
          periodStart: serializeTs(h?.periodStart),
          periodEnd: serializeTs(h?.periodEnd),
        }))
      : [];

    const result = {
      ...stats,
      billingCycleStart: serializeTs(stats.billingCycleStart),
      usageHistory,
    };

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return handleTenantApiError(err, "[tenant/usage] error");
  }
}
