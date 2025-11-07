// FILE: src/app/auth/magic/complete/magic-complete-client.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { logLoginToServer } from "@/lib/api";

type Status = "idle" | "working" | "success" | "error";

export default function MagicCompleteClient() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Parse token from URL query on the client
    let token: string | null = null;

    try {
      const url = new URL(window.location.href);
      token =
        url.searchParams.get("token") ??
        url.searchParams.get("t") ??
        url.searchParams.get("code");
    } catch (err) {
      console.error("[magic-complete] failed to parse URL", err);
    }

    if (!token) {
      setStatus("error");
      setMessage("Missing or invalid magic link.");
      return;
    }

    const safeToken = token;
    let cancelled = false;

    async function run() {
      try {
        setStatus("working");
        setMessage("Completing your login…");

        // Call magic verify endpoint to get a Firebase custom token
        const res = await fetch(
          `/api/auth/magic/verify?token=${encodeURIComponent(safeToken)}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Magic link verification failed.");
        }

        const data = await res.json();
        const customToken: string =
          data.customToken ?? data.token ?? data.firebaseToken;

        if (!customToken) {
          throw new Error("No custom token returned from server.");
        }

        const auth = getFirebaseAuth();
        await signInWithCustomToken(auth, customToken);

        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          await logLoginToServer(idToken);
        }

        if (!cancelled) {
          setStatus("success");
          setMessage(null);
          // Redirect to dashboard (or redirectTo param if you add that later)
          router.replace("/dashboard");
        }
      } catch (err: any) {
        console.error("[magic-complete] error", err);
        if (!cancelled) {
          setStatus("error");
          setMessage(
            err?.message ??
              "We couldn’t complete your magic link login. Please try again."
          );
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl">
        <h1 className="text-lg font-semibold mb-2">
          Completing your login&hellip;
        </h1>

        {status === "working" && (
          <p className="text-sm text-muted-foreground">
            Please wait a moment while we verify your magic link.
          </p>
        )}

        {status === "error" && (
          <div className="space-y-2">
            <p className="text-sm text-red-400">
              {message ??
                "Something went wrong while completing your login. Your link may have expired."}
            </p>
            <p className="text-xs text-muted-foreground">
              You can close this tab and request a new magic link.
            </p>
          </div>
        )}

        {status === "success" && (
          <p className="text-sm text-emerald-400">
            Logged in successfully. Redirecting to your dashboard&hellip;
          </p>
        )}

        {status === "idle" && (
          <p className="text-sm text-muted-foreground">
            Preparing to complete your login&hellip;
          </p>
        )}
      </div>
    </div>
  );
}
