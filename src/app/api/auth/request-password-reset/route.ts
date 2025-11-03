// FILE: src/app/api/auth/request-password-reset/route.ts
import { NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { sendPasswordResetEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ ok: false, error: "email-required" }, { status: 400 });
    }

    const normEmail = email.toLowerCase();
    const adminAuth = getAdminAuth();

    // make sure user exists
    let user;
    try {
      user = await adminAuth.getUserByEmail(normEmail);
    } catch (e: any) {
      // do NOT reveal whether user exists (security)
      return NextResponse.json({ ok: true });
    }

    // generate reset link
    const resetLink = await adminAuth.generatePasswordResetLink(normEmail);

    // send via Resend
    await sendPasswordResetEmail(normEmail, resetLink);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("request-password-reset error", e);
    return NextResponse.json({ ok: false, error: "server-error" }, { status: 500 });
  }
}
