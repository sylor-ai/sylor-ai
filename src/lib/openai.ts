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
 * Generate a short SMS reply for Sylor using the Responses API.
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
    const response = await client.responses.create({
      model,
      max_output_tokens: 120,
      input:
        "You are Sylor AI, an SMS assistant for home-service businesses. " +
        "Answer briefly (1–3 sentences), like a human, and always try to move toward booking an appointment.\n\n" +
        `Customer message: "${prompt}"`,
    });

    let text = "";

    for (const item of response.output ?? []) {
      if (item.type === "message") {
        for (const c of item.content ?? []) {
          if (c.type === "output_text") {
            const value = c.text?.value ?? "";
            text += value;
          }
        }
      }
    }

    text = (text || "").trim();
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
