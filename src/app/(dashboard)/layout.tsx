"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { api } from "@/lib/api";
import { DashboardButton } from "@/components/dashboard-button";
import { authedFetch } from "@/lib/authed-fetch";
import WorkspaceSwitcher from "@/components/workspace-switcher";
import { getFirebaseAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logLoginToServer } from "@/lib/api";
import { NavItem, getDefaultRouteForTenant, getNavForTenant, isAgencyPath } from "@/lib/navigation";
import { TenantMembership, TenantType } from "@/types";

type PlanCard = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
};

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

type TenantKind = TenantType | null;

function isNavActive(pathname: string, item: NavItem) {
  const isOverview = item.href === "/dashboard";
  return isOverview
    ? pathname === "/dashboard"
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function SidebarIcon({ name }: { name?: string }) {
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
    case "gauge":
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
            <path d="M21 5H3v14h18V5Z" />
            <path d="M7 10h2" />
            <path d="M7 14h5" />
            <path d="M13 10h4" />
            <path d="M13 14h2" />
          </svg>
        </span>
      );
    case "trending":
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
            <path d="M21 7 13.5 14.5 9.5 10.5 3 17" />
            <path d="M14 7h7v7" />
          </svg>
        </span>
      );
    case "user-circle":
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="9" r="3" />
            <path d="M7 19c0-2.2 2.2-4 5-4s5 1.8 5 4" />
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
    case "users":
      return (
        <span className={base}>
          <Users className="h-3.5 w-3.5 text-white/80" strokeWidth={1.6} />
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

type SidebarContentProps = {
  navItems: NavItem[];
  hydrated: boolean;
  tenantTypeLoading: boolean;
  activePath: string;
  planCard: PlanCard | null;
  planCardLoading: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
};

function SidebarContent({
  navItems,
  hydrated,
  tenantTypeLoading,
  activePath,
  planCard,
  planCardLoading,
  onNavigate,
  onLogout,
}: SidebarContentProps) {
  const router = useRouter();
  const skeletonCount = navItems.length || 6;

  return (
    <div className="flex h-full flex-col">
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
        {!hydrated || tenantTypeLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => (
              <button
                key={`skeleton-${idx}`}
                type="button"
                disabled
                className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-sm border border-white/5 bg-white/5 animate-pulse cursor-default"
              >
                <span className="h-4 w-4 rounded-full bg-white/20" />
                <span className="h-3 w-24 rounded bg-white/20" />
              </button>
            ))
          : navItems.map((item) => {
              const active = isNavActive(activePath, item);
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    router.push(item.href);
                    onNavigate?.();
                  }}
                  className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-sm transition border ${
                    active
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-transparent text-white/55 hover:border-white/15 hover:bg-white/5 hover:text-white"
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
          {planCardLoading || !planCard ? (
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
              <div className="h-3 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-white/5 animate-pulse" />
            </div>
          ) : (
            <>
              <p className="text-white mb-1 text-sm font-medium">
                {planCard.title}
              </p>
              <p>{planCard.subtitle}</p>
              <Link
                href={planCard.href}
                className="mt-2 inline-block text-xs text-white hover:underline"
              >
                {planCard.cta}
              </Link>
            </>
          )}
        </div>
        <DashboardButton
          variant="ghost"
          className="w-full bg-[#16181a] text-white/80 hover:bg-[#1f2124] border-white/10"
          onClick={onLogout}
        >
          Log out
        </DashboardButton>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHydrated();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [planCard, setPlanCard] = useState<PlanCard | null>(null);
  const [planCardLoading, setPlanCardLoading] = useState(true);
  const [currentTenantType, setCurrentTenantType] = useState<TenantKind>(null);
  const [tenantTypeLoading, setTenantTypeLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [authedUser, setAuthedUser] = useState<any>(null);
  const [sessionSynced, setSessionSynced] = useState(false);
  const [currentRole, setCurrentRole] = useState<TenantMembership["role"] | null>(null);

  const updateTenantType = useCallback(
    (value: TenantKind) => {
      setCurrentTenantType(value);
    },
    []
  );

  const updateTenantRole = useCallback((value: TenantMembership["role"] | null) => {
    setCurrentRole(value);
  }, []);

  async function handleLogout() {
    try {
      await api.logout();
    } finally {
      router.push("/");
    }
  }

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (cancelled) return;
      setAuthedUser(user);
      setAuthReady(true);
      if (!user) {
        router.replace("/login");
        return;
      }
      // Refresh session cookie when Firebase auth is present but server cookie may be expired.
      try {
        const idToken = await user.getIdToken();
        await logLoginToServer(idToken);
        setSessionSynced(true);
      } catch (err) {
        console.warn("[layout] failed to sync session cookie", err);
      }
      try {
        const profile = await api.getUserProfile(user.uid);
        if (!profile?.tenantId) return;
        const tenant = await api.getTenant(profile.tenantId);
        if (cancelled) return;
        const hasActive = !!tenant?.hasActiveSubscription && !!tenant?.planId;
        if (!hasActive) {
          setPlanCard({
            title: "Trial mode",
            subtitle: "Pick a plan to unlock full SMS volume.",
            cta: "Choose a plan ->",
            href: "/billing",
          });
          setPlanCardLoading(false);
          return;
        }
        const plan = await api.getCurrentPlan(profile.tenantId);
        if (!plan || cancelled) return;
        const isScale = plan.id === "agency_scale";
        setPlanCard({
          title: `${plan.name}`,
          subtitle:
            plan.features?.[0] ??
            (plan.id === "agency_core"
              ? "20,000 SMS included"
              : "50,000 SMS included"),
          cta: isScale ? "Manage plan ->" : "Upgrade to Scale ->",
          href: "/billing",
        });
        setPlanCardLoading(false);
      } catch (err) {
        console.warn("[layout] failed to load plan info", err);
        setPlanCard({
          title: "Billing",
          subtitle: "Manage your subscription and invoices.",
          cta: "Open billing ->",
          href: "/billing",
        });
        setPlanCardLoading(false);
      }
    });
    return () => {
      cancelled = true;
      unsub();
    };
  }, [router]);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authReady) return;
      if (!authedUser) {
        router.replace("/login");
        return;
      }
      try {
        const res = await authedFetch("/api/me/workspaces", { cache: "no-store" });
        const json = await res.json().catch(() => ({} as any));
        const activeWs =
          json?.workspaces?.find((w: any) => w.tenantId === json?.defaultTenantId) ||
          json?.workspaces?.[0] ||
          null;
        if (active) {
          const resolvedType =
            activeWs?.type === "agency" || activeWs?.type === "client"
              ? activeWs.type
              : null;
          updateTenantType(resolvedType);
          updateTenantRole((activeWs?.role as TenantMembership["role"]) || null);
        }
      } catch (err) {
        if (active) {
          updateTenantType(null);
          updateTenantRole(null);
          console.warn("[layout] unable to load workspace type", err);
          // If we can't load workspaces (likely expired session), send to login.
          router.replace("/login");
        }
      } finally {
        if (active) {
          setTenantTypeLoading(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [authReady, authedUser, router, sessionSynced]);

  const navItems = useMemo(
    () => getNavForTenant({ tenantType: currentTenantType, role: currentRole }),
    [currentTenantType, currentRole]
  );

  const activeNav =
    navItems.find((item) => isNavActive(pathname, item))?.label || "Dashboard";

  useEffect(() => {
    if (tenantTypeLoading) return;
    if (currentTenantType !== "agency" && isAgencyPath(pathname)) {
      const fallback = getDefaultRouteForTenant({ tenantType: currentTenantType });
      router.replace(fallback);
    }
  }, [currentTenantType, pathname, router, tenantTypeLoading]);

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#050509] text-white">
      <div className="grid min-h-full lg:grid-cols-[16rem,1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:w-64 lg:border-r lg:border-white/5 bg-[#09090d]">
          <SidebarContent
            navItems={navItems}
            hydrated={hydrated}
            tenantTypeLoading={tenantTypeLoading}
            activePath={pathname}
            planCard={planCard}
            planCardLoading={planCardLoading}
            onLogout={handleLogout}
          />
        </aside>

        {/* Main content */}
        <div className="grid grid-rows-[auto,1fr] min-h-full lg:h-screen lg:overflow-hidden">
          <header className="sticky top-0 z-40 border-b border-white/5 bg-[#050509]/95 backdrop-blur">
            <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:px-10 xl:px-12 max-w-7xl mx-auto w-full">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-3">
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
                    aria-label="Open navigation"
                  >
                    <svg
                      className="h-5 w-5"
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
                  <div className="flex-1 text-sm font-medium text-white/80 md:hidden">
                    {activeNav}
                  </div>
                  <div className="hidden md:flex flex-1 max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 focus-within:border-white/20">
                    <svg
                      className="h-4 w-4 text-white/60"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="5" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                      placeholder="Search"
                      className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/40 outline-none border-none p-0"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="lg:hidden">
                    <WorkspaceSwitcher compact />
                  </div>
                  <div className="hidden lg:block">
                    <WorkspaceSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="px-4 pb-10 pt-4 sm:px-6 lg:px-10 xl:px-12 lg:pt-6 max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-full bg-[#09090d] border-r border-white/10 shadow-2xl transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <SidebarContent
            navItems={navItems}
            hydrated={hydrated}
            tenantTypeLoading={tenantTypeLoading}
            activePath={pathname}
            planCard={planCard}
            planCardLoading={planCardLoading}
            onLogout={handleLogout}
            onNavigate={() => setMobileOpen(false)}
          />
        </aside>
      </div>
    </div>
  );
}
