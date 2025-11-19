// FILE: src/lib/mail.ts
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.MAIL_FROM || "Sylor.ai <onboarding@sylor.ai>";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function sendVerificationEmail(to: string, code: string) {
  if (!resend) {
    throw new Error("resend-not-configured");
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Your Sylor.ai verification code",
      html: `
        <p>Your Sylor.ai code is:</p>
        <p style="font-size: 24px; font-weight: 700; letter-spacing: 6px;">${code}</p>
        <p>This code will expire in 10 minutes.</p>
      `,
    });
  } catch (err) {
    console.error("[mail] failed to send verification email", err);
    throw err;
  }
}

export async function sendPasswordResetEmail(to: string, link: string) {
  if (!resend) {
    throw new Error("resend-not-configured");
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Reset your Sylor.ai password",
      html: `
        <p>You asked to reset your Sylor.ai password.</p>
        <p><a href="${link}">Click here to reset it</a></p>
        <p>If you didn't request this, you can ignore this email.</p>
      `,
    });
  } catch (err) {
    console.error("[mail] failed to send password reset email", err);
    throw err;
  }
}
