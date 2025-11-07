// FILE: src/app/api/dev/send-test-sms/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendSms } from "@/lib/twilio";

export async function POST(req: NextRequest) {
  try {
    const { to, body } = await req.json();

    if (!to || typeof to !== "string") {
      return NextResponse.json(
        { ok: false, error: "`to` is required" },
        { status: 400 }
      );
    }

    const text =
      typeof body === "string" && body.trim().length > 0
        ? body
        : "Sylor.ai test SMS ✅";

    const res = await sendSms({ to, body: text });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: res.error || "Twilio send failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, sid: res.sid || null });
  } catch (err) {
    console.error("[dev/send-test-sms] error", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
