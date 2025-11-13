import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getAuthContext } from "@/lib/auth-server";
import { setTenantCookie } from "@/lib/session";
import { assertCsrf } from "@/lib/csrf";
import { authRatelimit } from "@/lib/rate-limit";

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

    const limiter = await authRatelimit.limit(`tenant-switch:${ctx.uid}`);
    if (!limiter.success) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 }
      );
    }

    const { tenantId } = await req.json().catch(() => ({}));
    if (!tenantId) {
      return NextResponse.json(
        { ok: false, error: "missing_tenant" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();
    const membership = await db
      .collection("tenants")
      .doc(tenantId)
      .collection("members")
      .doc(ctx.uid)
      .get();

    if (!membership.exists) {
      return NextResponse.json(
        { ok: false, error: "forbidden" },
        { status: 403 }
      );
    }

    const res = NextResponse.json({ ok: true, tenantId });
    setTenantCookie(res, tenantId, ctx.session);
    return res;
  } catch (err) {
    console.error("[tenant-switch] failed", err);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
