import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-auth";

type ParamsPromise = Promise<{ tenantId: string }>;

export async function POST(
  _req: Request,
  context: { params: ParamsPromise }
) {
  try {
    await requireSuperAdmin();
    const { tenantId } = await context.params;
    if (!tenantId) {
      return NextResponse.json(
        { ok: false, error: "Missing tenantId" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const ref = db.collection("tenants").doc(tenantId);
    const snap = await ref.get();
    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "Tenant not found" },
        { status: 404 }
      );
    }

    await ref.update({
      status: "active",
      frozenAt: null,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to unfreeze tenant" },
      { status: err?.status ?? 500 }
    );
  }
}
