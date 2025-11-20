import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { requireSuperAdmin } from "@/lib/admin-auth";

export async function GET() {
  try {
    await requireSuperAdmin();

    const [usersSnap, tenantsSnap] = await Promise.all([
      adminDb.collection("users").limit(500).get(),
      adminDb.collection("tenants").get(),
    ]);

    const tenantNameById = new Map<string, string>();
    tenantsSnap.forEach((doc) => {
      const data = doc.data() || {};
      tenantNameById.set(doc.id, data.businessName ?? data.name ?? "(unnamed)");
    });

    const users = usersSnap.docs.map((doc) => {
      const data = doc.data() || {};
      const memberships = Array.isArray(data.memberships)
        ? data.memberships
        : [];
      const defaultTenantId =
        data.defaultTenantId ?? memberships[0]?.tenantId ?? null;

      return {
        id: doc.id,
        email: data.email ?? "",
        name: data.name ?? null,
        role: data.role ?? "member",
        defaultTenantId,
        defaultTenantName: defaultTenantId
          ? tenantNameById.get(defaultTenantId) ?? null
          : null,
        memberships,
        lastLoginAt: data.lastLoginAt ?? null,
      };
    });

    return NextResponse.json({ ok: true, users });
  } catch (err: any) {
    const status = err?.status ?? 500;
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to load users" },
      { status }
    );
  }
}
