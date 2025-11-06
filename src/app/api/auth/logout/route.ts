// FILE: src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "sylor_session";
const LAST_ACTIVE_COOKIE = "sylor_last_active";
const REAUTH_COOKIE = "sylor_reauth_ok";

const isProd = process.env.NODE_ENV === "production";

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ ok: true });

  const common = {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
  };

  res.cookies.set(SESSION_COOKIE, "", { ...common, maxAge: 0 });
  res.cookies.set(LAST_ACTIVE_COOKIE, "", { ...common, maxAge: 0 });
  res.cookies.set(REAUTH_COOKIE, "", { ...common, maxAge: 0 });

  return res;
}
