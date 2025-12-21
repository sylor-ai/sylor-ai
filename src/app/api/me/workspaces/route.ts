import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifyIdTokenFromRequest, getAdminAuth } from "@/lib/firebase-admin";
import { SESSION_COOKIE, getSessionToken } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    let decoded = await verifyIdTokenFromRequest(req as any);

    if (!decoded) {
      const raw = req.cookies.get(SESSION_COOKIE)?.value ?? null;
      const token = getSessionToken(raw);
      if (token) {
        decoded = await getAdminAuth().verifyIdToken(token);
      }
    }

    if (!decoded) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }

    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(decoded.uid).get();
    const user = userSnap.exists ? (userSnap.data() as any) : null;
    const memberships = Array.isArray(user?.memberships) ? user.memberships : [];
    const defaultTenantId =
      user?.defaultTenantId ||
      user?.tenantId ||
      (memberships.length > 0 ? memberships[0].tenantId : null);

    const workspaces = await Promise.all(
      memberships.map(async (m: any) => {
        const tenantSnap = await db.collection("tenants").doc(m.tenantId).get();
        const tenant = tenantSnap.exists ? (tenantSnap.data() as any) : null;
        return {
          tenantId: m.tenantId,
          role: m.role || "admin",
          isAgency: !!m.isAgency,
          name: tenant?.businessName || "Workspace",
          type: tenant?.type || "direct",
        };
      })
    );

    const activeWs =
      workspaces.find((w: any) => w.tenantId === defaultTenantId) ||
      workspaces[0] ||
      null;

    const res = NextResponse.json({
      ok: true,
      workspaces,
      defaultTenantId,
    });

    if (activeWs?.type) {
      res.cookies.set("sylor_tenant_type", activeWs.type, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    if (activeWs?.role) {
      res.cookies.set("sylor_tenant_role", activeWs.role, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return res;
  } catch (err) {
    console.error("[me/workspaces] error", err);
    const status = (err as any)?.status && typeof (err as any).status === "number" ? (err as any).status : 500;
    return NextResponse.json({ ok: false, error: (err as any)?.message || "server-error" }, { status });
  }
}
