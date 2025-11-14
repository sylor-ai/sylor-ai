// FILE: src/lib/openai.ts
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL;

const client = apiKey ? new OpenAI({ apiKey }) : null;

if (!apiKey) {
  console.warn("[openai] OPENAI_API_KEY is missing");
}
if (!model) {
  console.warn("[openai] OPENAI_MODEL is missing");
}

/**
 * Generate a short SMS reply for Sylor.
 * Returns a trimmed string, or null if anything fails.
 */
export async function generateAiSmsReply(
  prompt: string
): Promise<string | null> {
  if (!client || !model) {
    console.warn("[openai] client or model not configured, skipping AI reply");
    return null;
  }

  try {
    const completion = await client.chat.completions.create({
      model,
      max_completion_tokens: 120,
      messages: [
        {
          role: "system",
          content:
            "You are Sylor AI, an SMS assistant for home-service businesses. " +
            "Answer briefly, like a human, and always try to move toward booking an appointment.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const text = (raw || "").trim();

    console.log("[openai] sms raw reply text:", text || "<empty>");

    if (!text) {
      return null;
    }

    return text.replace(/\s+/g, " ").trim();
  } catch (err) {
    console.error("[openai] generateAiSmsReply error", err);
    return null;
  }
}
