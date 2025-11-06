// FILE: src/lib/ai-bot.ts
// Minimal OpenAI chat caller via REST to avoid extra deps.

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export type TenantProfile = {
  businessName?: string;
  businessPhone?: string;
  services?: string[];
  serviceArea?: string;
  workingHours?: string;
  tone?: "friendly" | "direct" | "luxury" | "casual";
  bookingStyle?: "phone_call" | "site_visit" | "video_call";
  extraNotes?: string;
};

export type LeadInfo = {
  name?: string | null;
  phone?: string | null;
};

export type ConversationTurn = {
  from: "agent" | "lead";
  body: string;
};

export async function generateAiSmsReply(
  tenant: TenantProfile,
  lead: LeadInfo,
  history: ConversationTurn[]
): Promise<string | null> {
  if (!OPENAI_API_KEY) {
    console.warn("[ai-bot] OPENAI_API_KEY missing – AI SMS agent disabled");
    return null;
  }

  try {
    const bizName = tenant.businessName || "your business";
    const bizPhone = tenant.businessPhone || "your business phone";
    const leadName = lead.name || "the lead";

    const services = (tenant.services || []).join(", ") || "home improvement";
    const serviceArea = tenant.serviceArea || "your local area";
    const workingHours = tenant.workingHours || "Mon–Fri 9am–5pm";

    const systemPrompt =
      `You are an SMS assistant for a home services contractor.\n` +
      `You reply ONLY by SMS. Keep each reply to 1–2 short SMS messages max.\n` +
      `Avoid links unless absolutely necessary. Do not mention you are an AI.\n` +
      `Business name: ${bizName}.\n` +
      `Service area: ${serviceArea}.\n` +
      `Services: ${services}.\n` +
      `Working hours: ${workingHours}.\n` +
      `Business phone: ${bizPhone}.\n` +
      `Goals:\n` +
      `- Be friendly, concise, and professional.\n` +
      `- Understand the project (roofing, remodeling, etc.).\n` +
      `- Ask brief follow-up questions if needed.\n` +
      `- Move toward booking a call/visit when appropriate.\n` +
      `- Assume the person is the homeowner/decision maker.\n` +
      `Lead name (if known): ${leadName}.\n` +
      `Respond as a human agent of the business.`;

    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
    ];

    for (const turn of history) {
      messages.push({
        role: turn.from === "lead" ? "user" : "assistant",
        content: turn.body,
      });
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages,
        max_tokens: 160,
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.warn("[ai-bot] OpenAI error:", txt);
      return null;
    }

    const data = (await resp.json()) as any;
    const text = data?.choices?.[0]?.message?.content?.toString()?.trim();
    return text || null;
  } catch (e) {
    console.error("[ai-bot] generateAiSmsReply error", e);
    return null;
  }
}
