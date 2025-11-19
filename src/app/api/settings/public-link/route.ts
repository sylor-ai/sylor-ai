import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { assertTenantMembership } from "@/lib/tenant-context";
import { handleTenantApiError } from "@/lib/api-error";

function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req as any);
    const db = getAdminFirestore();

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
    return handleTenantApiError(err, "[public-link GET] error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tenantId } = await assertTenantMembership(req as any);
    const db = getAdminFirestore();

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
    return handleTenantApiError(err, "[public-link POST] error");
  }
}
