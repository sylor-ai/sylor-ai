// FILE: src/app/api/auth/delete-account/route.ts
import { NextResponse } from "next/server";
import {
  getAdminAuth,
  getAdminFirestore,
  verifyIdTokenFromRequest,
} from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    // 1) verify Firebase ID token from Authorization: Bearer ...
    let decoded;
    try {
      decoded = await verifyIdTokenFromRequest(req);
    } catch (_e) {
      return NextResponse.json(
        { ok: false, error: "unauthorized" },
        { status: 401 }
      );
    }

    const uid = decoded.uid;
    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // 2) delete from Firebase Auth (this logs the user out everywhere)
    await adminAuth.deleteUser(uid);

    // 3) delete user doc (best-effort)
    await db.collection("users").doc(uid).delete().catch(() => {});

    // 4) delete tenant doc (best-effort)
    await db.collection("tenants").doc(uid).delete().catch(() => {});

    // 5) audit log
    await db.collection("auditLogs").add({
      userId: uid,
      type: "delete-account",
      ts: Date.now(),
    });

    // NOTE:
    // If you want to delete tenant subcollections (leads, conversations, appointments...)
    // do it with a Cloud Function / scheduled cleanup using recursive delete,
    // because doing it here can time out.

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("delete-account error", e);
    return NextResponse.json(
      { ok: false, error: "server-error" },
      { status: 500 }
    );
  }
}
