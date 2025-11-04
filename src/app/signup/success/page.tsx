import { Suspense } from "react";
import SignupSuccessClient from "./signup-success-client";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function SignupSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const raw = searchParams.session_id;
  const sessionId =
    typeof raw === "string"
      ? raw
      : Array.isArray(raw)
      ? raw[0]
      : null;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
          <div className="text-sm text-white/70">
            Finishing your account…
          </div>
        </div>
      }
    >
      <SignupSuccessClient sessionId={sessionId} />
    </Suspense>
  );
}
