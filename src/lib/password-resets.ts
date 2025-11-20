import crypto from "crypto";
import type { UserRecord } from "firebase-admin/auth";
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin";
import { resend } from "@/lib/resend";

export const RESET_COLLECTION = "password_resets";

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function resolveClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  const candidate = forwardedFor?.split(",")[0]?.trim();
  if (candidate) return candidate;
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return null;
}

function resolveBaseUrl(headers: Headers) {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.APP_URL) {
    return process.env.APP_URL;
  }
  const host = headers.get("host");
  if (host) {
    const proto = headers.get("x-forwarded-proto") || "https";
    return `${proto}://${host}`;
  }
  return "https://sylor.ai";
}

export async function createPasswordResetRequest(
  normalizedEmail: string,
  headers: Headers
) {
  const adminAuth = getAdminAuth();
  const adminDb = getAdminFirestore();

  let user: UserRecord | null = null;
  try {
    user = await adminAuth.getUserByEmail(normalizedEmail);
  } catch {
    user = null;
  }

  if (!user || !resend) {
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const now = Date.now();
  const expiresAt = now + 1000 * 60 * 60;
  const clientIp = resolveClientIp(headers);

  await adminDb.collection(RESET_COLLECTION).doc(tokenHash).set({
    uid: user.uid,
    email: normalizedEmail,
    tokenHash,
    createdAt: now,
    expiresAt,
    used: false,
    ip: clientIp,
    userAgent: headers.get("user-agent") ?? null,
  });

  const baseUrl = resolveBaseUrl(headers);
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await resend?.emails.send({
    from: "Sylor AI <no-reply@sylor.ai>",
    to: normalizedEmail,
    subject: "Reset your Sylor AI password",
    html: `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#050509;padding:32px 0;color:#ffffff;font-family:system-ui,-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;">
        <tr>
          <td align="center">
            <table width="480" cellpadding="0" cellspacing="0" style="background:#0b0c10;border-radius:24px;border:1px solid rgba(255,255,255,0.08);padding:32px;">
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <div style="width:40px;height:40px;border-radius:999px;background:#ffffff;color:#050509;font-weight:700;font-size:18px;display:flex;align-items:center;justify-content:center;">S</div>
                </td>
              </tr>
              <tr>
                <td style="font-size:20px;font-weight:600;padding-bottom:8px;text-align:left;">
                  Reset your password
                </td>
              </tr>
              <tr>
                <td style="font-size:14px;line-height:1.5;color:rgba(255,255,255,0.75);padding-bottom:24px;text-align:left;">
                  We received a request to reset the password for your Sylor AI account.
                  If you didn’t make this request, you can safely ignore this email.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <a href="${resetUrl}" style="display:inline-block;padding:10px 22px;border-radius:999px;background:#ffffff;color:#050509;font-size:14px;font-weight:600;text-decoration:none;">Reset password</a>
                </td>
              </tr>
              <tr>
                <td style="font-size:12px;line-height:1.5;color:rgba(255,255,255,0.5);text-align:left;">
                  This link will expire in 1 hour. For your security, it can only be used once.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `,
  });
}
