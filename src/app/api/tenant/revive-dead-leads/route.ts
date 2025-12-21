import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantWriteContext } from "@/lib/tenant-context";
import { generateAiSmsReply } from "@/lib/ai-bot";
import { sendSms } from "@/lib/telnyx";
import { handleTenantApiError } from "@/lib/api-error";

const DEFAULT_REVIVE_LOOKBACK_DAYS = 7;

export async function POST(req: NextRequest) {
  try {
    // REQUIRE_TENANT_WRITE_CONTEXT
    const { tenantId } = await assertTenantWriteContext(req as any);

    const db = getAdminFirestore();

    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    if (!tenantSnap.exists) {
      return NextResponse.json(
        { ok: false, error: "tenant-not-found" },
        { status: 404 }
      );
    }
    const tenantData = tenantSnap.data() as any;
    const tenantNumber =
      tenantData?.telnyxNumber ||
      tenantData?.twilioNumber ||
      process.env.TELNYX_DEFAULT_FROM ||
      null;

    if (!tenantNumber) {
      return NextResponse.json(
        { ok: false, error: "no-from-number" },
        { status: 400 }
      );
    }

    const lookbackDays = DEFAULT_REVIVE_LOOKBACK_DAYS;
    const cutoff = Date.now() - lookbackDays * 24 * 60 * 60 * 1000;

    const convoCol = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations");

    const candidatesSnap = await convoCol
      .where("status", "in", ["open", null])
      .orderBy("lastMessageAt", "desc")
      .limit(50)
      .get()
      .catch(() => null);

    if (!candidatesSnap || candidatesSnap.empty) {
      return NextResponse.json({ ok: true, revived: 0 });
    }

    let revivedCount = 0;

    for (const convo of candidatesSnap.docs) {
      if (revivedCount >= 5) break; // limit per run
      const data = convo.data() as any;
      const lastInboundAt =
        (data.lastInboundAt?.toDate?.() as Date | undefined)?.getTime?.() ??
        null;
      const lastOutboundAt =
        (data.lastOutboundAt?.toDate?.() as Date | undefined)?.getTime?.() ??
        null;

      // Require stale inbound (no inbound within cutoff)
      if (lastInboundAt && lastInboundAt > cutoff) continue;
      // Skip if a recent outbound was sent after cutoff
      if (lastOutboundAt && lastOutboundAt > cutoff) continue;

      // Check last 3 messages: ensure no agent replies
      const msgsSnap = await convo.ref
        .collection("messages")
        .orderBy("createdAt", "desc")
        .limit(3)
        .get()
        .catch(() => null);
      if (!msgsSnap || msgsSnap.empty) continue;
      const lastThree = msgsSnap.docs.map((d) => d.data() as any);
      const hasAgent = lastThree.some((m) => m.from === "agent");
      if (hasAgent) continue;

      // Load history for prompt
      const historySnap = await convo.ref
        .collection("messages")
        .orderBy("createdAt", "asc")
        .limitToLast(12)
        .get();
      const history = historySnap.docs.map((d) => {
        const m = d.data() as any;
        return {
          from: m.from === "lead" ? "lead" : "agent",
          body: String(m.body || ""),
        };
      }) as Array<{ from: "lead" | "agent"; body: string }>;

      // Lead info
      let leadName = data.leadName || "Lead";
      let leadPhone = null as string | null;
      if (data.leadId) {
        const leadSnap = await db
          .collection("tenants")
          .doc(tenantId)
          .collection("leads")
          .doc(data.leadId)
          .get();
        if (leadSnap.exists) {
          const ld = leadSnap.data() as any;
          leadName = ld?.name || leadName;
          leadPhone = ld?.phone || leadPhone;
        }
      }

      if (!leadPhone) continue;

      const aiProfile = (tenantData?.aiProfile as any) || {};
      const tenantProfile = {
        businessName: aiProfile.businessName ?? tenantData?.businessName,
        businessPhone: aiProfile.bookingPhone ?? tenantData?.businessPhone,
        services: (aiProfile.services || "")
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean),
        serviceArea: aiProfile.serviceArea ?? "",
        workingHours: aiProfile.hours ?? tenantData?.hours ?? "",
        tone: aiProfile.tone ?? "friendly",
        bookingStyle: aiProfile.bookingStyle ?? "phone_call",
        extraNotes: aiProfile.extraNotes ?? "",
      } as any;

      const leadInfo = { name: leadName, phone: leadPhone };

      const replyText = await generateAiSmsReply(tenantProfile, leadInfo, history);
      if (!replyText) continue;

      // Persist AI outbound
      await convo.ref.collection("messages").add({
        from: "agent",
        via: "ai",
        direction: "outbound",
        body: replyText,
        createdAt: FieldValue.serverTimestamp(),
        tenantId,
      });
      await convo.ref.set(
        {
          lastMessage: replyText,
          lastMessageAt: FieldValue.serverTimestamp(),
          lastOutboundAt: FieldValue.serverTimestamp(),
          status: "revived",
        },
        { merge: true }
      );
      await convo.ref.collection("events").add({
        type: "revived",
        createdAt: FieldValue.serverTimestamp(),
        actor: "system",
      });

      // Send SMS
      await sendSms({
        to: leadPhone,
        from: tenantNumber,
        text: replyText,
        tenantId,
      });

      revivedCount++;
    }

    return NextResponse.json({ ok: true, revived: revivedCount });
  } catch (err) {
    return handleTenantApiError(err, "[tenant/revive-dead-leads] error");
  }
}
