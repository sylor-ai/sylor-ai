// src/app/api/auth/magic/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getAdminAuth } from "@/lib/firebase-admin";

const redis = Redis.fromEnv();

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const key = `magic:${token}`;
  const email = (await redis.get(key)) as string | null;

  if (!email) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // delete token so it can't be reused
  await redis.del(key);

  // Create or fetch Firebase user, then issue a custom token.
  const adminAuth = getAdminAuth();
  let userRecord;
  try {
    userRecord = await adminAuth.getUserByEmail(email);
  } catch {
    userRecord = await adminAuth.createUser({ email });
  }

  const customToken = await adminAuth.createCustomToken(userRecord.uid);
  const nextUrl = new URL("/auth/magic/complete", req.url);
  nextUrl.searchParams.set("token", customToken);
  nextUrl.searchParams.set("next", "/dashboard");
  return NextResponse.redirect(nextUrl);
}
