// FILE: src/app/(dashboard)/settings/account/page.tsx
import { Suspense } from "react";
import AccountSettingsClient from "./account-settings-client";

export default function AccountSettingsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading account settings...</div>}>
      <AccountSettingsClient />
    </Suspense>
  );
}
