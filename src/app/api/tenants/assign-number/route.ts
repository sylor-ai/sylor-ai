import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

const TELNYX_BASE = "https://api.telnyx.com/v2";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const { tenantId = decoded.uid, areaCode = "818" } = await req
      .json()
      .catch(() => ({ tenantId: decoded.uid, areaCode: "818" }));

    const apiKey = process.env.TELNYX_API_KEY;
    const messagingProfileId = process.env.TELNYX_MESSAGING_PROFILE_ID;

    if (!apiKey || !messagingProfileId) {
      return NextResponse.json(
        { ok: false, error: "Telnyx is not configured." },
        { status: 500 }
      );
    }

    const searchUrl = `${TELNYX_BASE}/available_phone_numbers?filter[country_code]=US&filter[features]=sms&filter[area_code]=${encodeURIComponent(
      areaCode
    )}`;
    const searchRes = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    const searchData = await searchRes.json().catch(() => ({}));
    const number = searchData?.data?.[0]?.phone_number;
    if (!number) {
      return NextResponse.json(
        { ok: false, error: "No numbers available in that area code." },
        { status: 400 }
      );
    }

    const buyRes = await fetch(`${TELNYX_BASE}/phone_numbers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone_numbers: [number] }),
    });
    if (!buyRes.ok) {
      const detail = await buyRes.text();
      console.error("[assign-number] buy failed", detail);
      return NextResponse.json(
        { ok: false, error: "Unable to purchase number." },
        { status: 502 }
      );
    }

    const assignRes = await fetch(`${TELNYX_BASE}/phone_numbers/${encodeURIComponent(number)}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_profile_id: messagingProfileId,
      }),
    });
    if (!assignRes.ok) {
      const detail = await assignRes.text();
      console.error("[assign-number] assign failed", detail);
      return NextResponse.json(
        { ok: false, error: "Unable to assign messaging profile." },
        { status: 502 }
      );
    }

    const db = getAdminFirestore();
    await db
      .collection("tenants")
      .doc(tenantId)
      .set(
        {
          telnyxNumber: number,
          telnyxMessagingProfileId: messagingProfileId,
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    return NextResponse.json({ ok: true, assignedNumber: number });
  } catch (error) {
    console.error("[assign-number] error", error);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
