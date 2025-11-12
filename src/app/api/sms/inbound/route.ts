// src/app/api/sms/inbound/route.ts
import { NextResponse } from "next/server";
import { sendSms } from "@/lib/telnyx";

export async function POST(req: Request) {
  const body = await req.json();
  const payload = body.data?.payload;

  const from = payload?.from?.phone_number;
  const to = payload?.to?.[0]?.phone_number ?? payload?.to?.phone_number;
  const text = payload?.text;

  console.log("Inbound SMS:", { from, to, text });

  if (from && to && text) {
    // simple echo reply – NO OpenAI
    await sendSms({
      from: to, // reply from the same number that received it
      to: from,
      text: `Sylor received: "${text}" ✅`,
    });
  }

  return NextResponse.json({ ok: true });
}
