"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { logLoginToServer } from "@/lib/api";

export default function MagicCompletePage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const next = params.get("next") || "/dashboard";

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!token) {
        setError("Missing token");
        return;
      }
      try {
        const auth = getFirebaseAuth();
        const cred = await signInWithCustomToken(auth, token);
        const idToken = await cred.user.getIdToken();
        await logLoginToServer(idToken);
        router.replace(next);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || "Sign-in failed");
      }
    })();
  }, [token, next, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-white px-4">
      <div className="text-sm text-white/70">
        {error ? `Magic-link failed: ${error}` : "Signing you in..."}
      </div>
    </div>
  );
}

