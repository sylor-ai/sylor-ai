// FILE: src/app/api/conversations/toggle-ai/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

    const { conversationId, aiEnabled } = await req.json().catch(() => ({} as any));
    if (!conversationId || typeof aiEnabled !== "boolean") {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    }

    const db = getAdminFirestore();
    const userDoc = await db.collection("users").doc(decoded.uid).get();
    const userData = userDoc.exists ? (userDoc.data() as any) : null;
    const tenantId = userData?.tenantId || decoded.uid;

    const convoRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .doc(conversationId);

    await convoRef.set({ aiEnabled }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[toggle-ai] error", e);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}

