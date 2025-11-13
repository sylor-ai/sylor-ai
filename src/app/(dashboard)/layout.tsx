"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { DashboardButton } from "@/components/dashboard-button";
import { getFirebaseAuth } from "@/lib/firebase";

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
  const [planCard, setPlanCard] = useState({
    title: "Starter plan",
    subtitle: "50 leads / mo - 24/7 AI",
    cta: "Upgrade to Pro ›",
    href: "/billing",
  });

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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const auth = getFirebaseAuth();
        const current = auth.currentUser;
        if (!current) return;
        const profile = await api.getUserProfile(current.uid);
        if (!profile?.tenantId) return;
        const plan = await api.getCurrentPlan(profile.tenantId);
        if (!plan || cancelled) return;
        setPlanCard({
          title: `${plan.name} plan`,
          subtitle: plan.features?.[0] ?? "Sylor AI automations active",
          cta: plan.id === "pro" ? "Manage plan ›" : "Upgrade to Pro ›",
          href: "/billing",
        });
      } catch (err) {
        console.warn("[layout] failed to load plan info", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function TenantSwitcher() {
    const router = useRouter();
    const [tenants, setTenants] = useState<
      Array<{ tenantId: string; name: string; role: string; active?: boolean }>
    >([]);
    const [currentTenant, setCurrentTenant] = useState<{
      tenantId: string;
      name: string;
      role: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [csrfToken, setCsrfToken] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
      return () => {
        mountedRef.current = false;
      };
    }, []);

    const fetchTenants = useCallback(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/tenants/list", {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await res.json().catch(() => null);
        if (!mountedRef.current) return;
        if (data?.ok && Array.isArray(data.tenants)) {
          const normalized = data.tenants.map((tenant: any) => ({
            tenantId: tenant.tenantId || tenant.id,
            name: tenant.name || "Workspace",
            role: tenant.role || "member",
            active: !!tenant.active,
          }));
          setTenants(normalized);
          const activeTenant =
            normalized.find((tenant) => tenant.active) || normalized[0] || null;
          setCurrentTenant(activeTenant);
        } else {
          setTenants([]);
          setCurrentTenant(null);
          setError(data?.error || "Unable to load workspaces");
        }
      } catch {
        if (mountedRef.current) {
          setTenants([]);
          setCurrentTenant(null);
          setError("Unable to load workspaces");
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }, []);

    useEffect(() => {
      fetchTenants();
    }, [fetchTenants]);

    useEffect(() => {
      if (!menuOpen) return;
      const handler = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen]);

    const ensureCsrf = useCallback(async () => {
      if (csrfToken) return csrfToken;
      const res = await fetch("/api/auth/csrf");
      const data = await res.json().catch(() => null);
      if (!data?.token) {
        throw new Error("Unable to verify workspace change.");
      }
      if (mountedRef.current) {
        setCsrfToken(data.token);
      }
      return data.token;
    }, [csrfToken]);

    const handleTenantSwitch = async (tenantId: string) => {
      if (tenantId === currentTenant?.tenantId) {
        setMenuOpen(false);
        return;
      }

      try {
        setIsProcessing(true);
        const token = await ensureCsrf();
        const res = await fetch("/api/tenants/switch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": token,
          },
          body: JSON.stringify({ tenantId }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || data?.ok === false) {
          throw new Error(data?.error || "Failed to switch workspace");
        }
        await fetchTenants();
        setMenuOpen(false);
        router.refresh();
      } catch (err) {
        if (mountedRef.current) {
          setError(
            err instanceof Error ? err.message : "Failed to switch workspace"
          );
        }
      } finally {
        if (mountedRef.current) {
          setIsProcessing(false);
        }
      }
    };

    const handleCreateWorkspace = async () => {
      const name = window.prompt("Workspace name");
      if (!name) return;
      const trimmed = name.trim();
      if (!trimmed) return;

      try {
        setIsCreating(true);
        const token = await ensureCsrf();
        const res = await fetch("/api/tenants/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": token,
          },
          body: JSON.stringify({ name: trimmed }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || data?.ok === false) {
          throw new Error(data?.error || "Failed to create workspace");
        }
        await fetchTenants();
        setMenuOpen(false);
        router.refresh();
      } catch (err) {
        if (mountedRef.current) {
          setError(
            err instanceof Error ? err.message : "Failed to create workspace"
          );
        }
      } finally {
        if (mountedRef.current) {
          setIsCreating(false);
        }
      }
    };

    return (
      <div className="relative hidden md:block" ref={containerRef}>
        <button
          type="button"
          disabled={loading}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
        >
          <span>
            {loading
              ? "Loading workspaces..."
              : currentTenant?.name || "Select workspace"}
          </span>
          <svg
            className={`h-3 w-3 transition ${
              menuOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-[#090a12]/95 p-3 shadow-2xl backdrop-blur">
            <div className="max-h-64 overflow-y-auto space-y-1">
              {tenants.map((tenant) => {
                const active = tenant.tenantId === currentTenant?.tenantId;
                return (
                  <button
                    key={tenant.tenantId}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                      active
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/10 text-white/75 hover:border-white/30 hover:bg-white/5"
                    }`}
                    disabled={isProcessing && !active}
                    onClick={() => handleTenantSwitch(tenant.tenantId)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{tenant.name}</span>
                      <span className="text-xs text-white/50">
                        {tenant.role}
                      </span>
                    </div>
                    {active ? (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            <button
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 hover:border-white/40 hover:bg-white/10"
              onClick={handleCreateWorkspace}
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create workspace"}
            </button>
          </div>
        )}
        {error ? (
          <p className="mt-1 text-[11px] text-rose-300">{error}</p>
        ) : null}
      </div>
    );
  }

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
        </div>
        <DashboardButton
          variant="ghost"
          className="w-full bg-[#16181a] text-white/80 hover:bg-[#1f2124] border-white/10"
          onClick={handleLogout}
        >
          Log out
        </DashboardButton>
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
            <div className="hidden md:flex flex-1 max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 focus-within:border-white/20">
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
            <TenantSwitcher />
          </div>

          <div className="hidden md:flex gap-2">
            <DashboardButton
              variant="ghost"
              onClick={() => router.push("/leads?new=1")}
            >
              New lead
            </DashboardButton>
            <DashboardButton
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
            </DashboardButton>
            <DashboardButton
              variant="ghost"
              onClick={() => router.push("/settings/ai")}
            >
              AI Settings
            </DashboardButton>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="page-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
