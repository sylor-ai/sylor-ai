// src/lib/telnyx.ts
const TELNYX_API_KEY = process.env.TELNYX_API_KEY || null;
const TELNYX_MESSAGING_PROFILE_ID =
  process.env.TELNYX_MESSAGING_PROFILE_ID || null;
const TELNYX_DEFAULT_FROM = process.env.TELNYX_DEFAULT_FROM || null;

type SendSmsParams = {
  from?: string | null;
  to: string;
  text: string;
  messagingProfileId?: string | null;
};

type SendSmsResult = {
  success: boolean;
  error?: string;
};

export async function sendSms({
  from,
  to,
  text,
  messagingProfileId,
}: SendSmsParams): Promise<SendSmsResult> {
  if (!TELNYX_API_KEY) {
    console.error("[telnyx] Missing TELNYX_API_KEY");
    return { success: false, error: "missing-api-key" };
  }

  const resolvedFrom = from ?? TELNYX_DEFAULT_FROM;
  if (!resolvedFrom) {
    console.error("[telnyx] Missing from number");
    return { success: false, error: "missing-from-number" };
  }

  const profileId = messagingProfileId ?? TELNYX_MESSAGING_PROFILE_ID;
  if (!profileId) {
    console.error("[telnyx] Missing messaging profile ID");
    return { success: false, error: "missing-profile-id" };
  }

  try {
    const res = await fetch("https://api.telnyx.com/v2/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TELNYX_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resolvedFrom,
        to,
        text,
        messaging_profile_id: profileId,
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => "");
      console.error("sendSms Telnyx error:", res.status, err);
      return { success: false, error: `http-${res.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error("[telnyx] sendSms failed", error);
    return { success: false, error: "network-error" };
  }
}
