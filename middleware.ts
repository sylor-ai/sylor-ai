import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  parseSessionCookie,
  refreshSession,
  sessionCookieValue,
  SESSION_COOKIE,
  remainingSessionSeconds,
} from "@/lib/session";

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
];

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export function middleware(req: NextRequest) {
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
    const { session, isExpired, shouldRefresh } = parseSessionCookie(cookie);

    if (!session || isExpired) {
      return handleUnauthorized(req, isApiRoute);
    }

    const res = NextResponse.next();
    if (shouldRefresh) {
      const updated = refreshSession(session);
      res.cookies.set(SESSION_COOKIE, sessionCookieValue(updated), {
        ...COOKIE_OPTIONS,
        maxAge: remainingSessionSeconds(updated),
      });
    }
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

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|assets/|.*\\.(?:png|jpg|svg|ico|css|js)).*)",
  ],
};
