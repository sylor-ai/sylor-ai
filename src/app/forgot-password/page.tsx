"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setDone(false);

    if (!email.trim()) {
      setError("Enter your email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      await res.json().catch(() => ({}));
      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050509] text-white px-4">
      <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#0b0c10]/90 p-6 shadow-[0_32px_60px_rgba(0,0,0,0.65)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center font-bold">
            S
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Sylor AI</p>
            <p className="text-[11px] text-white/40">Lead automation</p>
          </div>
        </div>

        <h1 className="text-xl font-semibold mb-2">Forgot password?</h1>
        <p className="text-sm text-white/60 mb-4">
          Enter the email you use for Sylor AI and we&apos;ll send you a secure
          link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/60 mb-1 block">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[10px] bg-[#050509] border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
              {error}
            </p>
          )}

          {done && !error && (
            <p className="text-xs text-emerald-400 bg-emerald-400/5 rounded-[8px] px-3 py-2">
              If an account exists for that email, you&apos;ll receive a reset
              link in a few minutes.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {submitting ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-white/40">
          For your security, links expire after a short time and can be used
          only once.
        </p>
      </div>
    </div>
  );
}
