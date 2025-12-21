// FILE: src/app/api/metrics/route.ts
import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: Request) {
  try {
    const db = getAdminFirestore();
    const { tenantId } = await assertTenantWriteContext(req as any);

    const leadsSnap = await db.collection("tenants").doc(tenantId).collection("leads").get();
    const convosSnap = await db.collection("tenants").doc(tenantId).collection("conversations").get();
    const apptsSnap = await db.collection("tenants").doc(tenantId).collection("appointments").get();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    let recentMessages = 0;
    let aiMessages7d = 0;
    let humanMessages7d = 0;
    for (const convo of convosSnap.docs) {
      const msgsSnap = await db
        .collection("tenants")
        .doc(tenantId)
        .collection("conversations")
        .doc(convo.id)
        .collection("messages")
        .where("createdAt", ">=", sevenDaysAgo)
        .get();
      recentMessages += msgsSnap.size;
      for (const m of msgsSnap.docs) {
        const data = m.data() as any;
        if (data.direction === "outbound") {
          if (data.via === "ai") aiMessages7d++;
          else humanMessages7d++;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      leadsCount: leadsSnap.size,
      conversationsCount: convosSnap.size,
      appointmentsCount: apptsSnap.size,
      recentMessages,
      aiMessages7d,
      humanMessages7d,
    });
  } catch (e) {
    return handleTenantApiError(e, "[metrics] error");
  }
}
