import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { resetTenantUsage, ensureTenantUsageDefaults } from "@/lib/usage";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req as any);

    const db = getAdminFirestore();
    await ensureTenantUsageDefaults(tenantId);
    const result = await resetTenantUsage(tenantId);
    if (!result.ok) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleTenantApiError(err, "[tenant/reset-usage] error");
  }
}
