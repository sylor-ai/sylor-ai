// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authRatelimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { createSessionForUser } from "@/lib/auth-server";
import {
  createSessionCookie,
  SESSION_COOKIE,
  ABSOLUTE_TIMEOUT_MS,
} from "@/lib/session";

// NOTE: Right now your real login is done client-side with Firebase
// (see src/lib/api.ts -> api.login). This route is optional and currently
// just a stub that *could* be wired to server-side auth later.

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  const { success, reset } = await authRatelimit.limit(`login:${ip}`);

  if (!success) {
    const retryAfterSec =
      reset ? Math.max(0, Math.floor((reset - Date.now()) / 1000)) : 60;

    return NextResponse.json(
      { error: "Too many attempts, try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfterSec.toString(),
        },
      }
    );
  }

  const body = await req.json().catch(() => ({} as any));
  const { email, password /* recaptchaToken */ } = body;

  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  // TODO: hook this up to your real auth provider (Firebase Admin, etc.)
  const user = await verifyCredentials(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const session = await createSessionForUser(user.id);

  const now = Date.now();
  const payload = createSessionCookie(user.id, undefined, session.token);
  const res = NextResponse.json({ ok: true, user: { id: user.id, email } });
  res.cookies.set(SESSION_COOKIE, payload, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(ABSOLUTE_TIMEOUT_MS / 1000),
  });

  return res;
}

// Temporary stub – this makes TypeScript happy and avoids runtime crashes.
// Right now, your real login flow is client-side (api.login in src/lib/api.ts).
// If you don't plan to use this route, you can delete the route entirely.
async function verifyCredentials(
  _email: string,
  _password: string
): Promise<{ id: string } | null> {
  // TODO: implement with Firebase Admin or another auth provider, or delete this route.
  return null;
}
