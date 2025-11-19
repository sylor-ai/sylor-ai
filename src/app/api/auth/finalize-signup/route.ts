// FILE: src/app/api/auth/finalize-signup/route.ts
import { NextResponse } from "next/server";

// Deprecated: signup success is finalized via /api/billing/confirm now.
export async function POST() {
  return NextResponse.json(
    { ok: false, error: "finalize-signup disabled; use billing/confirm" },
    { status: 410 }
  );
}
