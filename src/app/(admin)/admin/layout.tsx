import type { ReactNode } from "react";
import "@/app/globals.css";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const nav = [
    { label: "Tenants", href: "/admin" },
    { label: "Users", href: "/admin/users" },
  ];

  return (
    <div className="min-h-screen bg-[#050509] text-white">
      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Sylor AI
            </p>
            <h1 className="text-2xl font-semibold">Admin Console</h1>
          </div>
          <nav className="flex items-center gap-2 text-sm text-white/60">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/40 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
