// FILE: src/lib/openai.ts
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL; // e.g. "gpt-4.1-mini"

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
      max_output_tokens: 120, // ✅ correct field for Responses API
      input:
        "You are Sylor AI, an SMS assistant for home-service businesses. " +
        "Answer briefly (1–3 sentences), like a human, and always try to move toward booking an appointment.\n\n" +
        `Customer message: "${prompt}"`,
    });

    console.log("[openai] raw response.output:", response.output);

    let text = "";
    const outputs = (response.output ?? []) as any[];

    for (const item of outputs) {
      if (!item || !Array.isArray(item.content)) continue;

      for (const c of item.content) {
        if (c?.type === "output_text") {
          let value = "";

          if (typeof c.text === "string") {
            value = c.text;
          } else if (c.text && typeof c.text === "object" && "value" in c.text) {
            value = (c.text as any).value ?? "";
          }

          text += value;
        }
      }
    }

    if (!text) {
      const out = (response as any).output_text;
      if (typeof out === "string") {
        text = out;
      }
    }

    if (!text.trim()) {
      console.warn("[openai] no usable text in response.output");
      return null;
    }

    console.log("[openai] sms raw reply text:", text);
    return text.trim();
  } catch (err) {
    console.error("[openai] generateAiSmsReply error", err);
    return null;
  }
}
