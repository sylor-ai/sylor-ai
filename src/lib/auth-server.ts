// FILE: src/lib/auth-server.ts

// This file exists to satisfy imports used in security middleware / routes.
// You are using Firebase client auth as the main auth system.
// These helpers are a thin server-side layer on top of Firebase Admin.

import { verifyIdToken, getAdminAuth } from "@/lib/firebase-admin";

export type SylorSession = {
  userId: string;
  token: string;
  maxAgeSeconds: number;
};

/**
 * Verify a session token (Firebase ID token stored in `sylor_session` cookie)
 * and return the user if valid.
 */
export async function verifySylorSession(
  token: string
): Promise<{ id: string; email: string | null } | null> {
  try {
    const decoded = await verifyIdToken(token);
    return {
      id: decoded.uid,
      email: decoded.email ?? null,
    };
  } catch (err) {
    console.warn("[verifySylorSession] invalid or expired token", err);
    return null;
  }
}

/**
 * Create a session for a user. Right now this is just a placeholder
 * for any future non-Firebase session logic. For the current system,
 * the "session" is the Firebase ID token itself.
 */
export async function createSessionForUser(
  userId: string
): Promise<SylorSession> {
  const token = `stub-${userId}-${Date.now()}`;
  const maxAgeSeconds = 60 * 60 * 24 * 7; // 7 days
  return { userId, token, maxAgeSeconds };
}

/**
 * Create a user (stub) and a session for them.
 * Used only by magic-link / experimental flows. For your current
 * Firebase email+password login, this is NOT used in production.
 */
export async function createUserAndSession(_opts: {
  email: string;
  name?: string;
  password?: string;
}): Promise<{
  user: { id: string; email: string; tenantId: string };
  session: SylorSession;
}> {
  const { email } = _opts;

  const userId = `stub-user-${Date.now()}`;
  const tenantId = `stub-tenant-${Date.now()}`;
  const session = await createSessionForUser(userId);

  return {
    user: {
      id: userId,
      email,
      tenantId,
    },
    session,
  };
}

/**
 * Magic-link helper – currently just delegates to the stub above.
 */
export async function createUserAndSessionIfNotExists(_opts: {
  email: string;
}): Promise<{
  user: { id: string; email: string; tenantId: string };
  session: SylorSession;
}> {
  return createUserAndSession(_opts);
}

/**
 * Verify a user's password during "reauth" (sensitive actions).
 * This uses Firebase Admin to look up the user's email, then
 * Google Identity Toolkit (same backend as Firebase Auth) to
 * verify the password.
 */
export async function verifyUserPassword(
  _userId: string,
  _password: string
): Promise<boolean> {
  try {
    if (!_userId || !_password) return false;

    // Look up the user to get their email
    const adminAuth = getAdminAuth();
    const user = await adminAuth.getUser(_userId);
    const email = user.email;
    if (!email) return false;

    // Verify credentials against Identity Toolkit (same backend as Firebase Auth)
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) return false;

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: _password,
          returnSecureToken: false,
        }),
      }
    );

    if (!res.ok) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
