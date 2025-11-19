import { Suspense } from "react";
import BillingClient from "./billing-client";

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70">
            Loading billing…
          </div>
        </div>
      }
    >
      <BillingClient />
    </Suspense>
  );
}
