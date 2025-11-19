// src/lib/telnyx.ts
type SendSmsParams = {
  from?: string | null;
  to: string;
  text: string;
  messagingProfileId?: string | null;
  tenantId?: string | null;
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
  tenantId,
}: SendSmsParams): Promise<SendSmsResult> {
  let cfg: Extract<TelnyxConfig, { ok: true }>;
  try {
    const resolved = getTelnyxConfig();
    if (!resolved.ok) {
      throw new Error(
        `Telnyx configuration error: ${resolved.error}. Set TELNYX_API_KEY, TELNYX_DEFAULT_FROM, TELNYX_MESSAGING_PROFILE_ID.`
      );
    }
    cfg = resolved;
  } catch (err: any) {
    console.error("[telnyx-send] config error:", err?.message || err);
    return { success: false, error: err?.message || "telnyx-misconfigured" };
  }

  const resolvedFrom = from ?? cfg.defaultFrom;
  const profileId = messagingProfileId ?? cfg.messagingProfileId;

  // Usage guardrail: block if tenant has exceeded limit
  if (tenantId) {
    const { checkSmsSendAllowed, logSmsBlockedEvent } = await import("./usage");
    const allowed = await checkSmsSendAllowed(tenantId);
    if (!allowed.allowed) {
      console.warn("[telnyx-send] blocked by usage limit", {
        tenantId,
        reason: allowed.reason,
      });
      await logSmsBlockedEvent(tenantId, {
        reason: allowed.reason || "usage-blocked",
        monthlySmsLimit: allowed.limit,
        monthlySmsCount: allowed.count,
      }).catch(() => null);
      return { success: false, error: allowed.reason || "usage-blocked" };
    }
  }

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

    // Usage counting: only increment on delivered status if provided
    if (tenantId && status === "delivered") {
      const { recordSmsDelivery } = await import("./usage");
      await recordSmsDelivery(tenantId, 1);
    }

    return { success: true, id, status };
  } catch (error) {
    console.error("[telnyx-send] exception", error);
    return { success: false, error };
  }
}
