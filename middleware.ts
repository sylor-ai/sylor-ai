// FILE: middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// right now we don't block anything – Firebase auth is on the client.
// later we can check cookies / headers here.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // run on all app pages, but NOT on:
    // - /api
    // - /_next
    // - /static
    // - any file like .png, .ico, .js
    "/((?!_next|api|static|.*\\..*|favicon.ico).*)",
  ],
};
