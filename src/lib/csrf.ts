import crypto from "crypto";
import { cookies, headers } from "next/headers";

const NAME = "sylor_csrf";

/**
 * Issues a CSRF token, stores it in a secure cookie, and returns the token.
 */
export async function issueCsrf() {
  const token = crypto.randomBytes(16).toString("hex");

  const cookieStore = await cookies();
  cookieStore.set(NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
}

/**
 * Verifies that the CSRF cookie and the x-csrf-token header match.
 * Throws an error if the check fails.
 */
export async function assertCsrf() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(NAME)?.value;

  const hdrs = await headers();
  const header = hdrs.get("x-csrf-token");

  if (!cookie || !header || cookie !== header) {
    throw new Error("CSRF check failed");
  }
}
