import { TenantType, UserRole } from "@/types";

export type NavItem = {
  label: string;
  href: string;
  roles?: UserRole[];
  icon?: string;
};

function normalizeTenantType(value?: TenantType | string | null): TenantType | null {
  if (value === "agency" || value === "client" || value === "direct") return value;
  return null;
}

// Keep routes aligned to current app surface; swap to /agency/* routes when they exist.
const AGENCY_NAV: NavItem[] = [
  { label: "Agency Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Clients", href: "/dashboard/clients", icon: "users" },
  { label: "Presets", href: "/settings/ai", roles: ["owner", "admin"], icon: "cog" },
  { label: "Ops", href: "/dashboard/performance", roles: ["owner", "admin"], icon: "trending" },
];

const CLIENT_NAV: NavItem[] = [
  { label: "Inbox", href: "/messages", icon: "chat" },
  { label: "Leads", href: "/leads", icon: "checklist" },
  { label: "Automation", href: "/settings/ai", roles: ["owner", "admin"], icon: "cog" },
  { label: "Install", href: "/settings/public-link", roles: ["owner", "admin"], icon: "cog" },
  { label: "Usage", href: "/dashboard/usage", icon: "gauge" },
  { label: "Billing", href: "/billing", roles: ["owner", "admin"], icon: "card" },
];

export function getNavForTenant(input: { tenantType?: TenantType | string | null; role?: UserRole | string | null }) {
  const type = normalizeTenantType(input.tenantType);
  const role = (input.role || "") as UserRole;
  const base = type === "agency" ? AGENCY_NAV : CLIENT_NAV;
  if (!role) return base;
  return base.filter((item) => !item.roles || item.roles.includes(role));
}

export function getDefaultRouteForTenant(input: { tenantType?: TenantType | string | null }) {
  const type = normalizeTenantType(input.tenantType);
  return type === "agency" ? "/agency/dashboard" : "/dashboard";
}

export function isAgencyPath(pathname: string) {
  return pathname.startsWith("/agency") || pathname.startsWith("/dashboard/clients");
}

export function isClientPath(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/leads") ||
    pathname.startsWith("/messages") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/billing")
  );
}
