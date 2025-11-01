"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/api";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planFromUrl = (searchParams.get("plan") || "starter").toLowerCase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const res = await api.signUp(name, email, password);
    if (res.user) {
      // send to pricing WITH plan chosen
      router.push(`/pricing?plan=${planFromUrl}`);
    } else {
      setErr(res.error ?? "Could not create account.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      {/* glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 right-0 h-80 w-80 bg-purple-500/25 blur-[120px]" />
        <div className="absolute -bottom-40 left-0 h-80 w-80 bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold">
            S
          </div>
          <div>
            <p className="text-sm text-white/40">Create account</p>
            <p className="font-semibold text-white">Sylor.ai</p>
          </div>
        </div>

        <div className="rounded-[14px] border border-white/10 bg-[#0f1011]/70 backdrop-blur-lg p-8 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <p className="text-xs text-white/35 mb-3">
            You chose: <span className="uppercase">{planFromUrl}</span>
          </p>
          <h1 className="text-xl font-semibold mb-2">Create your Sylor account</h1>
          <p className="text-sm text-white/45 mb-6">
            We’ll take you to payment right after this.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-white/55 mb-1 block">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                placeholder="John Contractor"
              />
            </div>
            <div>
              <label className="text-sm text-white/55 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-sm text-white/55 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                placeholder="••••••••"
              />
            </div>

            {err ? (
              <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
                {err}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Continue to payment →"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/40">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-white hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
