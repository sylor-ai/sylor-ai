"use client";

import { useEffect, useState } from "react";

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  defaultTenantName: string | null;
  lastLoginAt: string | null;
};

const roleOptions = ["member", "owner", "viewer", "admin", "agent", "super_admin"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionUser, setActionUser] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/users", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || "Failed to load users");
        }
        setUsers(data.users || []);
      } catch (err: any) {
        setError(err?.message || "Unable to load users.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (value?: string | null) => {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  async function updateRole(uid: string, role: string) {
    setActionUser(uid);
    try {
      const res = await fetch(`/api/admin/users/${uid}/role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to update role");
      }
      setUsers((prev) =>
        prev.map((user) => (user.id === uid ? { ...user, role } : user))
      );
    } catch (err: any) {
      alert(err?.message || "Unable to update role.");
    } finally {
      setActionUser(null);
    }
  }

  async function triggerAction(uid: string, action: "force-logout" | "force-password-reset") {
    setActionUser(uid);
    try {
      const res = await fetch(`/api/admin/users/${uid}/${action}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to trigger action");
      }
      alert(
        action === "force-logout"
          ? "User will be logged out on next request."
          : "Password reset email triggered."
      );
    } catch (err: any) {
      alert(err?.message || "Action failed.");
    } finally {
      setActionUser(null);
    }
  }

  if (loading) {
    return <p className="text-sm text-white/60">Loading users…</p>;
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Users</h2>
        <p className="text-sm text-white/60">
          Manage user roles, force logouts, and trigger password resets.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5 text-white/60">
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Primary tenant</th>
              <th className="px-4 py-2 text-left">Last login</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3">
                  <div className="font-medium text-white">
                    {user.name || user.email}
                  </div>
                  <div className="text-xs text-white/45">{user.email}</div>
                </td>
                <td className="px-4 py-3 text-white/80">
                  <select
                    value={user.role}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80"
                    disabled={actionUser === user.id}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-white/70">
                  {user.defaultTenantName || "—"}
                </td>
                <td className="px-4 py-3 text-xs text-white/60">
                  {formatDate(user.lastLoginAt)}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => triggerAction(user.id, "force-logout")}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                    disabled={actionUser === user.id}
                  >
                    Force logout
                  </button>
                  <button
                    onClick={() =>
                      triggerAction(user.id, "force-password-reset")
                    }
                    className="rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs text-purple-200 transition hover:bg-purple-500/20"
                    disabled={actionUser === user.id}
                  >
                    Reset password
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-sm text-white/50"
                  colSpan={5}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
