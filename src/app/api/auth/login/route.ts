// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

// Email/password login is handled client-side with Firebase Auth + /api/auth/log-login.
export async function POST(_req: NextRequest) {
  return NextResponse.json(
    { ok: false, error: "Email/password login is handled client-side." },
    { status: 410 }
  );
}
