// FILE: src/app/(dashboard)/settings/account/account-settings-client.tsx
"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type Profile = {
  id: string;
  name: string;
  email: string;
  defaultTenantId?: string;
};

export default function AccountSettingsClient() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const auth = getFirebaseAuth();
        const user = auth.currentUser;
        if (!user) {
          router.replace("/login?redirectTo=/settings/account");
          return;
        }
        const prof = await api.getUserProfile(user.uid);
        if (!prof || !mounted) return;
        setProfile(prof as any);
        setName((prof as any).name || "");
      } catch (e) {
        if (mounted) setErr("Could not load profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSave = async () => {
    setErr(null);
    try {
      const auth = getFirebaseAuth();
      const current = auth.currentUser;
      if (!current) {
        router.replace("/login?redirectTo=/settings/account");
        return;
      }
      const idToken = await current.getIdToken();
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        setErr("Could not save profile.");
        return;
      }
      setErr(null);
    } catch (e) {
      setErr("Could not save profile.");
    }
  };

  const handleLogout = async () => {
    await api.logout();
    router.replace("/login");
  };

  return (
    <div className="p-6 space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-semibold">Account settings</h1>
        <p className="text-sm text-white/60">Manage your profile and session.</p>
      </div>

      {loading && <div className="text-sm text-white/60">Loading...</div>}
      {err && <div className="text-sm text-red-400">{err}</div>}

      {profile && (
        <div className="space-y-4 max-w-xl">
          <div className="panel space-y-2">
            <label className="text-sm text-white/60">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
            <p className="text-xs text-white/40">Visible across your workspaces.</p>
            <button
              onClick={handleSave}
              className="btn-primary w-fit mt-2 disabled:opacity-50"
              disabled={loading}
            >
              Save
            </button>
          </div>

          <div className="panel space-y-2">
            <label className="text-sm text-white/60">Email</label>
            <p className="text-sm text-white">{profile.email}</p>
            <p className="text-xs text-white/40">Email changes are handled via support.</p>
          </div>

          <div className="panel space-y-2">
            <label className="text-sm text-white/60">Session</label>
            <button onClick={handleLogout} className="btn-ghost w-fit">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
