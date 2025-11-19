"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authedFetch } from "@/lib/authed-fetch";
import { useCurrentUser } from "@/hooks/use-current-user";

type Workspace = {
  tenantId: string;
  name: string;
  type: string;
  role: string;
  isAgency?: boolean;
};

type Props = {
  compact?: boolean;
};

export default function WorkspaceSwitcher({ compact = false }: Props) {
  const router = useRouter();
  const { currentUser, loading: userLoading } = useCurrentUser();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (userLoading) return;
    if (!currentUser) {
      router.push("/login");
      return;
    }

    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await authedFetch("/api/me/workspaces", { cache: "no-store" });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        const json = await res.json().catch(() => ({}));
        if (!json?.ok) throw new Error(json?.error || "Failed to load workspaces");
        if (!mounted) return;
        setWorkspaces(json.workspaces || []);
        setCurrent(json.defaultTenantId || json.workspaces?.[0]?.tenantId || null);
      } catch (err: any) {
        if (mounted) setError(err.message || "Workspace error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [userLoading, currentUser, router]);

  const handleSwitch = async (tenantId: string) => {
    if (!tenantId || tenantId === current) return;
    try {
      await authedFetch("/api/me/switch-tenant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantId }),
      });
      window.location.reload();
    } catch (err: any) {
      console.error("Workspace switch failed", err);
      setError(err.message || "Switch failed");
    }
  };

  useEffect(() => {
    if (!compact) return;
    const handler = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [compact]);

  if (compact) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          aria-label="Switch workspace"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
          disabled={loading && !workspaces.length}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18" />
            <path d="M7 16h10" />
            <path d="M4 8h16" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-[#08080b] p-2 shadow-2xl">
            {error ? (
              <div className="text-xs text-rose-300 px-2 py-1">
                Workspace error
              </div>
            ) : loading && !workspaces.length ? (
              <div className="text-xs text-white/60 px-2 py-1">
                Loading...
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-1">
                {workspaces.map((ws) => {
                  const active = ws.tenantId === current;
                  return (
                    <button
                      key={ws.tenantId}
                      onClick={() => {
                        setMenuOpen(false);
                        handleSwitch(ws.tenantId);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      <span>{ws.name}</span>
                      {active ? (
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <button className="rounded-md border border-red-300/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
        Workspace error
      </button>
    );
  }

  if (!workspaces.length) {
    return (
      <div className="text-xs text-white/60">
        {loading
          ? "Loading workspaces..."
          : "No workspaces found for this user. Your account may be misconfigured."}
      </div>
    );
  }

  const currentWs = workspaces.find((w) => w.tenantId === current) || workspaces[0];

  if (workspaces.length === 1) {
    return (
      <div className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80">
        {currentWs.name} {currentWs.type === "agency" ? "(Agency)" : "(Client)"}
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={current || currentWs.tenantId}
        onChange={(e) => handleSwitch(e.target.value)}
        className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/80 focus:border-white/30"
      >
        {workspaces.map((w) => (
          <option key={w.tenantId} value={w.tenantId} className="text-black">
            {w.name} {w.type === "agency" ? "(Agency)" : w.type === "client" ? "(Client)" : "(Direct)"}
          </option>
        ))}
      </select>
    </div>
  );
}
