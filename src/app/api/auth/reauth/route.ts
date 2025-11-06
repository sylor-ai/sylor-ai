// FILE: src/app/api/auth/reauth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyUserPassword, verifySylorSession } from "@/lib/auth-server";

const REAUTH_COOKIE = "sylor_reauth_ok";
const REAUTH_WINDOW_MS = 5 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Missing password" },
        { status: 400 }
      );
    }

    // Get current user id from session cookie / JWT
    const userId = await getCurrentUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const ok = await verifyUserPassword(userId, password);
    if (!ok) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });

    res.cookies.set(
      REAUTH_COOKIE,
      Date.now().toString(), // we only care about timestamp
      {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: REAUTH_WINDOW_MS / 1000,
      }
    );

    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// Example helper – adjust to your session system
async function getCurrentUserIdFromRequest(
  req: NextRequest
): Promise<string | null> {
  const sessionCookie = req.cookies.get("sylor_session")?.value;
  if (!sessionCookie) return null;

  // e.g. verify JWT, or call your existing server-side `getUserFromSession`
  const user = await verifySylorSession(sessionCookie);
  return user?.id ?? null;
}
