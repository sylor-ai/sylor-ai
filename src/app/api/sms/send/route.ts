// FILE: src/app/api/sms/send/route.ts
import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { sendSms } from "@/lib/telnyx";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

export async function POST(req: Request) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenantId } = await assertTenantWriteContext(req as any);

    const db = getAdminFirestore();
    const tenantDoc = await db.collection("tenants").doc(tenantId).get();
    const tenantData = tenantDoc.exists ? (tenantDoc.data() as any) : null;
    if (!tenantData?.telnyxNumber || !tenantData?.telnyxMessagingProfileId) {
      return NextResponse.json(
        {
          ok: false,
          error: "sms-not-configured",
          message: "Your SMS number is not configured. Please complete phone setup in Settings.",
        },
        { status: 400 }
      );
    }

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
        tenantId,
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
      tenantId,
    });

    // update conversation
    await convoRef.set({ lastMessage: body, lastMessageAt: FieldValue.serverTimestamp() }, { merge: true });

    if (!tenantData?.telnyxNumber && !tenantData?.twilioNumber && !process.env.TELNYX_DEFAULT_FROM) {
      return NextResponse.json(
        { ok: false, error: "no-from-number" },
        { status: 400 }
      );
    }

    const telnyxResult = await sendSms({
      to,
      text: body,
      from:
        tenantData?.telnyxNumber ||
        tenantData?.twilioNumber ||
        process.env.TELNYX_DEFAULT_FROM ||
        null,
      messagingProfileId: tenantData?.telnyxMessagingProfileId ?? null,
      tenantId,
    });
    if (!telnyxResult.success) {
      return NextResponse.json(
        { ok: false, error: telnyxResult.error || "sms-failed" },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return handleTenantApiError(e, "[sms/send] error");
  }
}
