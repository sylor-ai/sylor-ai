"use server";

import { cookies, headers } from "next/headers";
import crypto from "crypto";

const NAME = "sylor_csrf";

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

export async function assertCsrf() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(NAME)?.value;
  const header = headers().get("x-csrf-token");
  if (!cookie || !header || cookie !== header) {
    throw new Error("CSRF check failed");
  }
}
