import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Paths that never require auth
const PUBLIC_PATH_PREFIXES = [
  "/",
  "/login",
  "/signup",
  "/reauth",
  "/auth/magic/complete",
  "/auth/magic/send",
  "/lead",
  "/api/health",
  "/api/auth/magic/send",
  "/api/auth/magic/verify",
  "/api/dev/send-test-sms",
  // TEMP: allow dashboard while session cookie is being debugged
  "/dashboard",
];

function isPublicPath(pathname: string) {
  return PUBLIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

export function middleware(req: NextRequest) {
  try {
    const { nextUrl, cookies } = req;
    const pathname = nextUrl.pathname;

    if (
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/assets/") ||
      pathname === "/favicon.ico"
    ) {
      return NextResponse.next();
    }

    if (isPublicPath(pathname)) {
      return NextResponse.next();
    }

    const sessionCookie = cookies.get("sylor_session")?.value;

    if (!sessionCookie) {
      const loginUrl = nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("redirectTo", pathname + nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (err) {
    console.error("[middleware] fatal error; allowing through", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
