import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { canManageMembers, type Role } from "@/lib/rbac";
import { assertCsrf } from "@/lib/csrf";
import { getAuthContext } from "@/lib/auth-server";
import { authRatelimit } from "@/lib/rate-limit";

const ALLOWED_ROLES: Role[] = ["owner", "admin", "member", "viewer"];

export async function POST(req: NextRequest) {
  try {
    assertCsrf();
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

    const limiter = await authRatelimit.limit(`tenant-invite:${ctx.uid}`);
    if (!limiter.success) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 }
      );
    }

    const { tenantId, email, role = "member" } = await req
      .json()
      .catch(() => ({}));

    const normalizedEmail =
      typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!tenantId || !normalizedEmail) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    if (ctx.tenantId !== tenantId || !canManageMembers(ctx.role)) {
      return NextResponse.json(
        { ok: false, error: "forbidden" },
        { status: 403 }
      );
    }

    const desiredRole: Role = ALLOWED_ROLES.includes(role as Role)
      ? (role as Role)
      : "member";

    const db = getAdminFirestore();
    const inviteRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("invites")
      .doc();

    await inviteRef.set({
      email: normalizedEmail,
      role: desiredRole,
      invitedAt: new Date(),
      invitedBy: ctx.uid,
    });

    return NextResponse.json({ ok: true, inviteId: inviteRef.id });
  } catch (err) {
    console.error("[tenant-invite] failed", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
