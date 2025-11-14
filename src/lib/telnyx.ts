// src/lib/telnyx.ts
type SendSmsParams = {
  from?: string | null;
  to: string;
  text: string;
  messagingProfileId?: string | null;
};

type SendSmsResult = {
  success: boolean;
  id?: string;
  status?: string;
  error?: unknown;
};

type TelnyxConfig =
  | {
      ok: true;
      apiKey: string;
      defaultFrom: string;
      messagingProfileId: string;
    }
  | { ok: false; error: string };

function getTelnyxConfig(): TelnyxConfig {
  const apiKey = process.env.TELNYX_API_KEY;
  const defaultFrom = process.env.TELNYX_DEFAULT_FROM;
  const messagingProfileId = process.env.TELNYX_MESSAGING_PROFILE_ID;
  if (!apiKey) return { ok: false, error: "missing-api-key" };
  if (!defaultFrom) return { ok: false, error: "missing-default-from" };
  if (!messagingProfileId)
    return { ok: false, error: "missing-messaging-profile-id" };
  return { ok: true, apiKey, defaultFrom, messagingProfileId };
}

export async function sendSms({
  from,
  to,
  text,
  messagingProfileId,
}: SendSmsParams): Promise<SendSmsResult> {
  const cfg = getTelnyxConfig();
  if (!cfg.ok) {
    console.error("[telnyx-send] config error:", cfg.error);
    return { success: false, error: cfg.error };
  }

  const resolvedFrom = from ?? cfg.defaultFrom;
  const profileId = messagingProfileId ?? cfg.messagingProfileId;

  try {
    const res = await fetch("https://api.telnyx.com/v2/messages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resolvedFrom,
        to,
        text,
        messaging_profile_id: profileId,
      }),
    });

    const json = await res.json().catch(() => ({} as any));

    if (!res.ok) {
      console.error("[telnyx-send] HTTP error", res.status, json);
      return { success: false, error: json };
    }

    const id = json?.data?.id;
    const status = json?.data?.status;
    console.log("[telnyx-send] success", { to, id, status });

    return { success: true, id, status };
  } catch (error) {
    console.error("[telnyx-send] exception", error);
    return { success: false, error };
  }
}
