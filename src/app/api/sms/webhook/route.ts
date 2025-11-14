// FILE: src/app/api/sms/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { sendSms } from "@/lib/telnyx";
import { generateAiSmsReply, type ConversationTurn } from "@/lib/ai-bot";
import { FieldValue } from "firebase-admin/firestore";

function normalizePhone(raw: string): string {
  return raw.replace(/[^0-9+]/g, "");
}

function extractInboundPayload(
  contentType: string,
  rawBody: string,
  parsedJson?: any
) {
  // Telnyx JSON (or generic JSON) payloads
  if (contentType.includes("application/json")) {
    let json: any = parsedJson ?? null;
    if (!json) {
      try {
        json = JSON.parse(rawBody);
      } catch {
        json = null;
      }
    }
    const payload = json?.data?.payload ?? json?.payload ?? json;
    if (!payload) return null;

    const from =
      payload?.from?.phone_number ??
      payload?.from?.phone_number_string ??
      payload?.from;

    let to: string | null = null;
    if (Array.isArray(payload?.to) && payload.to.length > 0) {
      to =
        payload.to[0]?.phone_number ??
        payload.to[0]?.phone_number_string ??
        payload.to[0];
    } else if (typeof payload?.to === "string") {
      to = payload.to;
    } else if (typeof payload?.to?.phone_number === "string") {
      to = payload.to.phone_number;
    }

    const body =
      payload?.text ?? payload?.body ?? payload?.message ?? payload?.data;

    return { from, to, body };
  }

  // Legacy Twilio-style form-encoded payloads
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams(rawBody);
    return {
      from: params.get("From"),
      to: params.get("To"),
      body: params.get("Body"),
    };
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const rawBody = await req.text();

    let parsedJson: any = null;
    if (contentType.includes("application/json")) {
      try {
        parsedJson = JSON.parse(rawBody);
      } catch {
        parsedJson = null;
      }
      const eventType =
        parsedJson?.data?.event_type ??
        parsedJson?.data?.type ??
        parsedJson?.event_type ??
        parsedJson?.type;
      if (eventType && eventType !== "message.received") {
        return NextResponse.json({ ok: true });
      }
    }

    const payload = extractInboundPayload(contentType, rawBody, parsedJson);
    if (!payload?.from || !payload?.to || !payload?.body) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const from = payload.from;
    const to = payload.to;
    const body = payload.body;
    console.log("[sms-webhook] raw body:", body);

    if (!from || !to || !body) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const fromNorm = normalizePhone(from);
    const toNorm = normalizePhone(to);

    const db = getAdminFirestore();

    // Find tenant by its Telnyx number (fallback to legacy twilio field)
    console.log("[sms-webhook] looking for tenant with phoneNumber:", to);
    let tenantMatch = await db
      .collection("tenants")
      .where("telnyxNumber", "==", toNorm)
      .limit(1)
      .get();
    console.log(
      "[sms-webhook] telnyxNumber query size:",
      tenantMatch.size ?? 0
    );

    if (tenantMatch.empty) {
      tenantMatch = await db
        .collection("tenants")
        .where("twilioNumber", "==", toNorm)
        .limit(1)
        .get();
      console.log(
        "[sms-webhook] twilioNumber query size:",
        tenantMatch.size ?? 0
      );
    }

    if (tenantMatch.empty) {
      console.warn("[sms-webhook] STILL no tenant for To=", to);
      return NextResponse.json({ ok: true });
    }

    const tenantDoc = tenantMatch.docs[0];
    const tenantId = tenantDoc.id;
    const tenantData = tenantDoc.data() as any;
    const aiEnabled = tenantData?.aiSmsEnabled ?? true;
    const tenantNumber =
      tenantData?.telnyxNumber ||
      tenantData?.twilioNumber ||
      process.env.TELNYX_DEFAULT_FROM ||
      null;

    // Find or create lead for fromNorm
    const leadsCol = db.collection("tenants").doc(tenantId).collection("leads");
    const leadQuery = await leadsCol
      .where("phone", "==", fromNorm)
      .limit(1)
      .get();

    let leadId: string;
    let leadName: string;
    if (leadQuery.empty) {
      const newRef = leadsCol.doc();
      leadId = newRef.id;
      leadName = fromNorm;
      await newRef.set({
        name: leadName,
        phone: fromNorm,
        created: FieldValue.serverTimestamp(),
        source: "sms",
      });
    } else {
      const leadDoc = leadQuery.docs[0];
      leadId = leadDoc.id;
      const data = leadDoc.data() as any;
      leadName = data?.name || fromNorm;
    }

    // Find or create conversation for this lead
    const convoCol = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations");
    const convoQuery = await convoCol.where("leadId", "==", leadId).limit(1).get();

    let convoRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    if (convoQuery.empty) {
      convoRef = convoCol.doc();
      await convoRef.set({
        leadId,
        leadName,
        lastMessage: body,
        lastMessageAt: FieldValue.serverTimestamp(),
        channel: "sms",
        leadAvatarUrl: `https://i.pravatar.cc/150?u=${fromNorm}`,
        aiEnabled: true,
      });
    } else {
      convoRef = convoQuery.docs[0].ref;
      await convoRef.set(
        { lastMessage: body, lastMessageAt: FieldValue.serverTimestamp() },
        { merge: true }
      );
    }

    // Write inbound message
    await convoRef.collection("messages").add({
      from: "lead",
      direction: "inbound",
      body,
      createdAt: FieldValue.serverTimestamp(),
      tenantId,
    });

    // STOP words / unsubscribe handling
    const textLc = body.toLowerCase();
    const stopWords = ["stop", "unsubscribe", "cancel", "end"];
    const wantsStop = stopWords.some((w) => textLc.includes(w));
    if (wantsStop) {
      await leadsCol
        .doc(leadId)
        .set(
          { unsubscribed: true, unsubscribedAt: FieldValue.serverTimestamp() },
          { merge: true }
        );
      // Send a single confirmation SMS and stop further processing
      if (tenantNumber) {
        try {
          const stopConfirmation = await sendSms({
            to: fromNorm,
            from: tenantNumber,
            text:
              "You have been unsubscribed and will no longer receive messages. Reply START to resubscribe.",
          });
          if (!stopConfirmation.success) {
            console.error(
              "[sms-webhook] STOP confirmation send failed",
              stopConfirmation.error
            );
          }
        } catch (err) {
          console.error("[sms-webhook] STOP confirmation error", err);
        }
      } else {
        console.warn(
          "[sms-webhook] Cannot send STOP confirmation, no Telnyx number configured"
        );
      }
      return NextResponse.json({ ok: true });
    }

    // START / resubscribe handling (must not call AI)
    const upperBody = body.toUpperCase();
    if (["START", "UNSTOP"].includes(upperBody)) {
      await leadsCol
        .doc(leadId)
        .set({ unsubscribed: false, unsubscribedAt: null }, { merge: true });
      const biz =
        (tenantData?.aiProfile?.businessName as string) ||
        tenantData?.businessName ||
        "our team";
      if (tenantNumber) {
        try {
          const startConfirmation = await sendSms({
            to: fromNorm,
            from: tenantNumber,
            text: `You're now resubscribed to messages from ${biz}. Reply STOP to opt out again.`,
          });
          if (!startConfirmation.success) {
            console.error(
              "[sms-webhook] START confirmation send failed",
              startConfirmation.error
            );
          }
        } catch (err) {
          console.error("[sms-webhook] START confirmation error", err);
        }
      } else {
        console.warn(
          "[sms-webhook] Cannot send START confirmation, no Telnyx number configured"
        );
      }
      await convoRef.collection("messages").add({
        from: "system",
        direction: "outbound",
        via: "system",
        body: "[Lead resubscribed via START keyword]",
        createdAt: FieldValue.serverTimestamp(),
        tenantId,
      });
      return NextResponse.json({ ok: true });
    }

    // Conversation-level AI toggle (fallback to tenant-level)
    const convoDoc = await convoRef.get();
    const convoData = convoDoc.exists ? (convoDoc.data() as any) : null;
    const convoAiEnabled = (convoData?.aiEnabled ?? aiEnabled) ?? true;

    // If conversation has AI paused, skip auto-reply entirely
    if (convoData?.aiPaused) {
      console.log(
        `[sms-webhook] AI paused for conversation ${convoRef.id}, skipping auto-reply`
      );
      await convoRef.set({ aiLastStatus: "off" }, { merge: true });
      return NextResponse.json({ ok: true });
    }

    // If AI disabled, stop after persisting inbound
    if (!convoAiEnabled) {
      await convoRef.set({ aiLastStatus: "off" }, { merge: true });
      return NextResponse.json({ ok: true });
    }

    // Build short history (last 12 messages)
    const msgsCol = convoRef.collection("messages");
    const historySnap = await msgsCol
      .orderBy("createdAt", "asc")
      .limitToLast(12)
      .get();

    const history: ConversationTurn[] = historySnap.docs.map((d) => {
      const data = d.data() as any;

      // Anything not explicitly from the lead is treated as agent
      const from: ConversationTurn["from"] =
        data.from === "lead" ? "lead" : "agent";

      return {
        from,
        body: String(data.body || ""),
      };
    });

    // Guardrails to avoid spam/loops
    // 1) Cooldown: skip AI reply if previous AI message was <5 minutes ago
    const recentSnap = await msgsCol
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
    const now = Date.now();
    let lastAiTs: number | null = null;
    let lastHumanAgentTs: number | null = null;
    for (const m of recentSnap.docs) {
      const data = m.data() as any;
      const ts =
        (data.createdAt?.toDate?.() as Date | undefined)?.getTime?.() ?? null;
      if (ts) {
        if (!lastAiTs && data.from === "agent" && data.via === "ai")
          lastAiTs = ts;
        if (!lastHumanAgentTs && data.from === "agent" && data.via !== "ai")
          lastHumanAgentTs = ts;
      }
      if (lastAiTs && lastHumanAgentTs) break;
    }
    if (lastAiTs && now - lastAiTs < 5 * 60 * 1000) {
      console.log("[ai-sms] Skipping AI reply due to cooldown");
      await convoRef.set({ aiLastStatus: "blocked" }, { merge: true });
      return NextResponse.json({ ok: true });
    }
    // 2) Human takeover: if human agent replied in last 15 minutes, skip AI
    if (lastHumanAgentTs && now - lastHumanAgentTs < 15 * 60 * 1000) {
      console.log("[ai-sms] Skipping AI reply due to recent human message");
      await convoRef.set({ aiLastStatus: "blocked" }, { merge: true });
      return NextResponse.json({ ok: true });
    }
    // 3) Daily cap: limit AI messages per conversation in last 24h
    const dayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const aiDaySnap = await msgsCol
      .where("via", "==", "ai")
      .where("createdAt", ">=", dayAgo)
      .get()
      .catch(() => null as any);
    const aiDayCount = aiDaySnap?.size ?? 0;
    if (aiDayCount >= 10) {
      console.log("[ai-sms] Skipping AI reply due to daily cap", aiDayCount);
      await convoRef.set({ aiLastStatus: "blocked" }, { merge: true });
      return NextResponse.json({ ok: true });
    }

    // Compose tenant AI profile with defaults
    const ai = (tenantData?.aiProfile as any) || {};
    const tenantProfile = {
      businessName: ai.businessName ?? tenantData?.businessName,
      businessPhone: ai.bookingPhone ?? tenantData?.businessPhone,
      services: (ai.services || "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
      serviceArea: ai.serviceArea ?? "",
      workingHours: ai.hours ?? tenantData?.hours ?? "",
      tone: ai.tone ?? "friendly",
      bookingStyle: ai.bookingStyle ?? "phone_call",
      extraNotes: ai.extraNotes ?? "",
    } as any;

    const leadInfo = { name: leadName, phone: fromNorm };

    const replyText = await generateAiSmsReply(
      tenantProfile,
      leadInfo,
      history
    );

    if (!replyText) {
      await convoRef.set({ aiLastStatus: "blocked" }, { merge: true });
      return NextResponse.json({ ok: true });
    }

    // Persist AI outbound
    await msgsCol.add({
      from: "agent",
      via: "ai",
      direction: "outbound",
      body: replyText,
      createdAt: FieldValue.serverTimestamp(),
      tenantId,
    });
    await convoRef.set(
      { lastMessage: replyText, lastMessageAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    await convoRef.set({ aiLastStatus: "on" }, { merge: true });

    // Skip sending if lead unsubscribed between steps
    const latestLead = await leadsCol.doc(leadId).get();
    const latestLeadData = latestLead.exists
      ? (latestLead.data() as any)
      : null;
    if (latestLeadData?.unsubscribed) {
      return NextResponse.json({ ok: true });
    }

    if (!tenantNumber) {
      console.warn(
        "[sms-webhook] Cannot send AI reply, no Telnyx number configured"
      );
      return NextResponse.json({ ok: true });
    }

    // Send SMS via Telnyx helper
    const sendResult = await sendSms({
      to: fromNorm,
      from: tenantNumber,
      text: replyText,
    });
    if (!sendResult.success) {
      console.error("[sms-webhook] Failed to send AI reply", sendResult.error);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[sms-webhook] error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
