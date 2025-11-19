import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  parseSessionCookie,
  refreshSession,
  sessionCookieValue,
  SESSION_COOKIE,
  remainingSessionSeconds,
  createSessionCookie,
  setTenantCookie,
} from "@/lib/session";
import { getAdminFirestore, getAdminAuth } from "@/lib/firebase-admin";

const PROTECTED_PAGE_PREFIXES = [
  "/dashboard",
  "/leads",
  "/messages",
  "/appointments",
  "/billing",
  "/system",
  "/pro-lab",
  "/settings",
  "/onboarding",
  "/setup",
];

const API_ALLOWLIST_PREFIXES = ["/api/public", "/api/auth"];
const API_ALLOWLIST_EXACT = [
  "/api/health",
  "/api/auth/csrf",
  "/api/sms/inbound",
  "/api/sms/webhook",
  "/api/stripe/webhook",
];

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api");
  const needsAuth = isApiRoute
    ? isProtectedApi(pathname)
    : isProtectedPage(pathname);

  if (!needsAuth) {
    return NextResponse.next();
  }

  try {
    const cookie = req.cookies.get(SESSION_COOKIE)?.value ?? null;
    let { session, isExpired, shouldRefresh } = parseSessionCookie(cookie);
    const res = NextResponse.next();

    // If no valid session cookie, but Authorization bearer is present, try to rebuild session from Firebase token
    if ((!session || isExpired) && req.headers.get("authorization")) {
      const authHeader = req.headers.get("authorization") || "";
      const match = authHeader.match(/^Bearer\s+(.+)$/i);
      const idToken = match?.[1];
      if (idToken) {
        try {
          const adminAuth = getAdminAuth();
          const decoded = await adminAuth.verifyIdToken(idToken);
          const db = getAdminFirestore();
          const userSnap = await db.collection("users").doc(decoded.uid).get();
          const user = userSnap.exists ? (userSnap.data() as any) : null;
          const memberships = Array.isArray(user?.memberships)
            ? user.memberships
            : [];
          const tenantId =
            user?.defaultTenantId ||
            memberships[0]?.tenantId ||
            user?.tenantId ||
            decoded.uid;

          const newSessionRaw = createSessionCookie(decoded.uid, tenantId, idToken);
          session = parseSessionCookie(newSessionRaw).session;
          isExpired = false;
          shouldRefresh = false;
          res.cookies.set(SESSION_COOKIE, newSessionRaw, {
            ...COOKIE_OPTIONS,
            maxAge: remainingSessionSeconds(session!),
          });
          if (tenantId) {
            setTenantCookie(res, tenantId, session);
          }
        } catch (err) {
          console.warn("[middleware] failed to rebuild session from Authorization", err);
        }
      }
    }

    if (!session || isExpired) {
      return handleUnauthorized(req, isApiRoute);
    }

    if (shouldRefresh) {
      const updated = refreshSession(session);
      res.cookies.set(SESSION_COOKIE, sessionCookieValue(updated), {
        ...COOKIE_OPTIONS,
        maxAge: remainingSessionSeconds(updated),
      });
    }

    // Ensure tenant cookie is set/valid
    await ensureTenantContext(req, res, session.uid);

    return res;
  } catch (err) {
    console.error("[middleware] auth failure", err);
    return handleFailure(req, isApiRoute);
  }
}

function isProtectedPage(pathname: string) {
  return PROTECTED_PAGE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isProtectedApi(pathname: string) {
  if (!pathname.startsWith("/api")) return false;
  if (
    API_ALLOWLIST_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  ) {
    return false;
  }
  if (API_ALLOWLIST_EXACT.includes(pathname)) {
    return false;
  }
  // Protect tenant/agency/analytics/conversations/ai/billing/sms send and defaults
  if (
    pathname.startsWith("/api/tenant/") ||
    pathname.startsWith("/api/agency/") ||
    pathname.startsWith("/api/analytics/") ||
    pathname.startsWith("/api/conversations/") ||
    pathname.startsWith("/api/ai/") ||
    pathname.startsWith("/api/billing/") ||
    pathname.startsWith("/api/sms/send")
  ) {
    return true;
  }
  // Default: protect other APIs unless explicitly allowlisted above
  return true;
}

function handleUnauthorized(req: NextRequest, isApi: boolean) {
  if (isApi) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 }
    );
  }
  const loginUrl = new URL("/login", req.url);
  const nextPath = req.nextUrl.pathname + req.nextUrl.search;
  loginUrl.searchParams.set("next", nextPath);
  return NextResponse.redirect(loginUrl);
}

function handleFailure(req: NextRequest, isApi: boolean) {
  if (isApi) {
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}

async function ensureTenantContext(
  req: NextRequest,
  res: NextResponse,
  uid: string
) {
  try {
    const cookieTenant = req.cookies.get("sylor_tenant_id")?.value || null;
    if (cookieTenant) return;

    const db = getAdminFirestore();
    const userSnap = await db.collection("users").doc(uid).get();
    const user = userSnap.exists ? (userSnap.data() as any) : null;
    const memberships = Array.isArray(user?.memberships) ? user.memberships : [];
    const tenantId =
      user?.defaultTenantId ||
      (memberships[0]?.tenantId || user?.tenantId || null);

    if (tenantId) {
      res.cookies.set("sylor_tenant_id", tenantId, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  } catch (err) {
    console.warn("[middleware] ensureTenantContext failed", err);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:png|jpg|svg|ico|css|js)).*)",
  ],
};
