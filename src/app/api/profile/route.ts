// FILE: src/app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    const { user, tenantId } = await assertTenantMembership(req);
    if (!user || !tenantId) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const db = getAdminFirestore();
    const [userSnap, tenantSnap] = await Promise.all([
      db.collection("users").doc(user.uid).get(),
      db.collection("tenants").doc(tenantId).get(),
    ]);

    return NextResponse.json({
      ok: true,
      user: userSnap.exists ? { id: userSnap.id, ...userSnap.data() } : null,
      tenant: tenantSnap.exists ? { id: tenantSnap.id, ...tenantSnap.data() } : null,
    });
  } catch (err) {
    return handleTenantApiError(err, "[profile] GET error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req);
    if (!tenantId) {
      return NextResponse.json(
        { ok: false, error: "no-tenant" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const body = await req.json().catch(() => ({}));
    const { businessName, businessPhone, website, plan } = body || {};

    const updates: Record<string, any> = {
      updatedAt: Date.now(),
    };
    if (typeof businessName === "string") updates.businessName = businessName;
    if (typeof businessPhone === "string") updates.businessPhone = businessPhone;
    if (typeof website === "string") updates.website = website;
    if (plan === "agency_core" || plan === "agency_scale") {
      updates.pendingPlanId = plan;
    }

    await db.collection("tenants").doc(tenantId).set(updates, { merge: true });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleTenantApiError(err, "[profile] POST error");
  }
}
