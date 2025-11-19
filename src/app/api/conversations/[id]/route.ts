import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { FieldValue } from "firebase-admin/firestore";
import { handleTenantApiError } from "@/lib/api-error";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { tenantId } = await assertTenantMembership(req);
    const { id: convoId } = await context.params;
    const db = getAdminFirestore();

    const tenantRef = db.collection("tenants").doc(tenantId);
    const convoRef = tenantRef.collection("conversations").doc(convoId);
    const convoSnap = await convoRef.get();
    if (!convoSnap.exists) {
      return NextResponse.json(
        { ok: false, error: "not-found" },
        { status: 404 }
      );
    }
    const convo = convoSnap.data() as any;
    let leadPhone: string | null = null;
    if (convo?.leadId) {
      const leadSnap = await tenantRef.collection("leads").doc(convo.leadId).get();
      if (leadSnap.exists) {
        leadPhone = (leadSnap.data() as any)?.phone || null;
      }
    }

    const messagesSnap = await convoRef
      .collection("messages")
      .orderBy("createdAt", "asc")
      .limit(200)
      .get();
    const messages = messagesSnap.docs.map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        from: data.from,
        via: data.via || null,
        direction: data.direction || "inbound",
        body: data.body || "",
        createdAt: data.createdAt || null,
      };
    });

    return NextResponse.json({
      ok: true,
      conversation: {
        id: convoSnap.id,
        ...convo,
        leadPhone,
      },
      messages,
    });
  } catch (err) {
    return handleTenantApiError(err, "[conversations/detail] error");
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { tenantId, user } = await assertTenantMembership(req);
    const { id: convoId } = await context.params;
    const body = await req.json().catch(() => ({} as any));
    const { aiPaused } = body || {};
    if (typeof aiPaused !== "boolean") {
      return NextResponse.json(
        { ok: false, error: "invalid-payload" },
        { status: 400 }
      );
    }

    const db = getAdminFirestore();

    const convoRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .doc(convoId);
    await convoRef.set({ aiPaused }, { merge: true });
    await convoRef.collection("events").add({
      type: "ai_paused_update",
      aiPaused,
      createdAt: FieldValue.serverTimestamp(),
      actor: user?.id || user?.uid || "user",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return handleTenantApiError(err, "[conversations/toggle] error");
  }
}
