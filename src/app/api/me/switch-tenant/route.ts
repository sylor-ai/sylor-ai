import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const decoded = await verifyIdTokenFromRequest(req as any);
    if (!decoded) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({} as any));
    const tenantId = body?.tenantId as string;
    if (!tenantId) {
      return NextResponse.json({ ok: false, error: "missing-tenantId" }, { status: 400 });
    }

    const db = getAdminFirestore();
    const userRef = db.collection("users").doc(decoded.uid);
    const userSnap = await userRef.get();
    const user = userSnap.exists ? (userSnap.data() as any) : null;
    const memberships = Array.isArray(user?.memberships) ? user.memberships : [];
    const allowed =
      user?.tenantId === tenantId ||
      memberships.some((m: any) => m?.tenantId === tenantId);
    if (!allowed) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }

    await userRef.set({ defaultTenantId: tenantId }, { merge: true });

    const tenantSnap = await db.collection("tenants").doc(tenantId).get();
    const tenantType = ((tenantSnap.data() as any)?.type || (tenantSnap.data() as any)?.tenantType || "direct") as
      | "agency"
      | "client"
      | "direct";
    const membershipRole =
      memberships.find((m: any) => m?.tenantId === tenantId)?.role || (user?.role as any) || "member";

    const res = NextResponse.json({ ok: true });
    res.cookies.set("sylor_tenant_id", tenantId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookies.set("sylor_tenant_type", tenantType, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookies.set("sylor_tenant_role", membershipRole, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch (err) {
    console.error("[me/switch-tenant] error", err);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
