import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertCsrf } from "@/lib/csrf";
import { getAuthContext } from "@/lib/auth-server";
import { setTenantCookie } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    assertCsrf();
  } catch {
    return NextResponse.json({ ok: false, error: "csrf" }, { status: 403 });
  }

  try {
    const ctx = await getAuthContext(req);
    if (!ctx || !ctx.email) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }

    const { tenantId, inviteId } = await req.json().catch(() => ({}));
    if (!tenantId || !inviteId) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const invRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("invites")
      .doc(inviteId);
    const snap = await invRef.get();
    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "invite_not_found" },
        { status: 404 }
      );
    }

    const data = snap.data() as any;
    const inviteEmail = String(data.email || "").toLowerCase();
    if (inviteEmail !== ctx.email.toLowerCase()) {
      return NextResponse.json(
        { ok: false, error: "invite_email_mismatch" },
        { status: 403 }
      );
    }

    const role = data.role || "member";
    const timestamp = new Date();

    await Promise.all([
      db
        .collection("tenants")
        .doc(tenantId)
        .collection("members")
        .doc(ctx.uid)
        .set(
          {
            uid: ctx.uid,
            email: ctx.email,
            role,
            joinedAt: timestamp,
          },
          { merge: true }
        ),
      db
        .collection("users")
        .doc(ctx.uid)
        .collection("tenants")
        .doc(tenantId)
        .set(
          {
            tenantId,
            role,
            joinedAt: timestamp,
          },
          { merge: true }
        ),
      invRef.delete(),
    ]);

    const res = NextResponse.json({ ok: true, tenantId });
    setTenantCookie(res, tenantId, ctx.session);
    return res;
  } catch (err) {
    console.error("[tenant-accept-invite] failed", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
