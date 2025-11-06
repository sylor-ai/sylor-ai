"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { api } from "@/lib/api";

type Metrics = {
  leadsCount: number;
  conversationsCount: number;
  appointmentsCount: number;
  recentMessages: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [metrics, setMetrics] = useState<Metrics>({
    leadsCount: 0,
    conversationsCount: 0,
    appointmentsCount: 0,
    recentMessages: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const auth = getFirebaseAuth();
        const current = auth.currentUser;
        if (!current) {
          router.replace("/login");
          return;
        }

        const user = await api.getUserProfile(current.uid);
        if (!user) {
          router.replace("/signup");
          return;
        }

        const tenant = await api.getTenant(user.tenantId);
        if (!tenant?.businessName || !tenant?.businessPhone) {
          router.replace("/onboarding");
          return;
        }

        try {
          const token = await auth.currentUser?.getIdToken();
          const res = await fetch("/api/metrics", {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          });
          const data = await res.json();
          if (res.ok && data?.ok !== false) {
            setMetrics({
              leadsCount: data.leadsCount ?? 0,
              conversationsCount: data.conversationsCount ?? 0,
              appointmentsCount: data.appointmentsCount ?? 0,
              recentMessages: data.recentMessages ?? 0,
            });
          }
        } catch {
          // best-effort metrics fetch
        }
      } finally {
        setChecking(false);
      }
    })();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-white/60">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-white/60">Your home services command center.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => router.push("/leads?new=1")} className="btn-primary">
            Add lead
          </button>
          <button onClick={() => router.push("/messages")} className="btn-ghost">
            View messages
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card">
          <p className="text-xs text-white/60">Leads</p>
          <p className="mt-3 text-3xl font-semibold">{metrics.leadsCount}</p>
          <p className="mt-1 text-xs text-white/45">Active across all sources</p>
        </div>
        <div className="card">
          <p className="text-xs text-white/60">Conversations</p>
          <p className="mt-3 text-3xl font-semibold">{metrics.conversationsCount}</p>
          <p className="mt-1 text-xs text-white/45">Waiting in your inbox</p>
        </div>
        <div className="card">
          <p className="text-xs text-white/60">Appointments</p>
          <p className="mt-3 text-3xl font-semibold">{metrics.appointmentsCount}</p>
          <p className="mt-1 text-xs text-white/45">Booked this week</p>
        </div>
        <div className="card">
          <p className="text-xs text-white/60">Messages (7d)</p>
          <p className="mt-3 text-3xl font-semibold">{metrics.recentMessages}</p>
          <p className="mt-1 text-xs text-white/45">AI replies + human follow-up</p>
        </div>
      </div>

      {/* Secondary sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Recent activity</p>
            <button className="text-xs text-white/60 hover:text-white">View all</button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="chip">Lead</span>
              <p className="text-white/80">New lead captured from public lead link.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="chip">AI</span>
              <p className="text-white/80">
                Sylor AI auto-replied to <strong>Roof repair - Calabasas</strong>.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="chip">Billing</span>
              <p className="text-white/80">Subscription upgraded to Pro.</p>
            </div>
          </div>
        </div>

        <div className="panel space-y-3">
          <p className="text-sm font-medium">Launch checklist</p>
          <ul className="text-sm text-white/80 space-y-2 list-disc list-inside">
            <li>Confirm your business profile in Settings.</li>
            <li>Share your public lead link with customers.</li>
            <li>Send a test conversation to ensure AI responses.</li>
          </ul>
          <button onClick={() => router.push("/settings/public-link")} className="btn-ghost self-start">
            Manage public link
          </button>
        </div>
      </div>
    </div>
  );
}
