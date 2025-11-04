"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SignupSuccessClientProps {
  sessionId: string | null;
}

export default function SignupSuccessClient({
  sessionId,
}: SignupSuccessClientProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Missing checkout session.");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/auth/finalize-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await res.json();

        if (data.ok) {
          router.push("/dashboard");
        } else {
          console.error(data);
          setError(data.error || "Could not finalize signup.");
        }
      } catch (e) {
        console.error(e);
        setError("Could not finalize signup.");
      }
    })();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="text-sm text-white/70">
        {error ? `Something went wrong: ${error}` : "Finishing your account…"}
      </div>
    </div>
  );
}
