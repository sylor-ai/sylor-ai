import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    await requireSuperAdmin();

    const snap = await adminDb
      .collection("tenants")
      .orderBy("createdAt", "desc")
      .limit(200)
      .get();

    const tenants = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = doc.data() || {};
        const tenantId = doc.id;

        let ownersCount = 0;
        try {
          const ownersSnap = await adminDb
            .collection("users")
            .where("memberships", "array-contains", {
              tenantId,
              role: "owner",
            })
            .get();
          ownersCount = ownersSnap.size;
        } catch {
          ownersCount = 0;
        }

        return {
          id: tenantId,
          name: data.businessName ?? data.name ?? "(no name)",
          planId: data.planId ?? null,
          hasActiveSubscription: !!data.hasActiveSubscription,
          stripeCustomerId: data.stripeCustomerId ?? null,
          stripeSubscriptionId: data.stripeSubscriptionId ?? null,
          status: data.status ?? "active",
          createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? null,
          lastActiveAt: data.lastActiveAt ?? null,
          ownersCount,
          billingEmail: data.billingEmail ?? null,
        };
      })
    );

    return NextResponse.json({ ok: true, tenants });
  } catch (err: any) {
    const status = err?.status ?? 500;
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to load tenants" },
      { status }
    );
  }
}
