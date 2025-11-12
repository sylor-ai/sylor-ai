// FILE: src/app/api/sms/send/route.ts
import { NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendSms } from "@/lib/telnyx";

export async function POST(req: Request) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

    const db = getAdminFirestore();
    const userDoc = await db.collection("users").doc(decoded.uid).get();
    const userData = userDoc.exists ? (userDoc.data() as any) : null;
    const tenantId = userData?.tenantId || decoded.uid;
    const tenantDoc = await db.collection("tenants").doc(tenantId).get();
    const tenantData = tenantDoc.exists ? (tenantDoc.data() as any) : null;

    const bodyJson = await req.json().catch(() => ({} as any));
    const { conversationId, to, body } = bodyJson || {};

    if (
      typeof conversationId !== "string" ||
      typeof to !== "string" ||
      typeof body !== "string" ||
      !conversationId.trim() ||
      !to.trim() ||
      !body.trim()
    ) {
      return NextResponse.json({ ok: false, error: "invalid-input" }, { status: 400 });
    }
    if (body.length > 1000) {
      return NextResponse.json({ ok: false, error: "too-long" }, { status: 400 });
    }

    // Verify conversation & lead unsubscribed state before sending
    const convoRef = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations")
      .doc(conversationId);
    const convoSnap = await convoRef.get();
    if (!convoSnap.exists) {
      return NextResponse.json({ ok: false, error: "conversation-not-found" }, { status: 404 });
    }
    const convo = convoSnap.data() as any;
    const leadId = convo?.leadId || null;
    let leadUnsubscribed = false;
    if (leadId) {
      const leadSnap = await db
        .collection("tenants")
        .doc(tenantId)
        .collection("leads")
        .doc(leadId)
        .get();
      if (leadSnap.exists) {
        const ld = leadSnap.data() as any;
        leadUnsubscribed = !!ld?.unsubscribed;
      }
    }
    if (leadUnsubscribed) {
      // Optionally log a system message about blocked send
      await convoRef.collection("messages").add({
        from: "system",
        direction: "outbound",
        via: "system",
        body: "[Attempted send blocked: lead unsubscribed]",
        createdAt: FieldValue.serverTimestamp(),
      });
      return NextResponse.json({ ok: false, error: "lead-unsubscribed" }, { status: 403 });
    }

    // write message
    const msgCol = convoRef.collection("messages");
    await msgCol.add({
      from: "agent",
      direction: "outbound",
      body,
      createdAt: FieldValue.serverTimestamp(),
    });

    // update conversation
    await convoRef.set({ lastMessage: body, lastMessageAt: FieldValue.serverTimestamp() }, { merge: true });

    if (!tenantData?.telnyxNumber && !tenantData?.twilioNumber && !process.env.TELNYX_DEFAULT_FROM) {
      return NextResponse.json(
        { ok: false, error: "no-from-number" },
        { status: 400 }
      );
    }

    const telnyx = await sendSms({
      to,
      text: body,
      from:
        tenantData?.telnyxNumber ||
        tenantData?.twilioNumber ||
        process.env.TELNYX_DEFAULT_FROM ||
        null,
      messagingProfileId: tenantData?.telnyxMessagingProfileId ?? null,
    });
    if (!telnyx.ok) {
      return NextResponse.json({ ok: false, error: "sms-failed" }, { status: 200 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[sms/send] error", e);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
