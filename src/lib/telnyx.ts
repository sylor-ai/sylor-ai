// src/lib/telnyx.ts
export async function sendSms({
  from,
  to,
  text,
  messagingProfileId,
}: {
  from: string;
  to: string;
  text: string;
  messagingProfileId?: string | null;
}) {
  const apiKey = process.env.TELNYX_API_KEY;
  const fallbackProfileId = process.env.TELNYX_MESSAGING_PROFILE_ID;
  const profileId = messagingProfileId || fallbackProfileId;

  if (!apiKey || !profileId) {
    throw new Error("Telnyx env vars missing");
  }

  const res = await fetch("https://api.telnyx.com/v2/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      text,
      messaging_profile_id: profileId,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Telnyx send error:", err);
    throw new Error("Failed to send SMS");
  }

  return res.json();
}
