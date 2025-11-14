// FILE: src/lib/openai.ts
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

if (!apiKey) {
  console.warn(
    "[openai] OPENAI_API_KEY is not set – AI SMS replies are disabled"
  );
}

const client = apiKey ? new OpenAI({ apiKey }) : null;

/**
 * Generate a short SMS reply for a lead conversation.
 * Returns a trimmed string, or null if anything fails.
 */
export async function generateAiSmsReply(
  prompt: string
): Promise<string | null> {
  if (!client) return null;

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are Sylor, an AI assistant for home-improvement and construction contractors. " +
            "Reply by SMS, max 400 characters, friendly, clear, and helpful. " +
            "Ask for missing details if needed. Answer in the same language as the customer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    const text = completion.choices?.[0]?.message?.content?.trim() ?? "";

    console.log("[openai] sms raw reply text:", text || "<empty>");

    if (!text) {
      console.warn("[openai] empty SMS reply, returning null");
      return null;
    }

    return text;
  } catch (err) {
    console.error("[openai] generateAiSmsReply error", err);
    return null;
  }
}
