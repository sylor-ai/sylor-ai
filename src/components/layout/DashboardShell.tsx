"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leads", label: "Leads" },
  { href: "/appointments", label: "Appointments" },
  { href: "/messages", label: "Messages" },
  { href: "/billing", label: "Billing" },
  { href: "/settings", label: "Settings" },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-dark-bg">
      {/* SIDEBAR */}
      <aside className="w-60 border-r border-slate-800 bg-dark-card/30 backdrop-blur-md">
        <div className="px-5 py-6">
          <p className="text-lg font-bold tracking-tight">Sylor.ai</p>
          <p className="text-xs text-slate-500 mt-1">
            Lead → SMS → Booking
          </p>
        </div>
        <nav className="mt-4 flex flex-col gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 text-sm transition ${
                  active
                    ? "bg-brand-primary/20 text-white border-r-2 border-brand-primary"
                    : "text-slate-300 hover:bg-slate-800/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 min-h-screen p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
