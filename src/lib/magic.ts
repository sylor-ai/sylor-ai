// src/lib/magic.ts
import { Redis } from "@upstash/redis";
import crypto from "crypto";
import nodemailer from "nodemailer";

const redis = Redis.fromEnv();
const SITE = process.env.SITE_URL || "https://sylor.ai";

// transporter: use SendGrid SMTP or any transactional provider
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function createAndSendMagicLink(email: string) {
  const token = crypto.randomBytes(32).toString("hex");
  const key = `magic:${token}`;

  // store token -> email mapping for 15 minutes
  await redis.set(key, email, { ex: 60 * 15 });

  const link = `${SITE}/api/auth/magic/verify?token=${token}`;

  await transporter.sendMail({
    to: email,
    from: "Sylor AI <hello@sylor.ai>",
    subject: "Your sign-in link for Sylor.ai",
    html: `Click <a href="${link}">here to sign in</a>. Link valid for 15 minutes.`,
  });

  return token;
}

