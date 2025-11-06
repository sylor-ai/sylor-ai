// FILE: src/middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { verifySylorSession } from "@/lib/auth-server";

const isProd = process.env.NODE_ENV === "production";

const PUBLIC_ROUTES = [
  "/", // marketing site
  "/login",
  "/signup",
  "/auth/callback", // if using OAuth
];

const API_PUBLIC_ROUTES = [
  "/api/webhooks/stripe",
  "/api/webhooks/twilio",
  "/api/auth/log-login",
  "/api/auth/request-code",
  "/api/auth/verify-code",
  "/api/auth/finalize-signup",
  "/api/checkout",
  "/api/public/lead",
];

const SENSITIVE_ROUTES = ["/billing", "/settings", "/account/delete"];

const SESSION_COOKIE = "sylor_session";
const LAST_ACTIVE_COOKIE = "sylor_last_active";
const REAUTH_COOKIE = "sylor_reauth_ok";

// 30 min idle timeout for normal session
const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
// 5 min window after re-auth for sensitive actions
const REAUTH_WINDOW_MS = 5 * 60 * 1000;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Static & public assets – skip
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Public API routes
  if (API_PUBLIC_ROUTES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const isAuthRoute = PUBLIC_ROUTES.includes(pathname);
  const sessionToken = req.cookies.get(SESSION_COOKIE)?.value || null;
  const lastActive = req.cookies.get(LAST_ACTIVE_COOKIE)?.value || null;
  const reauthCookie = req.cookies.get(REAUTH_COOKIE)?.value || null;

  // If user is already logged in and hits /login or /signup → send them away
  if (isAuthRoute && sessionToken) {
    try {
      const existing = await verifySylorSession(sessionToken);
      if (existing) {
        const dashUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashUrl);
      }
    } catch {
      // ignore, fall through
    }
  }

  // Is this a protected PAGE (not API)?
  const isProtectedPage =
    !isAuthRoute && !pathname.startsWith("/api") && !pathname.startsWith("/public");

  // 1) If user has no session and hits a protected page → redirect to login.
  if (isProtectedPage && !sessionToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  let user: { id: string; email: string | null } | null = null;

  // 2) If we have a session cookie on a protected page, verify it with Firebase Admin
  if (isProtectedPage && sessionToken) {
    user = await verifySylorSession(sessionToken);

    if (!user) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("reason", "invalid-session");
      loginUrl.searchParams.set("redirectTo", pathname);
      const res = NextResponse.redirect(loginUrl);

      // Clear bad cookies
      res.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      res.cookies.set(LAST_ACTIVE_COOKIE, "", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      res.cookies.set(REAUTH_COOKIE, "", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return res;
    }

    // 3) Idle timeout: if user has session but has been idle too long → force re-login.
    let isExpired = false;

    if (lastActive) {
      const last = parseInt(lastActive, 10);
      if (!Number.isNaN(last)) {
        const now = Date.now();
        if (now - last > IDLE_TIMEOUT_MS) {
          isExpired = true;
        }
      }
    }

    if (isExpired) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("reason", "timeout");
      loginUrl.searchParams.set("redirectTo", pathname);
      const res = NextResponse.redirect(loginUrl);

      // Clear old session cookies
      res.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      res.cookies.set(LAST_ACTIVE_COOKIE, "", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      res.cookies.set(REAUTH_COOKIE, "", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return res;
    }
  }

  // 4) Sensitive routes require recent re-auth
  const isSensitivePage = SENSITIVE_ROUTES.some((p) => pathname.startsWith(p));
  if (isSensitivePage && sessionToken) {
    let reauthStillValid = false;
    if (reauthCookie) {
      const ts = parseInt(reauthCookie, 10);
      if (!Number.isNaN(ts)) {
        const now = Date.now();
        if (now - ts <= REAUTH_WINDOW_MS) {
          reauthStillValid = true;
        }
      }
    }

    if (!reauthStillValid) {
      const reauthUrl = new URL("/reauth", req.url);
      reauthUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(reauthUrl);
    }
  }

  // 5) Update last active for logged-in users on any request
  const res = NextResponse.next();
  if (sessionToken && isProtectedPage && user) {
    res.cookies.set(LAST_ACTIVE_COOKIE, Date.now().toString(), {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/",
    });
  }

  return res;
}

// Restrict middleware to app and API routes (not everything)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
