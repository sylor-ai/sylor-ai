import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { assertAgencyContext } from "@/lib/tenant-context";
import { initTenantUsageIfMissing } from "@/lib/usage";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenantId: activeTenant } = await assertAgencyContext(req as any);
    const db = getAdminFirestore();

    const clientsSnap = await db
      .collection("tenants")
      .where("parentAgencyId", "==", activeTenant)
      .where("type", "==", "client")
      .get();

    const clients = clientsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

    return NextResponse.json({ ok: true, clients });
  } catch (err) {
    return handleTenantApiError(err, "[agency/clients] GET error");
  }
}

export async function POST(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { user, tenantId: activeTenant } = await assertAgencyContext(req as any, {
      roles: ["owner", "admin"],
    });
    const db = getAdminFirestore();

    const body = await req.json().catch(() => ({}));
    const name = (body?.name || "").trim();
    const niche = (body?.niche || "").trim();
    const timeZone = (body?.timeZone || "").trim();
    if (!name) return NextResponse.json({ ok: false, error: "missing-name" }, { status: 400 });

    const tenantRef = db.collection("tenants").doc();
    const clientPayload = {
      id: tenantRef.id,
      businessName: name,
      businessPhone: "",
      type: "client",
      parentAgencyId: activeTenant,
      planId: null,
      pendingPlanId: null,
      hasActiveSubscription: false,
      niche: niche || null,
      timeZone: timeZone || null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      telnyxNumber: null,
      telnyxMessagingProfileId: null,
    };

    await tenantRef.set(clientPayload, { merge: true });

    // Add membership to user who created (so they can access the new client)
    const userRef = db.collection("users").doc(user.uid);
    await userRef.set(
      {
        memberships: FieldValue.arrayUnion({
          tenantId: tenantRef.id,
          role: "admin",
          isAgency: false,
        }),
      },
      { merge: true }
    );

    await initTenantUsageIfMissing(tenantRef.id);

    return NextResponse.json({
      ok: true,
      client: { id: tenantRef.id, businessName: name, type: "client", parentAgencyId: activeTenant },
    });
  } catch (err) {
    return handleTenantApiError(err, "[agency/clients] POST error");
  }
}
