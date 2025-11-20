"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050509] text-white px-4">
        <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#0b0c10]/90 p-6 shadow-[0_32px_60px_rgba(0,0,0,0.65)] text-sm">
          <h1 className="text-lg font-semibold mb-2">Invalid link</h1>
          <p className="text-white/60">
            This password reset link is missing or invalid. Please request a new
            one from the login page.
          </p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setDone(false);

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({} as any));

      if (!res.ok || !data.ok) {
        setError(
          data?.error || "Reset link is invalid or expired. Request a new one."
        );
        return;
      }

      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Unable to reset password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050509] text-white px-4">
      <div className="w-full max-w-md rounded-[24px] border border-white/10 bg-[#0b0c10]/90 p-6 shadow-[0_32px_60px_rgba(0,0,0,0.65)]">
        <h1 className="text-xl font-semibold mb-2">Set a new password</h1>
        <p className="text-sm text-white/60 mb-4">
          Choose a strong password you don&apos;t use anywhere else.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/60 mb-1 block">
              New password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[10px] bg-[#050509] border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="text-xs text-white/60 mb-1 block">
              Confirm password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
              Password updated. You can now sign in with your new password.
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {submitting ? "Updating…" : "Update password"}
          </button>
        </form>

        <button
          onClick={() => router.push("/login")}
          className="mt-4 w-full text-xs text-white/60 hover:text-white/90"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
