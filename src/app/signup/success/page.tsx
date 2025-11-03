// FILE: src/app/signup/success/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignupSuccessPage() {
  const search = useSearchParams();
  const router = useRouter();
  const sessionId = search.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    (async () => {
      // 1) finalize server-side (creates user/tenant, deletes pending)
      const res = await fetch("/api/auth/finalize-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });

      const data = await res.json();
      if (!data?.ok) {
        console.error("finalize failed:", data);
        return;
      }

      // 2) auto sign-in on the client so auth.currentUser is ready
      const email = localStorage.getItem("signupEmail") ?? "";
      const password = localStorage.getItem("signupPassword") ?? "";

      try {
        if (email && password) {
          const auth = getFirebaseAuth();
          await signInWithEmailAndPassword(auth, email, password);
        }
      } finally {
        // clean up regardless
        localStorage.removeItem("signupEmail");
        localStorage.removeItem("signupPassword");
      }

      // 3) go to setup first; dashboard as fallback
      router.replace("/setup");
    })();
  }, [sessionId, router]);

  return (
    <div className="min-h-[60vh] grid place-items-center text-white">
      <p className="text-sm opacity-70">Finishing your account…</p>
    </div>
  );
}
