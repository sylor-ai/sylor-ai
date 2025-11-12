// FILE: src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { authRatelimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import type { UserRecord } from "firebase-admin/auth";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { success } = await authRatelimit.limit(`signup:${ip}`);

  if (!success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({} as any));
  const { name, email, password, honey, startedAt } = body;

  // ✅ Basic validation
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 6) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  // 🔒 Honeypot / timing check
  if (typeof honey === "string" && honey.trim() !== "") {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const start = parseInt(String(startedAt || "0"), 10);
  if (start && Date.now() - start < 800) {
    return NextResponse.json({ ok: false, error: "Submission too fast." }, { status: 400 });
  }

  // ✅ Create Firebase user via Admin SDK
  try {
    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    // Check if user already exists
    let existing: UserRecord | null = null;
    try {
      existing = await adminAuth.getUserByEmail(email.toLowerCase());
    } catch {
      existing = null; // ignore not-found
    }

    if (existing) {
      return NextResponse.json({ ok: false, error: "email-in-use" }, { status: 400 });
    }

    // Create Firebase user
    const newUser = await adminAuth.createUser({
      email: email.toLowerCase(),
      password,
      displayName: name,
    });

    // Create tenant & user docs
    const tenantId = newUser.uid;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    await db.collection("tenants").doc(tenantId).set({
      id: tenantId,
      businessName: "",
      businessPhone: "",
      planId: null,
      stripeCustomerId: `cus_${Date.now()}`,
      telnyxNumber: null,
      telnyxMessagingProfileId: null,
      createdAt: Date.now(),
    });

    await db.collection("users").doc(tenantId).set({
      id: tenantId,
      name,
      email: email.toLowerCase(),
      avatarInitials: initials,
      tenantId,
    });

    // Create custom token for client sign-in
    const customToken = await adminAuth.createCustomToken(newUser.uid);

    // Note: Do NOT set sylor_session here; this is a Firebase custom token,
    // not an ID token. The client must sign in with it and then call
    // /api/auth/log-login to set the cookie with a real ID token.
    return NextResponse.json({
      ok: true,
      user: { id: newUser.uid, email: newUser.email },
      customToken,
    });
  } catch (err: any) {
    console.error("[signup] error:", err);
    return NextResponse.json(
      { ok: false, error: "server-error" },
      { status: 500 }
    );
  }
}
