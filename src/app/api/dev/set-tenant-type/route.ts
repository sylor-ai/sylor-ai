import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const { tenant } = await assertTenantMembership(req);
    const body = await req.json().catch(() => ({} as any));
    const type = body?.type as string;

    if (type !== "direct" && type !== "agency" && type !== "client") {
      return NextResponse.json({ ok: false, error: "invalid-type" }, { status: 400 });
    }

    if (type === "client") {
      return NextResponse.json(
        { ok: false, error: "client-must-be-created-via-agency" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const updates: Record<string, any> = { type };
    if (type === "direct") {
      updates.parentAgencyId = undefined;
    }

    await db.collection("tenants").doc(tenant.id).set(updates, { merge: true });

    return NextResponse.json({ ok: true, type });
  } catch (err) {
    return handleTenantApiError(err, "[dev/set-tenant-type] error");
  }
}
