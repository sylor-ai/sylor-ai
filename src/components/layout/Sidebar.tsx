"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ListTodo,
  CalendarDays,
  MessageSquare,
  CreditCard,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Leads", href: "/leads", icon: ListTodo },
  { label: "Appointments", href: "/appointments", icon: CalendarDays },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0a0a0b] text-white border-r border-white/5 flex flex-col">
      {/* top brand */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center">
          {/* if you have /logo.png, use <img src="/logo.png" /> instead */}
          <span className="text-black font-semibold text-lg">S</span>
        </div>
        <div>
          <p className="font-semibold leading-tight">Sylor.ai</p>
          <p className="text-xs text-white/35">Lead automation</p>
        </div>
      </div>

      {/* nav */}
      <nav className="flex-1 pt-4 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all ${
                active
                  ? "bg-white/5 text-white"
                  : "text-white/45 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={1.7}
                className={active ? "text-white" : "text-white/65"}
              />
              <span className="text-sm font-medium">{item.label}</span>
              {active ? (
                <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
