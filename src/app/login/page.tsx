"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api, logLoginToServer } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [sendingReset, setSendingReset] = useState(false);
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    try {
      const user = await api.login(email, password);
      if (!user) {
        setErr("Invalid email or password.");
        return;
      }
      try {
        const idToken = await user.getIdToken();
        if (idToken) {
          void logLoginToServer(idToken).catch((error) => {
            console.error("Failed to log login", error);
          });
        }
      } catch (tokenErr) {
        console.error("Failed to get ID token", tokenErr);
      }
      router.replace(redirectTo);
    } catch (error: any) {
      setErr("Invalid email or password.");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4 relative">
      {/* back to site */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80"
      >
        ← Back to site
      </button>

      <div className="w-full max-w-md rounded-[18px] border border-white/10 bg-[#0f1011]/70 p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold">
            S
          </div>
          <div>
            <p className="text-sm text-white/40">Welcome back</p>
            <p className="font-semibold text-white">Sylor.ai</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Log in to your account</h1>
        <p className="text-sm text-white/45 mb-6">
          Access your leads, messages, appointments and billing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/50 mb-1 block">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>
          <div className="flex items-center justify-between">
            <span />
            <button
              type="button"
              disabled={!email || sendingReset}
              onClick={async () => {
                setErr("");
                if (!email) return;
                try {
                  setSendingReset(true);
                  await fetch("/api/auth/request-password-reset", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  setErr("If that email exists, a reset link was sent.");
                } catch {
                  setErr("Could not send reset email.");
                } finally {
                  setSendingReset(false);
                }
              }}
              className="text-xs text-white/60 hover:text-white/90 disabled:opacity-40"
            >
              {sendingReset ? "Sending…" : "Forgot password?"}
            </button>
          </div>
          <div>
            <label className="text-sm text-white/50 mb-1 block">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="••••••••"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          {err ? (
            <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
              {err}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90"
          >
            Continue →
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/35">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-white hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
