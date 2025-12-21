import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertAgencyContext } from "@/lib/tenant-context";
import { getUsageStats } from "@/lib/usage";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenantId } = await assertAgencyContext(req as any);

    const db = getAdminFirestore();
    const clientsSnap = await db
      .collection("tenants")
      .where("parentAgencyId", "==", tenantId)
      .where("type", "==", "client")
      .get();

    const clients: any[] = [];
    for (const doc of clientsSnap.docs) {
      const usage = (await getUsageStats(doc.id)) as any;
      clients.push({
        tenantId: doc.id,
        name: (doc.data() as any)?.businessName || "Client",
        monthlySmsCount: usage?.monthlySmsCount ?? 0,
        monthlyAiTokenCount: usage?.monthlyAiTokenCount ?? 0,
      });
    }

    return NextResponse.json({ ok: true, clients });
  } catch (err) {
    return handleTenantApiError(err, "[agency/usage-summary] error");
  }
}
