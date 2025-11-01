"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function Topbar() {
  const { currentUser, loading } = useCurrentUser();

  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-dark-bg/60 backdrop-blur-xl">
      <div className="text-sm text-dark-text-secondary">
        {loading ? "Loading..." : "Good day 👋"}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-semibold">
            {currentUser?.name ?? "Guest"}
          </div>
          <div className="text-xs text-dark-text-secondary">
            {currentUser?.email ?? ""}
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-bold text-white">
          {currentUser?.avatarInitials ?? "S"}
        </div>
      </div>
    </header>
  );
}
