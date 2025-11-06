"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { api } from "@/lib/api";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: "grid" },
  { label: "Leads", href: "/leads", icon: "checklist" },
  { label: "Messages", href: "/messages", icon: "chat" },
  { label: "Billing", href: "/billing", icon: "card" },
  { label: "AI Settings", href: "/settings/ai", icon: "cog" },
  { label: "Public lead link", href: "/settings/public-link", icon: "cog" },
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
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function handleLogout() {
    try {
      await api.logout();
    } finally {
      router.push("/");
    }
  }

  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const SidebarContent = (
    <>
      <div className="h-16 flex items-center gap-3 px-5 border-b border-white/10">
        <div className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center font-bold">
          S
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Sylor AI</p>
          <p className="text-[11px] text-white/40">Lead automation</p>
        </div>
      </div>

      <nav className="flex-1 py-6 space-y-1 px-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-sm transition ${
                active
                  ? "bg-white/12 text-white"
                  : "text-white/55 hover:bg-white/6 hover:text-white"
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

      <div className="p-4 border-t border-white/10">
        <div className="rounded-[12px] bg-white/5 p-3 text-xs text-white/65 mb-3">
          <p className="text-white mb-1 text-sm font-medium">Starter plan</p>
          <p>50 leads / mo - 24/7 AI</p>
          <Link
            href="/billing"
            className="mt-2 inline-block text-xs text-white hover:underline"
          >
            Upgrade to Pro {"›"}
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="w-full rounded-[12px] bg-[#16181a] py-2 text-sm text-white/80 hover:bg-[#1f2124]"
        >
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="dashboard-shell">
      {/* Desktop sidebar */}
      <aside className="sidebar hidden md:flex flex-col">{SidebarContent}</aside>

      {/* Mobile drawer */}
      <div className="md:hidden">
        {drawerOpen && (
          <button
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-40 bg-black/55"
          />
        )}
        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-[80%] max-w-[320px] bg-[#09090d] border-r border-white/10 transition-transform duration-300 ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {SidebarContent}
        </aside>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="topbar">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 hover:bg-white/10"
              aria-label="Open navigation"
            >
              <svg
                className="h-5 w-5 text-white/90"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="relative hidden md:block flex-1 max-w-sm">
              <input
                placeholder="Search"
                className="w-full bg-white/5 border border-white/10 rounded-[12px] pl-9 pr-3 py-2 text-sm outline-none focus:border-white/25"
              />
              <span className="absolute left-3 top-2 text-white/70">
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
          </div>

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => router.push("/leads?new=1")}
              className="btn-ghost"
            >
              New lead
            </button>
            <button
              className="btn-primary"
              onClick={async () => {
                try {
                  const res = await fetch("/api/settings/public-link", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  });
                  const data = await res.json().catch(() => ({}));
                  if (
                    res.ok &&
                    data?.ok &&
                    data.publicSlug &&
                    data.publicCaptureEnabled
                  ) {
                    const base =
                      process.env.NEXT_PUBLIC_APP_URL ||
                      window.location.origin;
                    const url = `${base}/lead/${data.publicSlug}`;
                    await navigator.clipboard?.writeText(url);
                  } else {
                    router.push("/settings/public-link");
                  }
                } catch {
                  router.push("/settings/public-link");
                }
              }}
            >
              Share lead link
            </button>
            <button
              onClick={() => router.push("/settings/ai")}
              className="btn-ghost"
            >
              AI Settings
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="page-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
