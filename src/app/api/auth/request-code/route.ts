// FILE: src/app/api/auth/request-code/route.ts
import { NextResponse } from "next/server";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { sendVerificationEmail } from "@/lib/mail";

function makeCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, plan } = body;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Missing email or password" },
        { status: 400 }
      );
    }

    const normEmail = email.toLowerCase();
    const adminAuth = getAdminAuth();
    const firestore = getAdminFirestore();

    // block if email already exists in Firebase Auth
    try {
      const existing = await adminAuth.getUserByEmail(normEmail);
      if (existing) {
        return NextResponse.json(
          { ok: false, error: "email-exists" },
          { status: 409 }
        );
      }
    } catch (e: any) {
      if (
        e?.code !== "auth/user-not-found" &&
        e?.errorInfo?.code !== "auth/user-not-found"
      ) {
        console.error("request-code getUserByEmail error", e);
        return NextResponse.json(
          { ok: false, error: "Server auth lookup failed" },
          { status: 500 }
        );
      }
    }

    const code = makeCode();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    await firestore
      .collection("pendingSignups")
      .doc(normEmail)
      .set({
        name: name || "",
        email: normEmail,
        password,
        plan: plan || "starter",
        code,
        expiresAt,
        createdAt: Date.now(),
        emailVerified: false,
      });

    await sendVerificationEmail(normEmail, code);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("request-code error", e);
    return NextResponse.json(
      { ok: false, error: "Server error requesting code" },
      { status: 500 }
    );
  }
}
