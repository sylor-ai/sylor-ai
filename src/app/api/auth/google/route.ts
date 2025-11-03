// FILE: src/app/api/auth/google/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // TODO: plug real Google OAuth here
  // for now we just tell the client where to go
  return NextResponse.json({
    ok: true,
    redirectUrl: "/api/auth/google/start",
  });
}
