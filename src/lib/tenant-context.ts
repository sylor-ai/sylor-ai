import { cookies } from "next/headers";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore, getAdminAuth } from "./firebase-admin";
import { NextRequest } from "next/server";
import { SESSION_COOKIE, parseSessionCookie } from "@/lib/session";
import { TenantMembership, TenantType } from "@/types";

type AssertOptions = {
  roles?: TenantMembership["role"][];
};

export async function getActiveTenantIdForUser(uid: string) {
  const db = getAdminFirestore();
  const cookieJar = await cookies();
  const cookieTenant = cookieJar.get("sylor_tenant_id")?.value;
  if (cookieTenant) return cookieTenant;

  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return null;
  const user = userSnap.data() as any;
  if (user?.defaultTenantId) return user.defaultTenantId;
  if (Array.isArray(user?.memberships) && user.memberships.length > 0) {
    return user.memberships[0].tenantId;
  }
  return user?.tenantId || null;
}

function normalizeTenantType(value: any): TenantType | null {
  const type = value?.type || value?.tenantType || value;
  if (type === "agency" || type === "client" || type === "direct") return type;
  return null;
}

export async function assertMembership(uid: string, tenantId: string) {
  const db = getAdminFirestore();
  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) return false;
  const user = userSnap.data() as any;
  if (user?.tenantId === tenantId) return true;
  if (Array.isArray(user?.memberships)) {
    return user.memberships.some((m: any) => m?.tenantId === tenantId);
  }
  return false;
}

export async function getActiveTenantForRequest(req: NextRequest) {
  const db = getAdminFirestore();
  const adminAuth = getAdminAuth();
  const cookieTenant = req.cookies.get("sylor_tenant_id")?.value || null;
  const sessionCookie = req.cookies.get(SESSION_COOKIE)?.value || null;
  let uid: string | null = null;

  if (sessionCookie) {
    const { session, isExpired } = parseSessionCookie(sessionCookie);
    if (session && !isExpired) {
      uid = session.uid;
    }
  }

  if (!uid) {
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization") || "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    const token = match?.[1];
    if (token) {
      try {
        const decoded = await adminAuth.verifyIdToken(token);
        uid = decoded.uid;
      } catch {
        uid = null;
      }
    }
  }

  if (!uid) {
    return { tenantId: cookieTenant, tenant: null, user: null };
  }

  const userSnap = await db.collection("users").doc(uid).get();
  if (!userSnap.exists) {
    return { tenantId: cookieTenant, tenant: null, user: null };
  }
  const userData = userSnap.data() as any;
  if (userData?.forceLogoutAt) {
    await userSnap.ref
      .update({ forceLogoutAt: FieldValue.delete() })
      .catch(() => {});
    return { tenantId: null, tenant: null, user: null };
  }
  const memberships = Array.isArray(userData?.memberships) ? userData.memberships : [];

  let tenantId =
    cookieTenant ||
    userData?.defaultTenantId ||
    (memberships[0]?.tenantId || userData?.tenantId || null);

  const userRecord = { id: uid, uid, ...userData };

  if (!tenantId) {
    return { user: userRecord, tenant: null, tenantId: null, tenantType: null, membership: null };
  }

  const tenantSnap = await db.collection("tenants").doc(tenantId).get();
  if (!tenantSnap.exists) {
    return { user: userRecord, tenant: null, tenantId: null, tenantType: null, membership: null };
  }

  const tenant = { id: tenantId, ...(tenantSnap.data() as any) };
  const membership = memberships.find((m: any) => m?.tenantId === tenantId) || null;
  const tenantType = normalizeTenantType(tenant);

  return { tenantId, tenant, tenantType, membership, user: userRecord };
}

export async function assertTenantWriteContext(req: NextRequest, options?: AssertOptions) {
  const { tenantId, tenant, user, tenantType, membership } = await getActiveTenantForRequest(req);
  if (!user) {
    throw Object.assign(new Error("unauthorized"), { status: 401 });
  }
  if (!tenantId || !tenant) {
    throw Object.assign(new Error("no-tenant"), { status: 400 });
  }
  const allowed = await assertMembership(user.uid, tenantId);
  if (!allowed) {
    throw Object.assign(new Error("forbidden"), { status: 403 });
  }
  if (options?.roles && membership?.role && !options.roles.includes(membership.role)) {
    throw Object.assign(new Error("forbidden"), { status: 403 });
  }
  return { user, tenantId, tenant, tenantType, membership };
}

export async function assertAgencyContext(req: NextRequest, options?: AssertOptions) {
  const ctx = await assertTenantWriteContext(req, options);
  if (ctx.tenantType !== "agency") {
    throw Object.assign(new Error("forbidden"), { status: 403 });
  }
  return ctx;
}

export async function assertClientContext(req: NextRequest, options?: AssertOptions) {
  const ctx = await assertTenantWriteContext(req, options);
  if (ctx.tenantType === "agency") {
    throw Object.assign(new Error("forbidden"), { status: 403 });
  }
  return ctx;
}

export async function assertTenantMembership(req: NextRequest) {
  return assertTenantWriteContext(req);
}
