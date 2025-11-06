// FILE: src/app/api/sms/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { sendSms } from "@/lib/twilio";
import { generateAiSmsReply } from "@/lib/ai-bot";
import { FieldValue } from "firebase-admin/firestore";

function normalizePhone(raw: string): string {
  return raw.replace(/[^0-9+]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let params: URLSearchParams | null = null;

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await req.text();
      params = new URLSearchParams(text);
    } else if (contentType.includes("application/json")) {
      const json: any = await req.json().catch(() => ({}));
      params = new URLSearchParams();
      if (json.From) params.set("From", json.From);
      if (json.To) params.set("To", json.To);
      if (json.Body) params.set("Body", json.Body);
    } else {
      return NextResponse.json(
        { ok: false, error: "Unsupported content type" },
        { status: 400 }
      );
    }

    const from = params.get("From");
    const to = params.get("To");
    const body = params.get("Body");

    if (!from || !to || !body) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const fromNorm = normalizePhone(from);
    const toNorm = normalizePhone(to);

    const db = getAdminFirestore();

    // Find tenant by its Twilio number
    const tenantMatch = await db
      .collection("tenants")
      .where("twilioNumber", "==", toNorm)
      .limit(1)
      .get();

    if (tenantMatch.empty) {
      console.warn("[sms-webhook] No tenant for To=", toNorm);
      return NextResponse.json({ ok: true });
    }

    const tenantDoc = tenantMatch.docs[0];
    const tenantId = tenantDoc.id;
    
    const tenantData = tenantDoc.data() as any;
    const aiEnabled = tenantData?.aiSmsEnabled ?? true;

    // Find or create lead for fromNorm
    const leadsCol = db.collection("tenants").doc(tenantId).collection("leads");
    const leadQuery = await leadsCol.where("phone", "==", fromNorm).limit(1).get();

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
    const convoCol = db.collection("tenants").doc(tenantId).collection("conversations");
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
    });

    // STOP words / unsubscribe handling
    const textLc = body.toLowerCase();
    const stopWords = ["stop", "unsubscribe", "cancel", "end"];
    const wantsStop = stopWords.some((w) => textLc.includes(w));
    if (wantsStop) {
      await leadsCol
        .doc(leadId)
        .set({ unsubscribed: true, unsubscribedAt: FieldValue.serverTimestamp() }, { merge: true });
      // Send a single confirmation SMS and stop further processing
      try {
        await sendSms({ to: fromNorm, body: "You have been unsubscribed and will no longer receive messages. Reply START to resubscribe." });
      } catch {}
      return NextResponse.json({ ok: true });
    }
    // START / resubscribe handling (must not call AI)
    const upperBody = body.toUpperCase();
    if (["START", "UNSTOP"].includes(upperBody)) {
      await leadsCol
        .doc(leadId)
        .set({ unsubscribed: false, unsubscribedAt: null }, { merge: true });
      const biz = (tenantData?.aiProfile?.businessName as string) || tenantData?.businessName || "our team";
      try {
        await sendSms({ to: fromNorm, body: `You’re now resubscribed to messages from ${biz}. Reply STOP to opt out again.` });
      } catch {}
      await convoRef.collection("messages").add({
        from: "system",
        direction: "outbound",
        via: "system",
        body: "[Lead resubscribed via START keyword]",
        createdAt: FieldValue.serverTimestamp(),
      });
      return NextResponse.json({ ok: true });
    }

    // Conversation-level AI toggle (fallback to tenant-level)
    const convoDoc = await convoRef.get();
    const convoData = convoDoc.exists ? (convoDoc.data() as any) : null;
    const convoAiEnabled = (convoData?.aiEnabled ?? aiEnabled) ?? true;

    // If conversation has AI paused, skip auto-reply entirely
    if (convoData?.aiPaused) {
      console.log(`[sms-webhook] AI paused for conversation ${convoRef.id}, skipping auto-reply`);
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
    const historySnap = await msgsCol.orderBy("createdAt", "asc").limitToLast(12).get();
    const history = historySnap.docs.map((d) => {
      const data = d.data() as any;
      return { from: data.from === "lead" ? "lead" : "agent", body: String(data.body || "") };
    });

    // Guardrails to avoid spam/loops
    // 1) Cooldown: skip AI reply if previous AI message was <5 minutes ago
    const recentSnap = await msgsCol.orderBy("createdAt", "desc").limit(20).get();
    const now = Date.now();
    let lastAiTs: number | null = null;
    let lastHumanAgentTs: number | null = null;
    for (const m of recentSnap.docs) {
      const data = m.data() as any;
      const ts = (data.createdAt?.toDate?.() as Date | undefined)?.getTime?.() ?? null;
      if (ts) {
        if (!lastAiTs && data.from === "agent" && data.via === "ai") lastAiTs = ts;
        if (!lastHumanAgentTs && data.from === "agent" && data.via !== "ai") lastHumanAgentTs = ts;
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
      services: (ai.services || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      serviceArea: ai.serviceArea ?? "",
      workingHours: ai.hours ?? tenantData?.hours ?? "",
      tone: ai.tone ?? "friendly",
      bookingStyle: ai.bookingStyle ?? "phone_call",
      extraNotes: ai.extraNotes ?? "",
    } as any;
    const leadInfo = { name: leadName, phone: fromNorm };

    const replyText = await generateAiSmsReply(tenantProfile, leadInfo, history);

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
    });
    await convoRef.set(
      { lastMessage: replyText, lastMessageAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    await convoRef.set({ aiLastStatus: "on" }, { merge: true });

    // Send SMS
    // Skip sending if lead unsubscribed between steps
    const latestLead = await leadsCol.doc(leadId).get();
    const latestLeadData = latestLead.exists ? (latestLead.data() as any) : null;
    if (latestLeadData?.unsubscribed) {
      return NextResponse.json({ ok: true });
    }

    const smsRes = await sendSms({ to: fromNorm, body: replyText });
    if (!smsRes.ok) {
      console.error("[sms-webhook] AI SMS send failed", smsRes.error);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[sms-webhook] error", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

