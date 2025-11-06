import { Suspense } from "react";
import BillingClient from "./billing-client";

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center text-white/60">
          Loading billing...
        </div>
      }
    >
      <BillingClient />
    </Suspense>
  );
}

