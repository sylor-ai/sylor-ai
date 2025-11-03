// FILE: src/app/api/auth/verify-code/route.ts
import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || !code) {
      return NextResponse.json(
        { ok: false, error: "Missing email or code" },
        { status: 400 }
      );
    }

    const firestore = getAdminFirestore();
    const normEmail = email.toLowerCase();

    const snap = await firestore
      .collection("pendingSignups")
      .doc(normEmail)
      .get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, error: "No pending signup found." },
        { status: 400 }
      );
    }

    const data = snap.data() as any;

    if (data.code !== code) {
      return NextResponse.json(
        { ok: false, error: "Invalid code." },
        { status: 400 }
      );
    }

    if (Date.now() > data.expiresAt) {
      return NextResponse.json(
        { ok: false, error: "Code expired. Please sign up again." },
        { status: 400 }
      );
    }

    await snap.ref.set(
      {
        emailVerified: true,
        verifiedAt: Date.now(),
      },
      { merge: true }
    );

    return NextResponse.json({ ok: true, emailVerified: true });
  } catch (e: any) {
    console.error("verify-code error", e);
    return NextResponse.json(
      { ok: false, error: "Server error verifying code" },
      { status: 500 }
    );
  }
}
