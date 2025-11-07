import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// TEMP: Allow all requests through while session handling is stabilized.
export function middleware(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    if (
      pathname.startsWith("/_next/") ||
      pathname.startsWith("/assets/") ||
      pathname === "/favicon.ico"
    ) {
      return NextResponse.next();
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
