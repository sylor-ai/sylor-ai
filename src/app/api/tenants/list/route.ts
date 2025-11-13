import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getAuthContext } from "@/lib/auth-server";

export async function GET(req: NextRequest) {
  try {
    const ctx = await getAuthContext(req);
    if (!ctx) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }

    const db = getAdminFirestore();
    const snap = await db
      .collection("users")
      .doc(ctx.uid)
      .collection("tenants")
      .get();

    const tenants = snap.docs.map((doc) => {
      const data = doc.data() as any;
      const tenantId = data.tenantId || doc.id;
      return {
        id: doc.id,
        tenantId,
        name: data.name || "Workspace",
        role: data.role || "member",
        active: tenantId === ctx.tenantId,
      };
    });

    return NextResponse.json({
      ok: true,
      tenants,
      currentTenantId: ctx.tenantId,
    });
  } catch (err) {
    console.error("[tenant-list] failed", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
