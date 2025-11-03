"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

export default function SignupClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = (searchParams.get("plan") || "starter").toLowerCase();

  // steps: 1 = fill form, 2 = verify code
  const [step, setStep] = useState<1 | 2>(1);

  // step 1 data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // step 2 data
  const [code, setCode] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // 1) user fills form → ask server to email a code + stash pending signup
  async function handleRequestCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.requestSignupCode({
        name,
        email,
        password,
        plan: selectedPlan,
      });

      if (!res.ok) {
        setErr(res.error || "Could not send verification code.");
        return;
      }

      // go to step 2
      setStep(2);
    } catch (error: any) {
      console.error(error);
      setErr("Could not send verification code.");
    } finally {
      setLoading(false);
    }
  }

  // 2) user types code → verify → create real account → go to setup
  async function handleVerifyCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.verifySignupCode({
        email,
        code,
      });

      if (!res.ok) {
        setErr(res.error || "Code is invalid or expired.");
        return;
      }

      // success → continue with normal flow
      router.push(`/setup?plan=${selectedPlan}`);
    } catch (error: any) {
      console.error(error);
      setErr("Could not verify code.");
    } finally {
      setLoading(false);
    }
  }

  // 3) Google sign-in (create if missing)
  async function handleGoogle() {
    setErr("");
    setLoading(true);
    try {
      const user = await api.googleSignIn();
      if (user) {
        router.push(`/setup?plan=${selectedPlan}`);
      }
    } catch (e: any) {
      console.error(e);
      setErr("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4 relative">
      {/* back to landing */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80"
      >
        ← Back to site
      </button>

      <div className="w-full max-w-md rounded-[18px] border border-white/10 bg-[#0f1011]/70 p-8 shadow-xl relative z-10">
        {/* header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold">
            S
          </div>
          <div>
            <p className="text-sm text-white/40">Create account</p>
            <p className="font-semibold text-white">Sylor.ai</p>
          </div>
        </div>

        {/* step indicator */}
        <div className="flex items-center gap-2 mb-6 text-xs text-white/35">
          <span className={step === 1 ? "text-white" : ""}>1. Account</span>
          <span className="h-px flex-1 bg-white/5" />
          <span className={step === 2 ? "text-white" : ""}>2. Verify email</span>
        </div>

        {step === 1 ? (
          <>
            {selectedPlan ? (
              <p className="text-xs text-white/35 mb-3">
                You’ll continue with: {selectedPlan.toUpperCase()}
              </p>
            ) : null}

            <h1 className="text-2xl font-semibold mb-2">Get started</h1>
            <p className="text-sm text-white/45 mb-6">
              We’ll send a 6-digit code to your email to confirm it’s you.
            </p>

            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Contractor"
                  className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  Password
                </label>
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
                disabled={loading}
                className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
              >
                {loading ? "Sending code..." : "Send me a code →"}
              </button>
            </form>

            {/* Google */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-px flex-1 bg-white/5" />
                <span className="text-xs text-white/30">or</span>
                <span className="h-px flex-1 bg-white/5" />
              </div>
              <button
                onClick={handleGoogle}
                disabled={loading}
                className="w-full rounded-[10px] border border-white/10 bg-white/0 py-2 text-sm text-white/80 hover:bg-white/5 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.6h5.1c-.2 1.2-1.4 3.6-5.1 3.6-3 0-5.4-2.5-5.4-5.5s2.4-5.5 5.4-5.5c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.4 3.7 14.4 3 12 3 6.9 3 2.7 7.1 2.7 12.3S6.9 21.6 12 21.6c6 0 9.9-4.2 9.9-10.2 0-.7-.1-1.2-.2-1.8H12z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-2">Check your email</h1>
            <p className="text-sm text-white/45 mb-6">
              We sent a 6-digit code to <b>{email}</b>. Enter it below.
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  6-digit code
                </label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full tracking-[0.6rem] text-center rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-lg outline-none focus:border-white/40"
                  placeholder="______"
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
                {loading ? "Verifying..." : "Verify & continue →"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-xs text-white/40 hover:text-white/80"
              >
                ← Use a different email
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-white/35">
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
  );
}
