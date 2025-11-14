import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY || null;
const model = process.env.OPENAI_MODEL || null;
const client = apiKey ? new OpenAI({ apiKey }) : null;

const SYSTEM_MESSAGE =
  "You are Sylor, an AI dispatcher for home-service contractors. " +
  "Reply with a single concise SMS that is helpful, polite, and action-oriented.";

export async function generateAiSmsReply(
  prompt: string
): Promise<string | null> {
  if (!client || !apiKey || !model) {
    console.warn("[openai] Missing OPENAI configuration");
    return null;
  }

  try {
    const res = await client.chat.completions.create({
      model,
      max_completion_tokens: 120,
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        { role: "user", content: prompt },
      ],
    });

    const raw = res.choices?.[0]?.message?.content ?? "";
    if (typeof raw === "string") {
      const trimmed = raw.trim();
      return trimmed || null;
    }
    if (Array.isArray(raw)) {
      const parts = raw as Array<string | { text?: string } | null | undefined>;
      const text = parts
        .map((part) =>
          typeof part === "string"
            ? part
            : typeof part?.text === "string"
            ? part.text
            : ""
        )
        .join(" ");
      return text.trim() || null;
    }
    return null;
  } catch (err) {
    console.error("[openai] generateAiSmsReply error", err);
    return null;
  }
}
