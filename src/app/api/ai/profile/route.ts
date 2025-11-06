// FILE: src/app/api/ai/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

type AiProfilePayload = {
  enabled?: boolean;
  businessName?: string;
  services?: string;
  serviceArea?: string;
  tone?: "friendly" | "direct" | "luxury" | "casual";
  bookingStyle?: "phone_call" | "site_visit" | "video_call";
  bookingPhone?: string;
  hours?: string;
  extraNotes?: string;
};

function withDefaults(tenant: any) {
  const base = tenant || {};
  const ai = base.aiProfile || {};
  return {
    enabled: ai.enabled ?? true,
    businessName: ai.businessName ?? base.businessName ?? "",
    services: ai.services ?? "",
    serviceArea: ai.serviceArea ?? "",
    tone: (ai.tone as any) ?? "friendly",
    bookingStyle: (ai.bookingStyle as any) ?? "phone_call",
    bookingPhone: ai.bookingPhone ?? base.businessPhone ?? "",
    hours: ai.hours ?? "",
    extraNotes: ai.extraNotes ?? "",
  } as Required<AiProfilePayload>;
}

export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(decoded.uid).get();
    const user = userSnap.exists ? (userSnap.data() as any) : null;
    const tenantId = user?.tenantId || decoded.uid;
    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    const tenant = tenantSnap.exists ? tenantSnap.data() : null;

    return NextResponse.json({ ok: true, profile: withDefaults(tenant) });
  } catch (e) {
    console.error("[ai/profile GET]", e);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req);
    if (!decoded) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const body = (await req.json().catch(() => ({}))) as AiProfilePayload;
    // basic validation & normalization
    const allowedTones = new Set(["friendly", "direct", "luxury", "casual"]);
    const allowedBooking = new Set(["phone_call", "site_visit", "video_call"]);

    const toStr = (v: any, max = 500) =>
      typeof v === "string" ? v.slice(0, max) : undefined;

    const payload: AiProfilePayload = {
      enabled: typeof body.enabled === "boolean" ? body.enabled : undefined,
      businessName: toStr(body.businessName, 120),
      services: toStr(body.services, 600),
      serviceArea: toStr(body.serviceArea, 200),
      tone: allowedTones.has(body.tone as any) ? body.tone : undefined,
      bookingStyle: allowedBooking.has(body.bookingStyle as any)
        ? body.bookingStyle
        : undefined,
      bookingPhone: toStr(body.bookingPhone, 40),
      hours: toStr(body.hours, 120),
      extraNotes: toStr(body.extraNotes, 1000),
    };

    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(decoded.uid).get();
    const user = userSnap.exists ? (userSnap.data() as any) : null;
    const tenantId = user?.tenantId || decoded.uid;

    await db
      .collection("tenants")
      .doc(tenantId)
      .set({ aiProfile: payload }, { merge: true });

    // return merged view with defaults
    const updated = await db.collection("tenants").doc(tenantId).get();
    return NextResponse.json({ ok: true, profile: withDefaults(updated.data()) });
  } catch (e) {
    console.error("[ai/profile POST]", e);
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}

