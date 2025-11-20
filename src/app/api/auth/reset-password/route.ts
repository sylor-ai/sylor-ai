import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";

const RESET_COLLECTION = "password_resets";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json().catch(() => ({} as any));

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { ok: false, error: "Invalid or missing token." },
        { status: 400 }
      );
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        {
          ok: false,
          error: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const adminDb = getAdminFirestore();
    const adminAuth = getAdminAuth();
    const tokenHash = hashToken(token);
    const docRef = adminDb.collection(RESET_COLLECTION).doc(tokenHash);
    const snap = await docRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "Reset link is invalid or expired." },
        { status: 400 }
      );
    }

    const data = snap.data() as {
      uid: string;
      email: string;
      expiresAt: number;
      used: boolean;
    };

    const now = Date.now();
    if (!data || data.used || !data.expiresAt || data.expiresAt < now) {
      return NextResponse.json(
        { ok: false, error: "Reset link is invalid or expired." },
        { status: 400 }
      );
    }

    await adminAuth.updateUser(data.uid, { password });
    await adminAuth.revokeRefreshTokens(data.uid);

    await docRef.update({
      used: true,
      usedAt: now,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reset-password] error", err);
    return NextResponse.json(
      { ok: false, error: "Unable to reset password." },
      { status: 500 }
    );
  }
}
