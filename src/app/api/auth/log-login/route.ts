// FILE: src/app/api/auth/log-login/route.ts
import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    if (!idToken) {
      return NextResponse.json(
        { ok: false, error: "Missing idToken" },
        { status: 400 }
      );
    }

    const adminAuth = getAdminAuth();
    const firestore = getAdminFirestore();

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    await firestore.collection("auditLogs").add({
      userId: uid ?? null,
      type: "login",
      ip: req.headers.get("x-forwarded-for") ?? null,
      ua: req.headers.get("user-agent") ?? null,
      ts: Date.now(),
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("log-login error", e);
    return NextResponse.json(
      { ok: false, error: "Server error logging login" },
      { status: 500 }
    );
  }
}
