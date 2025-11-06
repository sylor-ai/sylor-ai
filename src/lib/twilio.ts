// FILE: src/lib/twilio.ts
// Minimal Twilio helper. If not configured, it no-ops (does not throw).

type SendSmsArgs = { to: string; body: string };

export async function sendSms({ to, body }: SendSmsArgs): Promise<{ ok: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[twilio] missing env vars, skipping real SMS send");
    return { ok: false, error: "twilio-not-configured" };
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const params = new URLSearchParams();
    params.append("To", to);
    params.append("From", fromNumber);
    params.append("Body", body);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[twilio] send failed:", text);
      return { ok: false, error: "twilio-send-failed" };
    }

    return { ok: true };
  } catch (e: any) {
    console.error("[twilio] send error", e);
    return { ok: false, error: "twilio-error" };
  }
}

