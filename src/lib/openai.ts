import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

let openai: OpenAI | null = null;

if (OPENAI_API_KEY && OPENAI_MODEL) {
  openai = new OpenAI({ apiKey: OPENAI_API_KEY });
} else {
  console.warn(
    "[openai] missing OPENAI_API_KEY or OPENAI_MODEL - SMS AI disabled"
  );
}

export async function generateAiSmsReply(
  prompt: string
): Promise<string | null> {
  if (!openai || !OPENAI_MODEL) {
    console.warn("[openai] client or model not configured, returning null");
    return null;
  }

  try {
    const response = await openai.responses.create({
      model: OPENAI_MODEL,
      input: [
        {
          role: "system",
          content:
            "You are Sylor AI's SMS assistant for home services contractors. " +
            "Reply in under 400 characters, friendly, clear, and always try to " +
            "move toward booking an appointment. Never mention that you are an AI.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_output_tokens: 120,
    });

    const outputs = (response as any)?.output ?? [];
    const textParts: string[] = [];

    for (const item of outputs) {
      if (item?.type === "message" && Array.isArray(item.content)) {
        for (const part of item.content) {
          if (typeof part?.text === "string") {
            textParts.push(part.text);
          } else if (
            part?.type === "output_text" &&
            typeof part?.text === "string"
          ) {
            textParts.push(part.text);
          }
        }
      }
    }

    const finalText = textParts.join(" ").trim();
    console.log("[openai] sms raw reply text:", finalText || "<empty>");

    if (!finalText) {
      console.warn("[openai] no text content in response.output");
      return null;
    }

    return finalText;
  } catch (err) {
    console.error("[openai] generateAiSmsReply error", err);
    return null;
  }
}
