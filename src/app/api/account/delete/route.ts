// SERVER ROUTE – runs on server, can use firebase-admin
import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenant, user } = await assertTenantWriteContext(req as any);
    const { uid } = await req.json();

    if (!uid || uid !== user.uid) {
      return NextResponse.json({ ok: false, error: "Missing uid" }, { status: 400 });
    }

    const firestore = getAdminFirestore();

    // delete user doc
    await firestore.collection("users").doc(uid).delete();

    // delete tenant only if it is the active tenant and user is owner; deeper cleanup should be handled by a proper offboarding task.
    const memberships = Array.isArray((tenant as any)?.memberships) ? (tenant as any).memberships : [];
    const isOwner =
      (tenant as any)?.ownerUid === user.uid ||
      memberships.some((m: any) => m?.tenantId === tenant.id && m?.role === "owner");
    if (tenant?.id && isOwner) {
      await firestore.collection("tenants").doc(tenant.id).delete();
    }

    // delete auth user
    await getAdminAuth().deleteUser(uid);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return handleTenantApiError(e, "[account/delete] error");
  }
}
