import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED_PATHS = [
  "/dashboard",
  "/leads",
  "/messages",
  "/appointments",
  "/billing",
  "/settings",
];

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`)
  );
}

export function middleware(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);

    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/pricing" ||
      pathname.startsWith("/lead/") ||
      pathname.startsWith("/api/webhooks") ||
      pathname.startsWith("/api/public")
    ) {
      return NextResponse.next();
    }

    if (isProtectedPath(pathname)) {
      const session = request.cookies.get("sylor_session")?.value;
      if (!session) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("from", pathname);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    console.error("[middleware] error", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/messages/:path*",
    "/appointments/:path*",
    "/billing/:path*",
    "/settings/:path*",
  ],
};
