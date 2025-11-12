// FILE: src/app/api/sms/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { getTenantBySlug } from "@/lib/tenant-server";
import { sendSms } from "@/lib/telnyx";

function normalizePhone(raw: string): string {
  return (raw || "").replace(/[^0-9+]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => ({} as any));
    const {
      to: rawTo,
      body: rawBody,          // incoming payload may call this "body"
      text: rawText,          // allow "text" as well
      from: explicitFrom,     // optional override
      tenantId,
      slug,
    } = json || {};

    // ----------------------------
    // Validate inputs
    // ----------------------------
    const to = normalizePhone(rawTo ?? "");
    if (!to) {
      return NextResponse.json({ ok: false, error: "missing-to" }, { status: 400 });
    }

    const message = (rawText ?? rawBody ?? "").toString().trim();
    if (!message) {
      return NextResponse.json({ ok: false, error: "missing-message" }, { status: 400 });
    }

    // ----------------------------
    // Resolve tenant (for from-number)
    // ----------------------------
    const db = getAdminFirestore();
    let tenantData:
      | { telnyxNumber?: string | null; twilioNumber?: string | null; businessName?: string | null }
      | null = null;

    if (typeof slug === "string" && slug.trim()) {
      const tenant = await getTenantBySlug(slug.trim().toLowerCase());
      if (tenant) {
        tenantData = {
          telnyxNumber: tenant.telnyxNumber ?? null,
          twilioNumber: tenant.twilioNumber ?? null,
          businessName: tenant.businessName ?? null,
        };
      }
    } else if (typeof tenantId === "string" && tenantId.trim()) {
      const snap = await db.collection("tenants").doc(tenantId.trim()).get();
      if (snap.exists) {
        const t = snap.data() as any;
        tenantData = {
          telnyxNumber: t?.telnyxNumber ?? null,
          twilioNumber: t?.twilioNumber ?? null,
          businessName: t?.businessName ?? null,
        };
      }
    }

    // Determine sender number: explicit override > tenant numbers > env default
    const from =
      explicitFrom ||
      tenantData?.telnyxNumber ||
      tenantData?.twilioNumber ||
      process.env.TELNYX_DEFAULT_FROM ||
      null;

    if (!from) {
      return NextResponse.json({ ok: false, error: "no-from-configured" }, { status: 400 });
    }

    // ----------------------------
    // Send SMS (✅ use `text`, not `body`)
    // ----------------------------
    const telnyxResp = await sendSms({
      to,
      from,
      text: message,
    });

    // Optionally: persist a log document if tenantId provided
    try {
      if (tenantId) {
        await db
          .collection("tenants")
          .doc(tenantId)
          .collection("outboundSms")
          .add({
            to,
            from,
            body: message,
            provider: "telnyx",
            providerResponse: telnyxResp ?? null,
            createdAt: new Date(),
          });
      }
    } catch (logErr) {
      console.warn("[sms/send] failed to log outbound sms", logErr);
    }

    return NextResponse.json({ ok: true, id: (telnyxResp as any)?.id ?? null });
  } catch (err) {
    console.error("[sms/send] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
