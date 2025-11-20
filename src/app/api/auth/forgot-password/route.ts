import { NextRequest, NextResponse } from "next/server";
import { createPasswordResetRequest } from "@/lib/password-resets";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json().catch(() => ({ email: "" }));
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    await createPasswordResetRequest(normalizedEmail, req.headers);

    return NextResponse.json({
      ok: true,
      message:
        "If an account exists for that email, you'll receive a password reset link shortly.",
    });
  } catch (err) {
    console.error("[forgot-password] error", err);
    return NextResponse.json(
      {
        ok: true,
        message:
          "If an account exists for that email, you'll receive a password reset link shortly.",
      },
      { status: 200 }
    );
  }
}
