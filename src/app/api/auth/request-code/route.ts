import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import type { UserRecord } from "firebase-admin/auth";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { authRatelimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { sendVerificationEmail } from "@/lib/mail";

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { success } = await authRatelimit.limit(`signup-code:${ip}`);

  if (!success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({} as any));
  const { name, email, password, plan } = body;

  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedPassword = typeof password === "string" ? password : "";
  const normalizedPlan =
    plan === "agency_core" || plan === "agency_scale" ? plan : null;

  if (!normalizedName) {
    return NextResponse.json(
      { ok: false, error: "Name is required." },
      { status: 400 }
    );
  }
  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Valid email is required." },
      { status: 400 }
    );
  }
  if (!normalizedPassword || normalizedPassword.length < 6) {
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
      return NextResponse.json(
        { ok: false, error: "email-in-use" },
        { status: 400 }
      );
    }

    const code = generateCode();
    const expiresAt = Date.now() + CODE_TTL_MS;

    await db.collection("pendingSignups").doc(normalizedEmail).set({
      name: normalizedName,
      email: normalizedEmail,
      password: normalizedPassword,
      plan: normalizedPlan,
      code,
      codeExpiresAt: expiresAt,
      createdAt: FieldValue.serverTimestamp(),
      ip: ip || null,
    });

    await sendVerificationEmail(normalizedEmail, code);

    // Ensure defaultTenantId gets set later when creating the user; nothing else to do here.
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[request-code] error", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          (err as any)?.code === "resend-not-configured"
            ? "email-service-unavailable"
            : "could-not-send-email",
      },
      { status: 500 }
    );
  }
}
