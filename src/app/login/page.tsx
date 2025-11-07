"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { logLoginToServer } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const auth = getFirebaseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTo] = useState<string>("/dashboard");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const url = new URL(window.location.href);
      const raw = url.searchParams.get("redirectTo");
      if (raw && raw.startsWith("/")) {
        setRedirectTo(raw);
      } else {
        setRedirectTo("/dashboard");
      }
    } catch {
      setRedirectTo("/dashboard");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      (async () => {
        try {
          const idToken = await cred.user.getIdToken();
          await logLoginToServer(idToken);
        } catch (err) {
          console.error("[login] Failed to log login:", err);
        }
      })();

      router.replace(redirectTo || "/dashboard");
    } catch (err: any) {
      console.error("[login] sign-in failed", err);
      setError(
        err?.message ??
          "We couldn’t log you in. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0b0c]/90 p-8 shadow-xl">
        <button
          className="text-sm text-white/40 hover:text-white/70 mb-6"
          type="button"
          onClick={() => router.push("/")}
        >
          ← Back to site
        </button>

        <div className="mb-6">
          <p className="text-xs font-semibold text-white/40 mb-1">
            Welcome back
          </p>
          <h1 className="text-2xl font-semibold">Sylor.ai</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-black border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/40"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Continue →"}
          </button>
        </form>

        <p className="mt-4 text-xs text-white/40 text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-white hover:underline"
            onClick={() => router.push("/signup")}
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
