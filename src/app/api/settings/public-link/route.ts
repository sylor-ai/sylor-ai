import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken, getAdminFirestore } from "@/lib/firebase-admin";
import { getSessionToken } from "@/lib/session";

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function getTenantIdForUid(uid: string): Promise<string> {
  const db = getAdminFirestore();
  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return uid;
  const data = userSnap.data() as any;
  return data?.tenantId || uid;
}

export async function GET(req: NextRequest) {
  try {
    const rawSession = req.cookies.get("sylor_session")?.value;
    const token = getSessionToken(rawSession);
    if (!token) {
      return NextResponse.json({ ok: false, error: "not-authenticated" }, { status: 401 });
    }

    const decoded = await verifyIdToken(token);
    const uid = decoded.uid;
    const db = getAdminFirestore();
    const tenantId = await getTenantIdForUid(uid);

    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    if (!tenantSnap.exists) {
      return NextResponse.json({ ok: false, error: "tenant-not-found" }, { status: 404 });
    }

    const t = tenantSnap.data() as any;
    return NextResponse.json({
      ok: true,
      publicSlug: t.publicSlug ?? null,
      publicCaptureEnabled: t.publicCaptureEnabled ?? false,
      businessName: t.businessName ?? "",
    });
  } catch (err) {
    console.error("[public-link GET] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawSession = req.cookies.get("sylor_session")?.value;
    const token = getSessionToken(rawSession);
    if (!token) {
      return NextResponse.json({ ok: false, error: "not-authenticated" }, { status: 401 });
    }

    const decoded = await verifyIdToken(token);
    const uid = decoded.uid;
    const db = getAdminFirestore();
    const tenantId = await getTenantIdForUid(uid);

    const body = await req.json().catch(() => ({} as any));
    const { publicSlug, publicCaptureEnabled } = body;

    let finalSlug: string | null = null;

    if (publicCaptureEnabled) {
      if (typeof publicSlug !== "string" || !publicSlug.trim()) {
        return NextResponse.json({ ok: false, error: "slug-required" }, { status: 400 });
      }

      finalSlug = normalizeSlug(publicSlug);
      if (!finalSlug) {
        return NextResponse.json({ ok: false, error: "invalid-slug" }, { status: 400 });
      }

      const existing = await db
        .collection("tenants")
        .where("publicSlug", "==", finalSlug)
        .limit(1)
        .get();

      if (!existing.empty && existing.docs[0].id !== tenantId) {
        return NextResponse.json({ ok: false, error: "slug-taken" }, { status: 409 });
      }
    }

    const tenantRef = db.collection("tenants").doc(tenantId);
    await tenantRef.set(
      {
        publicSlug: finalSlug,
        publicCaptureEnabled: !!publicCaptureEnabled,
      },
      { merge: true }
    );

    return NextResponse.json({
      ok: true,
      publicSlug: finalSlug,
      publicCaptureEnabled: !!publicCaptureEnabled,
    });
  } catch (err) {
    console.error("[public-link POST] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
