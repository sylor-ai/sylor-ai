import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const { tenant } = await assertTenantWriteContext(req as any);
    const db = getAdminFirestore();
    const tenantId = tenant.id || tenant?.tenantId || tenant?.uid;

    // Placeholder metrics (could be extended per tenant)
    const leadsCountToday = 0;
    const leadsCountLast7Days = 0;
    const appointmentsLast7Days = 0;
    const aiMessagesLast7Days = 0;
    const leadsByDay: Array<{ date: string; label?: string; count: number }> = [];

    return NextResponse.json({
      ok: true,
      leadsCountToday,
      leadsCountLast7Days,
      appointmentsLast7Days,
      aiMessagesLast7Days,
      leadsByDay,
    });
  } catch (err: any) {
    return handleTenantApiError(err, "[analytics/overview] error");
  }
}
