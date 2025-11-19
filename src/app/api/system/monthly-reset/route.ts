import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import {
  ensureTenantUsageDefaults,
  resetTenantUsage,
} from "@/lib/usage";

/**
 * Serverless-safe manual trigger for monthly usage resets.
 * Can be scheduled via Vercel Cron to run on the 1st of the month.
 */
export async function POST(req: NextRequest) {
  try {
    const db = getAdminFirestore();
    const tenantsSnap = await db.collection("tenants").limit(50).get();
    let processed = 0;
    for (const doc of tenantsSnap.docs) {
      const tenantId = doc.id;
      await ensureTenantUsageDefaults(tenantId).catch(() => null);
      await resetTenantUsage(tenantId).catch((err) =>
        console.error("[monthly-reset] reset failed", tenantId, err)
      );
      processed++;
    }
    return NextResponse.json({ ok: true, processed });
  } catch (err) {
    console.error("[monthly-reset] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
