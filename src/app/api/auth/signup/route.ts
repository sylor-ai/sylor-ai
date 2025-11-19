// FILE: src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { authRatelimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import type { UserRecord } from "firebase-admin/auth";
import { initTenantUsageIfMissing } from "@/lib/usage";

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
  const { name, email, password } = body;
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!normalizedName) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 6) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 6 characters." },
      { status: 400 }
    );
  }

  try {
    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();

    let existing: UserRecord | null = null;
    try {
      existing = await adminAuth.getUserByEmail(normalizedEmail);
    } catch {
      existing = null;
    }

    if (existing) {
      const existingUserDoc = await db.collection("users").doc(existing.uid).get();

      // If Firebase has a user but we never finished provisioning (no user doc), clean it up and continue.
      if (!existingUserDoc.exists) {
        await adminAuth.deleteUser(existing.uid).catch(() => {});
      } else {
        return NextResponse.json({ ok: false, error: "email-in-use" }, { status: 400 });
      }
    }

    const newUser = await adminAuth.createUser({
      email: normalizedEmail,
      password,
      displayName: normalizedName,
    });

    const tenantId = newUser.uid;
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    await db.collection("tenants").doc(tenantId).set(
      {
        id: tenantId,
        businessName: "",
        businessPhone: "",
        planId: null,
        hasActiveSubscription: false,
        stripeCustomerId: `cus_${Date.now()}`,
        telnyxNumber: null,
        telnyxMessagingProfileId: null,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        type: "agency",
        parentAgencyId: null,
      },
      { merge: true }
    );

    await db.collection("users").doc(tenantId).set(
      {
        id: tenantId,
        name: normalizedName,
        email: normalizedEmail,
        avatarInitials: initials,
        tenantId,
        memberships: [
          {
            tenantId,
            role: "owner",
            isAgency: true,
          },
        ],
        defaultTenantId: tenantId,
      },
      { merge: true }
    );

    await initTenantUsageIfMissing(tenantId);

    const customToken = await adminAuth.createCustomToken(newUser.uid);

    return NextResponse.json({
      ok: true,
      user: { id: newUser.uid, email: newUser.email },
      customToken,
    });
  } catch (err: any) {
    console.error("[signup] error:", err);
    const code = err?.code || "";
    if (code === "auth/email-already-exists") {
      return NextResponse.json({ ok: false, error: "email-in-use" }, { status: 400 });
    }
    return NextResponse.json(
      { ok: false, error: "server-error" },
      { status: 500 }
    );
  }
}
