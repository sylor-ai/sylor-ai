import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getTenantBySlug } from "@/lib/tenant-server";
import { sendSms } from "@/lib/telnyx";

function normalizePhone(raw: string): string {
  return raw.replace(/[^0-9+]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const { slug, name, phone, message } = body;

    if (typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { ok: false, error: "missing-slug" },
        { status: 400 }
      );
    }
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { ok: false, error: "missing-name" },
        { status: 400 }
      );
    }
    if (typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { ok: false, error: "missing-phone" },
        { status: 400 }
      );
    }

    const tenant = await getTenantBySlug(slug.trim().toLowerCase());
    if (!tenant) {
      return NextResponse.json(
        { ok: false, error: "invalid-slug" },
        { status: 404 }
      );
    }
    if (!tenant.publicCaptureEnabled) {
      return NextResponse.json(
        { ok: false, error: "public-capture-disabled" },
        { status: 403 }
      );
    }

    const tenantId = tenant.id as string;
    const db = getAdminFirestore();

    const normalizedPhone = normalizePhone(phone);
    const initialMessage =
      typeof message === "string" && message.trim()
        ? message.trim()
        : "Hi, I'm interested in your services.";

    // 1) Create or find lead by phone
    const leadsCol = db.collection("tenants").doc(tenantId).collection("leads");
    const existingLeadSnap = await leadsCol
      .where("phone", "==", normalizedPhone)
      .limit(1)
      .get();

    let leadRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    let leadId: string;

    if (!existingLeadSnap.empty) {
      leadRef = existingLeadSnap.docs[0].ref;
      leadId = existingLeadSnap.docs[0].id;
      await leadRef.set(
        {
          name,
          phone: normalizedPhone,
          updatedAt: Date.now(),
        },
        { merge: true }
      );
    } else {
      leadRef = leadsCol.doc();
      leadId = leadRef.id;
      await leadRef.set({
        name,
        phone: normalizedPhone,
        source: "public-form",
        createdAt: Date.now(),
        unsubscribed: false,
        unsubscribedAt: null,
      });
    }

    // 2) Create conversation (or reuse existing one for that lead)
    const convCol = db
      .collection("tenants")
      .doc(tenantId)
      .collection("conversations");

    const existingConvSnap = await convCol
      .where("leadId", "==", leadId)
      .limit(1)
      .get();

    let convRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
    let conversationId: string;

    if (!existingConvSnap.empty) {
      convRef = existingConvSnap.docs[0].ref;
      conversationId = existingConvSnap.docs[0].id;
    } else {
      convRef = convCol.doc();
      conversationId = convRef.id;
      await convRef.set({
        leadId,
        leadName: name,
        channel: "sms",
        leadAvatarUrl: null,
        lastMessage: "",
        lastMessageAt: Date.now(),
        aiPaused: false,
        aiLastStatus: null,
      });
    }

    // 3) Write an inbound-style message from the lead (shows in UI)
    const messagesCol = convRef.collection("messages");
    await messagesCol.add({
      from: "lead",
      direction: "inbound",
      body: initialMessage,
      createdAt: new Date(),
    });

    await convRef.set(
      {
        leadName: name,
        lastMessage: initialMessage,
        lastMessageAt: new Date(),
      },
      { merge: true }
    );

    // 4) Send an SMS reply from the business number (simple welcome)
    const to = normalizedPhone;
    const from =
      tenant.telnyxNumber ||
      tenant.twilioNumber ||
      process.env.TELNYX_DEFAULT_FROM ||
      null;

    if (from) {
      const first = name.split(" ")[0] || "there";
      const biz = tenant.businessName || "us";
      const smsBody = `Hi ${first}, thanks for contacting ${biz}! We'll get back to you shortly. Reply STOP to opt out.`;

      await sendSms({ to, body: smsBody, from });

      // store outbound message too
      await messagesCol.add({
        from: "agent",
        via: "human",
        direction: "outbound",
        body: smsBody,
        createdAt: new Date(),
      });

      await convRef.set(
        {
          lastMessage: smsBody,
          lastMessageAt: new Date(),
        },
        { merge: true }
      );
    } else {
      console.warn("[public/lead] No Telnyx from-number configured for tenant", tenantId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[public/lead] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}


