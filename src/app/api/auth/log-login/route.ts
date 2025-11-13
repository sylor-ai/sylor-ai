// FILE: src/app/api/auth/log-login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken, getAdminFirestore } from "@/lib/firebase-admin";
import {
  createSessionCookie,
  SESSION_COOKIE,
  ACTIVE_TENANT_COOKIE,
  ABSOLUTE_TIMEOUT_MS,
} from "@/lib/session";

const isProd = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  try {
    let idToken: string | undefined;

    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      const match = authHeader.match(/^Bearer\s+(.+)$/i);
      if (match?.[1]) {
        idToken = match[1].trim();
      }
    }

    if (!idToken) {
      try {
        const body = await req.json();
        if (body && typeof body.idToken === "string") {
          idToken = body.idToken;
        }
      } catch {
        // ignore parse errors; handled below when idToken missing
      }
    }

    if (!idToken || typeof idToken !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing idToken" },
        { status: 400 }
      );
    }

    const decoded = await verifyIdToken(idToken);
    const db = getAdminFirestore();
    // best-effort audit log
    await db
      .collection("auditLogs")
      .add({ type: "login", userId: decoded.uid, ts: Date.now() })
      .catch(() => {});

    const now = Date.now();
    const tenantId = (decoded as any)?.tenantId || decoded.uid;
    const sessionPayload = createSessionCookie(decoded.uid, tenantId, idToken);

    const res = NextResponse.json({ ok: true, uid: decoded.uid });

    // In dev (http://...), secure: false so cookie is actually saved
    res.cookies.set(SESSION_COOKIE, sessionPayload, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(ABSOLUTE_TIMEOUT_MS / 1000),
    });

    res.cookies.set(ACTIVE_TENANT_COOKIE, tenantId, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // track last active
    res.cookies.set("sylor_last_active", Date.now().toString(), {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("[log-login] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
