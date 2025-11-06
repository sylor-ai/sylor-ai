// FILE: src/app/api/conversations/ai-toggle/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(decoded.uid).get();
    const userData = userSnap.exists ? (userSnap.data() as any) : null;
    const tenantId = userData?.tenantId || decoded.uid;

    const { conversationId, aiPaused } = await req.json().catch(() => ({} as any));
    if (!conversationId || typeof aiPaused !== "boolean") {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    }

    const convoRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .doc(conversationId);

    await convoRef.set(
      {
        aiPaused,
        aiLastStatus: aiPaused ? "off" : "on",
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ai-toggle] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}

