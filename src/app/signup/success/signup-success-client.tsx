"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import type { PlanId } from "@/types";

interface SignupSuccessClientProps {
  sessionId: string | null;
  plan?: PlanId | null;
}

export default function SignupSuccessClient({
  sessionId,
  plan,
}: SignupSuccessClientProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [triedFallbackConfirm, setTriedFallbackConfirm] = useState(false);
  const searchParams = useSearchParams();
  const planFromQuery = (searchParams.get("plan") as PlanId | null) ?? null;
  const effectivePlan = plan ?? planFromQuery ?? null;
  const qpSessionId =
    searchParams.get("session_id") ||
    searchParams.get("sessionId") ||
    null;

  const effectiveSessionId = useMemo(() => {
    if (sessionId || qpSessionId) return sessionId || qpSessionId || null;
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("sylor_last_checkout_session");
        return stored || null;
      } catch {
        return sessionId || qpSessionId || null;
      }
    }
    return null;
  }, [sessionId, qpSessionId]);

  useEffect(() => {
    (async () => {
      if (!effectiveSessionId) {
        // Sometimes Stripe uses sessionId instead of session_id; Already checked above.
        // No session id: try to recover by returning to billing activate when plan exists.
        if (effectivePlan && !triedFallbackConfirm) {
          setTriedFallbackConfirm(true);
          router.replace(`/billing/activate?plan=${effectivePlan}`);
          return;
        }
        router.replace("/dashboard");
        return;
      }
      try {
        const auth = getFirebaseAuth();
        const idToken = await auth.currentUser?.getIdToken();

        const res = await fetch("/api/billing/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
          },
          body: JSON.stringify({ sessionId: effectiveSessionId }),
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }

        if (res.ok && data?.ok) {
          try {
            sessionStorage.removeItem("sylor_last_checkout_session");
          } catch {}
          router.push("/dashboard");
        } else {
          console.error(data || "billing/confirm non-OK");
          const errMsg =
            data?.error ||
            (res.status === 401
              ? "unauthorized"
              : res.status === 400
              ? "bad-request"
              : "server-error");
          if (errMsg === "unauthorized") {
            router.replace("/login?redirectTo=/signup/success");
            return;
          }
          setError(errMsg || "Could not finalize billing.");
          router.push("/dashboard");
        }
      } catch (e) {
        console.error(e);
        setError("Could not finalize billing.");
        router.push("/dashboard");
      }
    })();
  }, [effectiveSessionId, effectivePlan, triedFallbackConfirm, router]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="text-sm text-white/70">
        {effectiveSessionId
          ? error
            ? `Something went wrong: ${error}`
            : "Finishing your account..."
          : "Missing checkout session. Redirecting you to dashboard..."}
      </div>
    </div>
  );
}
