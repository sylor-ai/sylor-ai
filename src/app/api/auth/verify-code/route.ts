// FILE: src/app/api/auth/verify-code/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import {
  devGetSignup,
  devDeleteSignup,
  type DevSignupPayload,
} from "@/lib/dev-signup-store";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (redisUrl && redisToken) {
  redis = new Redis({ url: redisUrl, token: redisToken });
} else {
  console.warn("[verify-code] No Redis – using in-memory dev store");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const { email, code } = body;

  if (!email || !code) {
    return NextResponse.json(
      { ok: false, error: "Missing email or code." },
      { status: 400 }
    );
  }

  const normalizedEmail = String(email).toLowerCase();
  const adminAuth = getAdminAuth();
  const db = getAdminFirestore();
  const key = `signup-code:${normalizedEmail}`;

  // ─── 1. Load payload ─────────────────────────────
  let payload: DevSignupPayload | null = null;

  if (redis) {
    payload = (await redis.get(key)) as DevSignupPayload | null;
  } else {
    payload = devGetSignup(key);
  }

  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "Code expired or not found." },
      { status: 404 }
    );
  }

  // ─── 2. Check code (ALWAYS validate) ─────────────
  if (payload.code !== String(code)) {
    return NextResponse.json(
      { ok: false, error: "Invalid code." },
      { status: 400 }
    );
  }

  const name = payload.name || "User";
  const password = payload.password || "tempPass123";

  // ─── 3. Ensure Firebase user exists ──────────────
  let userRecord;
  try {
    userRecord = await adminAuth.getUserByEmail(normalizedEmail);
  } catch {
    userRecord = await adminAuth.createUser({
      email: normalizedEmail,
      password,
      displayName: name,
    });
  }

  // Align password with what the user entered during signup-code flow
  // This ensures email/password login works after verifying the code,
  // even if the user existed previously with a different password.
  try {
    if (typeof password === "string" && password.length >= 6) {
      await adminAuth.updateUser(userRecord.uid, { password });
    }
  } catch (e) {
    // non-fatal: if update fails, continue with login by custom token
    console.warn("[verify-code] could not update password for user", normalizedEmail);
  }

  // ─── 4. Ensure Firestore tenant + user docs ──────
  const tenantId = userRecord.uid;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const tenantRef = db.collection("tenants").doc(tenantId);
  const userRef = db.collection("users").doc(tenantId);

  const tenantSnap = await tenantRef.get();
  if (!tenantSnap.exists) {
    await tenantRef.set({
      id: tenantId,
      businessName: "",
      businessPhone: "",
      planId: payload.plan ?? null,
      stripeCustomerId: `cus_${Date.now()}`,
      telnyxNumber: null,
      telnyxMessagingProfileId: null,
      createdAt: Date.now(),
    });
  }

  const userSnap = await userRef.get();
  if (!userSnap.exists) {
    await userRef.set({
      id: tenantId,
      name,
      email: normalizedEmail,
      avatarInitials: initials,
      tenantId,
    });
  }

  // ─── 5. Clean up code ────────────────────────────
  if (redis) {
    await redis.del(key);
  } else {
    devDeleteSignup(key);
  }

  // ─── 6. Return custom token to client ────────────
  const customToken = await adminAuth.createCustomToken(userRecord.uid);

  console.log(`[verify-code] Signup completed for ${normalizedEmail}`);
  return NextResponse.json({
    ok: true,
    customToken,
    user: { id: userRecord.uid, email: normalizedEmail },
  });
}
