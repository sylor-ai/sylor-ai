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
 * Recursively search for the first non-empty string in a nested structure.
 */
function findFirstString(value: any): string | null {
  if (value == null) return null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstString(item);
      if (found) return found;
    }
    return null;
  }

  if (typeof value === "object") {
    const preferredKeys = ["value", "text", "content", "output_text"];
    for (const key of preferredKeys) {
      if (key in value) {
        const found = findFirstString((value as any)[key]);
        if (found) return found;
      }
    }
    for (const key of Object.keys(value)) {
      if (preferredKeys.includes(key)) continue;
      const found = findFirstString((value as any)[key]);
      if (found) return found;
    }
  }

  return null;
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

    const rawOutput = (response as any).output;

    try {
      const debug = JSON.stringify(rawOutput, null, 2);
      console.log(
        "[openai] raw response.output:",
        debug.slice(0, 2000)
      );
    } catch {
      console.log("[openai] raw response.output (non-serializable)");
    }

    let text = findFirstString(rawOutput) ?? "";
    text = text.trim();

    console.log("[openai] sms raw reply text:", text || "<empty>");

    if (!text) {
      return null;
    }

    const smsText = text.replace(/\s+/g, " ").trim();
    console.log("[openai] sms reply text:", smsText);

    return smsText;
  } catch (err) {
    console.error("[openai] generateAiSmsReply error", err);
    return null;
  }
}
