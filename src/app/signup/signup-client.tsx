"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { PlanId } from "@/types";
import { signInWithCustomToken } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { logLoginToServer } from "@/lib/api";

export default function SignupClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = (searchParams.get("plan") as PlanId | null) ?? null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "verify">("form");
  const [code, setCode] = useState("");
  const [info, setInfo] = useState("");
  const auth = getFirebaseAuth();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErr("");
  }, [plan]);

  const requestCode = async () => {
    setErr("");
    setInfo("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setErr("Enter your email first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: trimmedEmail, password, plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        const error = data?.error;
        if (error === "email-in-use") {
          setErr("That email is already in use. Try logging in instead.");
        } else if (error === "could-not-send-email" || error === "email-service-unavailable") {
          setErr("We couldn't send the code. Please try again in a moment.");
        } else {
          setErr(error || "Could not send code.");
        }
        return;
      }
      setStep("verify");
      setInfo("Check your email for a 6-digit code.");
    } catch (error: any) {
      console.error(error);
      setErr("Could not send code.");
    } finally {
      setLoading(false);
    }
  };

  async function handleRequestCode(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    await requestCode();
  }

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setInfo("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        const error = data?.error;
        if (error === "invalid-code") {
          setErr("Invalid code. Please try again.");
        } else if (error === "code-expired") {
          setErr("Code expired. Please request a new one.");
          setStep("form");
        } else if (error === "email-in-use") {
          setErr("That email is already in use. Try logging in instead.");
        } else {
          setErr(error || "Could not verify code.");
        }
        setLoading(false);
        return;
      }

      const customToken = data?.customToken as string | undefined;
      const nextPlan = data?.plan ?? plan;

      if (customToken) {
        try {
          const cred = await signInWithCustomToken(auth, customToken);
          const idToken = await cred.user.getIdToken();
          await logLoginToServer(idToken);
        } catch (tokenErr) {
          console.error("[signup] failed to sign in with custom token", tokenErr);
          setErr("Account created, but we could not sign you in. Please log in.");
          setLoading(false);
          return;
        }
      }

      const next = nextPlan ? `/setup?plan=${nextPlan}` : "/setup";
      router.push(next);
    } catch (error: any) {
      console.error(error);
      setErr("Could not verify code.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4 relative">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 text-sm text-white/50 hover:text-white/80"
      >
        {"< Back to site"}
      </button>

      <div className="w-full max-w-md rounded-[18px] border border-white/10 bg-[#0f1011]/70 p-8 shadow-xl relative z-10">
        <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
        <p className="text-sm text-white/45 mb-6">
          {plan
            ? `You’ll continue with: ${plan.toUpperCase()}`
            : "Start your workspace. You can pick a plan later."}
        </p>

        {step === "form" ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label className="text-sm text-white/50 mb-1 block">Full name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Contractor"
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-white/50 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-sm text-white/50 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30"
              />
            </div>

            {err ? (
              <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
                {err}
              </p>
            ) : null}
            {info ? (
              <p className="text-xs text-green-400 bg-green-400/5 rounded-[8px] px-3 py-2">
                {info}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Sending code..." : "Send verification code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="text-sm text-white/50 mb-1 block">Verification code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="123456"
                className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/30 tracking-[4px]"
              />
            </div>

            {err ? (
              <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
                {err}
              </p>
            ) : null}
            {info ? (
              <p className="text-xs text-green-400 bg-green-400/5 rounded-[8px] px-3 py-2">
                {info}
              </p>
            ) : (
              <p className="text-xs text-white/40">
                Code sent to <span className="text-white/70">{email}</span>
              </p>
            )}

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("form");
                  setCode("");
                }}
                className="text-xs text-white/60 hover:text-white/90"
              >
                Start over
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleRequestCode()}
                className="text-xs text-white/60 hover:text-white/90"
              >
                Resend code
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify and continue"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
