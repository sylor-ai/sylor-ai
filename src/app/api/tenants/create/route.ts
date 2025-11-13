import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertCsrf } from "@/lib/csrf";
import { getAuthContext } from "@/lib/auth-server";
import { setTenantCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    await assertCsrf();
  } catch {
    return NextResponse.json({ ok: false, error: "csrf" }, { status: 403 });
  }

  try {
    const ctx = await getAuthContext(req);
    if (!ctx) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }

    const { name } = await req.json().catch(() => ({}));
    const cleanName = typeof name === "string" ? name.trim() : "";
    if (!cleanName) {
      return NextResponse.json(
        { ok: false, error: "missing_name" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const ref = db.collection("tenants").doc();
    const timestamp = new Date();

    await ref.set({
      name: cleanName,
      createdAt: timestamp,
      ownerUid: ctx.uid,
    });

    await Promise.all([
      ref.collection("members").doc(ctx.uid).set({
        uid: ctx.uid,
        role: "owner",
        email: ctx.email,
        joinedAt: timestamp,
      }),
      db
        .collection("users")
        .doc(ctx.uid)
        .collection("tenants")
        .doc(ref.id)
        .set({
          tenantId: ref.id,
          name: cleanName,
          role: "owner",
          joinedAt: timestamp,
        }),
    ]);

    const res = NextResponse.json({
      ok: true,
      tenantId: ref.id,
      tenantName: cleanName,
    });
    setTenantCookie(res, ref.id, ctx.session);
    return res;
  } catch (err) {
    console.error("[tenant-create] failed", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
