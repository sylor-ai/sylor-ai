"use server";

import { cookies, headers } from "next/headers";
import crypto from "crypto";

const NAME = "sylor_csrf";

export function issueCsrf() {
  const token = crypto.randomBytes(16).toString("hex");
  cookies().set(NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
  });
  return token;
}

export function assertCsrf() {
  const cookie = cookies().get(NAME)?.value;
  const header = headers().get("x-csrf-token");
  if (!cookie || !header || cookie !== header) {
    throw new Error("CSRF check failed");
  }
}
