// src/app/reauth/page.tsx
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ReauthPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Re-auth failed");
      }

      router.push(redirectTo);
    } catch (e: any) {
      setErr(e.message || "Re-auth failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05060a] text-white px-4">
      <div className="w-full max-w-md rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl">
        <h1 className="text-2xl font-semibold mb-2">Confirm it&apos;s you</h1>
        <p className="text-sm text-white/60 mb-6">
          For security, please re-enter your password before continuing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {err && (
            <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-2 text-sm font-medium bg-white text-black disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
