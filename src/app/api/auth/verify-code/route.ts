import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import type { UserRecord } from "firebase-admin/auth";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { initTenantUsageIfMissing } from "@/lib/usage";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const { email, code } = body;

  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedCode = typeof code === "string" ? code.trim() : "";

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Valid email is required." },
      { status: 400 }
    );
  }

  if (!normalizedCode || normalizedCode.length < 4) {
    return NextResponse.json(
      { ok: false, error: "Invalid code." },
      { status: 400 }
    );
  }

  try {
    const adminAuth = getAdminAuth();
    const db = getAdminFirestore();
    const pendingRef = db.collection("pendingSignups").doc(normalizedEmail);
    const snap = await pendingRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "invalid-code" },
        { status: 400 }
      );
    }

    const data = snap.data() as any;
    const expectedCode = data?.code as string | undefined;
    const expiresAt = data?.codeExpiresAt as number | undefined;

    if (!expectedCode || expectedCode !== normalizedCode) {
      return NextResponse.json(
        { ok: false, error: "invalid-code" },
        { status: 400 }
      );
    }

    if (typeof expiresAt === "number" && Date.now() > expiresAt) {
      return NextResponse.json(
        { ok: false, error: "code-expired" },
        { status: 400 }
      );
    }

    const name = (data?.name as string) || "";
    const password = (data?.password as string) || "";
    const plan = data?.plan ?? null;

    if (!password) {
      return NextResponse.json(
        { ok: false, error: "missing-password" },
        { status: 400 }
      );
    }

    let existing: UserRecord | null = null;
    try {
      existing = await adminAuth.getUserByEmail(normalizedEmail);
    } catch {
      existing = null;
    }

    const firestore = db;

    if (existing) {
      const userDoc = await firestore.collection("users").doc(existing.uid).get();
      if (userDoc.exists) {
        return NextResponse.json(
          { ok: false, error: "email-in-use" },
          { status: 400 }
        );
      } else {
        await adminAuth.deleteUser(existing.uid).catch(() => {});
      }
    }

    const newUser = await adminAuth.createUser({
      email: normalizedEmail,
      password,
      displayName: name,
    });

    const tenantId = newUser.uid;
    const initials = (name || normalizedEmail)
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();

    await firestore.collection("tenants").doc(tenantId).set(
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

    await firestore.collection("users").doc(tenantId).set(
      {
        id: tenantId,
        name: name || normalizedEmail,
        email: normalizedEmail,
        avatarInitials: initials || "U",
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

    await pendingRef.delete().catch(() => {});

    const customToken = await adminAuth.createCustomToken(newUser.uid);

    return NextResponse.json({
      ok: true,
      user: { id: newUser.uid, email: newUser.email },
      plan: plan ?? null,
      customToken,
    });
  } catch (err) {
    console.error("[verify-code] error", err);
    return NextResponse.json(
      { ok: false, error: "server-error" },
      { status: 500 }
    );
  }
}
