import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const FROM_EMAIL =
  process.env.MAIL_FROM || "Sylor.ai <onboarding@sylor.ai>";

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;
