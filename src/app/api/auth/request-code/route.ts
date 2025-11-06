// FILE: src/app/api/auth/request-code/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { verifySylorSession } from "@/lib/auth-server";
import { authRatelimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-ip";
import { Resend } from "resend";
import {
  devSaveSignup,
  type DevSignupPayload,
} from "@/lib/dev-signup-store";

// 10 minutes
const CODE_TTL_SECONDS = 10 * 60;

// ────────────────────────────────────────────────
// Safe Redis init (only if env vars exist)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (redisUrl && redisToken) {
  redis = new Redis({ url: redisUrl, token: redisToken });
} else {
  console.warn("[signup-code] Redis missing – using in-memory dev store");
}

// ────────────────────────────────────────────────
// Safe email init (Resend or mock)
const resendApiKey = process.env.RESEND_API_KEY;
const RESEND_FROM =
  process.env.MAIL_FROM || process.env.RESEND_FROM_EMAIL || "Sylor AI <onboarding@resend.dev>";
let resend: Resend | null = null;
if (resendApiKey) {
  resend = new Resend(resendApiKey);
} else {
  console.warn("[signup-code] RESEND_API_KEY missing – will only log codes");
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // If already logged in, do not send signup codes
  const existingSession = req.cookies.get("sylor_session")?.value || null;
  if (existingSession) {
    try {
      const user = await verifySylorSession(existingSession);
      if (user) {
        return NextResponse.json(
          { ok: false, error: "already-logged-in" },
          { status: 400 }
        );
      }
    } catch {
      // ignore and continue to normal flow
    }
  }

  // Rate-limit by IP so bots can't spam codes
  const { success } = await authRatelimit.limit(`signup-code:${ip}`);
  if (!success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => ({} as any));
  const { name, email, password, plan, honey, startedAt } = body;

  // ─── Basic validation ───
  if (!name || !email || !password) {
    return NextResponse.json(
      { ok: false, error: "Missing fields." },
      { status: 400 }
    );
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, error: "Invalid email." },
      { status: 400 }
    );
  }
  if (password.length < 6) {
    return NextResponse.json(
      { ok: false, error: "Password too short." },
      { status: 400 }
    );
  }

  // 🔒 Honeypot / timing checks
  if (typeof honey === "string" && honey.trim() !== "") {
    return NextResponse.json(
      { ok: false, error: "Invalid submission." },
      { status: 400 }
    );
  }
  const start = parseInt(String(startedAt || "0"), 10);
  if (start && Date.now() - start < 800) {
    return NextResponse.json(
      { ok: false, error: "Submission too fast." },
      { status: 400 }
    );
  }

  const normalizedEmail = String(email).toLowerCase();

  // ─── Generate and store code ───
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const key = `signup-code:${normalizedEmail}`;

  const payload: DevSignupPayload = {
    code,
    name,
    email: normalizedEmail,
    password,
    plan: typeof plan === "string" ? plan : null,
    createdAt: Date.now(),
    ip,
  };

  if (redis) {
    await redis.set(key, payload, { ex: CODE_TTL_SECONDS });
  } else {
    devSaveSignup(key, payload);
    console.log(`[signup-code:dev] Stored in memory for ${key}: ${code}`);
  }

  // ─── Send email or log ───
  if (resend) {
    try {
      await resend.emails.send({
        from: RESEND_FROM,
        to: normalizedEmail,
        subject: "Your Sylor AI verification code",
        html: `
          <div style="font-family:sans-serif;font-size:16px">
            <p>Hi ${name},</p>
            <p>Your verification code is:</p>
            <h2 style="font-size:28px;letter-spacing:4px;">${code}</h2>
            <p>This code will expire in 10 minutes.</p>
            <p>— Sylor AI</p>
          </div>
        `,
      });
      console.log(`[signup-code] Email sent to ${normalizedEmail}`);
    } catch (err) {
      console.error("[signup-code] Failed to send email:", err);
    }
  } else {
    console.log(`SIGNUP CODE for ${normalizedEmail}: ${code}`);
  }

  return NextResponse.json({ ok: true });
}

