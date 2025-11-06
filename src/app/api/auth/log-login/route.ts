// FILE: src/app/api/auth/log-login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken, getAdminFirestore } from "@/lib/firebase-admin";

const isProd = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

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

    const res = NextResponse.json({ ok: true, uid: decoded.uid });

    // ✅ In dev (http://...), secure: false so cookie is actually saved
    res.cookies.set("sylor_session", idToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
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
