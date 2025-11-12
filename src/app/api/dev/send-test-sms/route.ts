import { NextResponse } from "next/server";

const TELNYX_API_BASE = "https://api.telnyx.com/v2";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.TELNYX_API_KEY;
    const profileId = process.env.TELNYX_MESSAGING_PROFILE_ID;
    const defaultFrom = process.env.TELNYX_DEFAULT_FROM;

    // 1️⃣ Check env vars
    if (!apiKey || !profileId || !defaultFrom) {
      console.error("[dev/send-test-sms] Missing env vars", {
        hasApiKey: !!apiKey,
        hasProfileId: !!profileId,
        hasDefaultFrom: !!defaultFrom,
      });

      // Always return 200 so PowerShell shows the JSON body
      return NextResponse.json({
        ok: false,
        error: "Missing Telnyx env vars",
        hasApiKey: !!apiKey,
        hasProfileId: !!profileId,
        hasDefaultFrom: !!defaultFrom,
      });
    }

    // 2️⃣ Parse body safely
    let bodyJson: any = {};
    try {
      bodyJson = await req.json();
    } catch {
      bodyJson = {};
    }

    const to = bodyJson?.to;
    if (!to) {
      return NextResponse.json({
        ok: false,
        error: "Missing 'to' in JSON body",
        receivedBody: bodyJson,
      });
    }

    // 3️⃣ Build Telnyx payload
    const payload = {
      from: defaultFrom,
      to,
      text: "Sylor test: your Telnyx SMS is working ✅",
      messaging_profile_id: profileId,
    };

    console.log("[dev/send-test-sms] Sending via Telnyx:", payload);

    // 4️⃣ Call Telnyx API
    const res = await fetch(`${TELNYX_API_BASE}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      console.error("[dev/send-test-sms] Telnyx API error", {
        status: res.status,
        data,
      });

      return NextResponse.json({
        ok: false,
        error: "Telnyx API error",
        status: res.status,
        telnyxResponse: data,
      });
    }

    // 5️⃣ Success
    return NextResponse.json({
      ok: true,
      telnyxResponse: data,
    });
  } catch (err: any) {
    console.error("[dev/send-test-sms] server error:", err);
    // Still respond 200 with error info so PowerShell prints it
    return NextResponse.json({
      ok: false,
      error: err?.message || "Unknown server error",
    });
  }
}
