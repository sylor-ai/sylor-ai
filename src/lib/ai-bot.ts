"use server";

import OpenAI from "openai";

export type ConversationTurn = { from: "lead" | "agent"; body: string };

type TenantProfile = {
  businessName?: string;
  businessPhone?: string;
  services?: string[];
  serviceArea?: string;
  workingHours?: string;
  tone?: "friendly" | "professional" | "casual";
  bookingStyle?: "phone_call" | "calendar_link";
  extraNotes?: string;
};

type LeadInfo = { name?: string; phone?: string };

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAiSmsReply(
  tenant: TenantProfile,
  lead: LeadInfo,
  history: ConversationTurn[]
): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("[ai-bot] OPENAI_API_KEY missing - AI SMS agent disabled");
    return null;
  }

  const safeHistory = Array.isArray(history) ? history : [];
  const lastMessage = safeHistory.at(-1)?.body ?? "";
  const lowered = lastMessage.toLowerCase();
  if (/(stop|unsubscribe|cancel|end)\b/.test(lowered)) return null;

  const biz = tenant.businessName || "our company";
  const tone = tenant.tone || "friendly";
  const services =
    (tenant.services || []).map((s) => s.trim()).filter(Boolean).join(", ") ||
    "our services";
  const businessNotes =
    [
      tenant.workingHours ? `Hours: ${tenant.workingHours}` : "",
      tenant.serviceArea ? `Area: ${tenant.serviceArea}` : "",
      services ? `Services: ${services}` : "",
      tenant.extraNotes ? `Notes: ${tenant.extraNotes}` : "",
    ]
      .filter(Boolean)
      .join("\n") || "No extra notes.";

  const system = [
    `You are an SMS scheduling assistant for ${biz}.`,
    `Tone: ${tone}. Only 1 concise SMS message. 160 characters target.`,
    `Never send links unless the businessPhone or calendar is explicitly provided.`,
    `If the user asks for price or service not offered, offer a quick call.`,
    tenant.bookingStyle === "calendar_link"
      ? `If appointment booking is requested, provide the calendar link if available; otherwise ask for a preferred date/time.`
      : `If appointment booking is requested, ask for two time windows then confirm the office will call from ${
          tenant.businessPhone || "the office"
        }.`,
    `If the message is aggressive or irrelevant, politely de-escalate and offer to continue by phone.`,
  ].join("\n");

  const convo = safeHistory
    .slice(-12)
    .map((t) => `${t.from === "lead" ? "Lead" : "Agent"}: ${t.body}`)
    .join("\n");

  const prompt = [
    `Business Context:\n${businessNotes}`,
    `Lead: ${lead.name || lead.phone || "Unknown"}`,
    `Conversation:\n${convo || "Lead: (first message)"}\n`,
    `Your task: reply with ONE SMS (no headers).`,
  ].join("\n\n");

  try {
    const res = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 120,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
    });

    let out = res.choices?.[0]?.message?.content?.trim() || null;
    if (!out) return null;

    if (out.length > 480) {
      out = out.slice(0, 477).trimEnd() + "...";
    }

    return out;
  } catch (err) {
    console.error("[ai-bot] generateAiSmsReply error", err);
    return null;
  }
}
