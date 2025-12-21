import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { authRatelimit } from "@/lib/rate-limit";

type LeadPayload = {
  name?: string;
  phone?: string;
  message?: string;
  email?: string;
  tenantSlug?: string;
  tenantKey?: string;
};

async function resolveTenantId(db: FirebaseFirestore.Firestore, slug?: string | null, tenantKey?: string | null) {
  let tenantId: string | null = null;
  if (slug) {
    const snap = await db
      .collection("tenants")
      .where("publicSlug", "==", slug.trim().toLowerCase())
      .where("publicCaptureEnabled", "==", true)
      .limit(1)
      .get();
    if (!snap.empty) {
      tenantId = snap.docs[0].id;
    }
  }
  if (!tenantId && tenantKey) {
    const snap = await db
      .collection("tenants")
      .where("publicKey", "==", tenantKey.trim())
      .limit(1)
      .get();
    if (!snap.empty) {
      tenantId = snap.docs[0].id;
    }
  }
  return tenantId;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as LeadPayload;
    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();
    const email = (body.email || "").trim();
    const slug = (body.tenantSlug || (body as any).slug || "").trim();
    const tenantKey = (body.tenantKey || "").trim();

    if (!slug && !tenantKey) {
      return NextResponse.json({ ok: false, error: "invalid-tenant" }, { status: 400 });
    }

    const db = getAdminFirestore();

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (tenantKey) {
      const { success } = await authRatelimit.limit(`public-lead:${tenantKey}:${ip}`);
      if (!success) {
        return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
      }
    }
    const tenantId = await resolveTenantId(db, slug || null, tenantKey || null);
    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "invalid-tenant" }, { status: 400 });
    }

    if (!phone && !email && !message) {
      return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
    }

    // TODO: add per-IP and per-tenant rate limiting here to prevent abuse of public lead forms.

    const leadRef = db.collection("tenants").doc(tenantId).collection("leads").doc();
    await leadRef.set({
      id: leadRef.id,
      name: name || null,
      phone: phone || null,
      email: email || null,
      message: message || null,
      source: "public",
      publicSlug: slug || null,
      createdAt: new Date(),
    });

    // Mark install verified on first successful inbound lead
    const tenantRef = db.collection("tenants").doc(tenantId);
    const tenantSnap = await tenantRef.get();
    const tenantData = tenantSnap.exists ? (tenantSnap.data() as any) : null;
    if (!tenantData?.installVerifiedAt) {
      await tenantRef.set(
        {
          installVerifiedAt: FieldValue.serverTimestamp(),
          installVerifiedSource: "public_lead",
        },
        { merge: true }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[public/lead] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
