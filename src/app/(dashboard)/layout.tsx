// src/app/(dashboard)/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { api } from "@/lib/api";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Leads", href: "/leads", icon: "checklist" },
  { label: "Appointments", href: "/appointments", icon: "calendar" },
  { label: "Messages", href: "/messages", icon: "chat" },
  { label: "Billing", href: "/billing", icon: "card" },
  { label: "Settings", href: "/settings", icon: "cog" },
];

function SidebarIcon({ name }: { name: string }) {
  const base =
    "inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/15";
  switch (name) {
    case "grid":
      return (
        <span className={base}>
          <svg
            className="h-3.5 w-3.5 text-white/85"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="6" height="6" rx="1"></rect>
            <rect x="14" y="4" width="6" height="6" rx="1"></rect>
            <rect x="4" y="14" width="6" height="6" rx="1"></rect>
            <rect x="14" y="14" width="6" height="6" rx="1"></rect>
          </svg>
        </span>
      );
    case "checklist":
      return (
        <span className={base}>
          <svg
            className="h-3.5 w-3.5 text-white/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 6h11" />
            <path d="M9 12h11" />
            <path d="M9 18h11" />
            <path d="m4 6 1.5 1.5L7 6" />
            <path d="m4 12 1.5 1.5L7 12" />
            <path d="m4 18 1.5 1.5L7 18" />
          </svg>
        </span>
      );
    case "calendar":
      return (
        <span className={base}>
          <svg
            className="h-3.5 w-3.5 text-white/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="5" width="16" height="15" rx="2" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
          </svg>
        </span>
      );
    case "chat":
      return (
        <span className={base}>
          <svg
            className="h-3.5 w-3.5 text-white/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          </svg>
        </span>
      );
    case "card":
      return (
        <span className={base}>
          <svg
            className="h-3.5 w-3.5 text-white/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <path d="M6 15h4" />
          </svg>
        </span>
      );
    case "cog":
      return (
        <span className={base}>
          <svg
            className="h-3.5 w-3.5 text-white/80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V10a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </span>
      );
    default:
      return <span className={base} />;
  }
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await api.logout();
    } finally {
      router.push("/"); // ← go to website home
    }
  }

  return (
    <div className="min-h-screen bg-[#050506] text-white flex">
      {/* sidebar */}
      <aside className="hidden md:flex md:w-60 flex-col border-r border-white/5 bg-[#070708]/80 backdrop-blur">
        <div className="h-14 flex items-center gap-2 px-5 border-b border-white/5">
          <img
            src="/SELOR.png"
            alt="Sylor.ai Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-semibold leading-tight">Sylor.ai</p>
            <p className="text-[10px] text-white/35">Lead automation</p>
          </div>
        </div>

        <nav className="flex-1 py-5 space-y-1 px-3">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <SidebarIcon name={item.icon} />
                <span>{item.label}</span>
                {active ? (
                  <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <div className="rounded-[10px] bg-white/5 p-3 text-xs text-white/60 mb-3">
            <p className="text-white mb-1 text-sm font-medium">Starter plan</p>
            <p>50 leads / mo • 24/7 AI</p>
            <Link
              href="/billing"
              className="mt-2 inline-block text-xs text-white hover:underline"
            >
              Upgrade to Pro →
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-[10px] bg-[#16181a] py-2 text-sm text-white/80 hover:bg-[#1f2124]"
          >
            Log out
          </button>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* topbar */}
        <header className="h-14 border-b border-white/5 bg-[#070708]/50 backdrop-blur flex items-center justify-between px-4 gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <input
                placeholder="Search"
                className="w-full bg-white/5 border border-white/5 rounded-[10px] pl-8 pr-3 py-1.5 text-sm outline-none focus:border-white/25"
              />
              <span className="absolute left-2 top-1.5 text-white/70 text-sm">
                {/* search icon white */}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="5" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </span>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => router.push("/leads?new=1")}
                className="rounded-[10px] bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10"
              >
                New lead
              </button>
              <button
                onClick={() => router.push("/appointments?new=1")}
                className="rounded-[10px] bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10"
              >
                + Appointment
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/35">Today: Auto-booking ON</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5d5ff7] to-[#43e7e1] flex items-center justify-center text-sm font-semibold">
              OG
            </div>
          </div>
        </header>

        {/* content */}
        <main className="flex-1 bg-[#050506] p-4">{children}</main>
      </div>
    </div>
  );
}
