// FILE: src/app/(dashboard)/settings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import { api } from "@/lib/api";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Public link states
  const [pubLoading, setPubLoading] = useState(true);
  const [pubSaving, setPubSaving] = useState(false);
  const [publicSlug, setPublicSlug] = useState("");
  const [publicEnabled, setPublicEnabled] = useState(false);
  const [pubErr, setPubErr] = useState("");
  const [pubSaved, setPubSaved] = useState(false);
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ?? (typeof window !== "undefined" ? window.location.origin : "");

  // ---- 1) Load current profile after auth is ready
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, async (current) => {
      if (!current) {
        setMessage("You are not logged in.");
        setLoading(false);
        return;
      }
      try {
        const idToken = await current.getIdToken();
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${idToken}` },
        });

        if (!res.ok) {
          setMessage("Could not load profile.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        const tenant = data?.tenant || {};
        setBusinessName(tenant.businessName ?? "");
        setBusinessPhone(tenant.businessPhone ?? "");
      } catch {
        setMessage("Could not load profile.");
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // ---- 1b) Load public link settings
  useEffect(() => {
    (async () => {
      try {
        setPubLoading(true);
        const res = await api.getPublicLinkSettings();
        if (res.ok) {
          setPublicSlug(res.publicSlug ?? "");
          setPublicEnabled(res.publicCaptureEnabled ?? false);
        } else {
          setPubErr("Could not load public link settings.");
        }
      } catch {
        setPubErr("Could not load public link settings.");
      } finally {
        setPubLoading(false);
      }
    })();
  }, []);

  // ---- 2) Save business profile
  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const auth = getFirebaseAuth();
      const current = auth.currentUser;
      if (!current) {
        setMessage("You are not logged in.");
        setSaving(false);
        return;
      }
      const idToken = await current.getIdToken();
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ businessName, businessPhone }),
      });

      if (!res.ok) throw new Error("Failed");
      setMessage("Saved [done]");
    } catch {
      setMessage("Could not save.");
    } finally {
      setSaving(false);
    }
  }

  // ---- 2b) Save public link
  async function handleSavePublic(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPubErr("");
    setPubSaved(false);
    if (publicEnabled && !publicSlug.trim()) {
      setPubErr("Slug is required when link is enabled.");
      return;
    }
    setPubSaving(true);
    try {
      const res = await api.savePublicLinkSettings({
        publicSlug,
        publicCaptureEnabled: publicEnabled,
      });
      if (!res.ok) {
        if (res.error === "slug-taken") setPubErr("That link is already taken.");
        else if (res.error === "invalid-slug") setPubErr("Use only letters, numbers and dashes.");
        else setPubErr("Could not save public link.");
        setPubSaving(false);
        return;
      }
      setPublicSlug(res.publicSlug ?? "");
      setPublicEnabled(res.publicCaptureEnabled ?? false);
      setPubSaved(true);
    } catch {
      setPubErr("Could not save public link.");
    } finally {
      setPubSaving(false);
    }
  }

  // ---- 3) Delete account
  async function handleDeleteAccount() {
    if (!confirm("Delete your account permanently? This cannot be undone.")) {
      return;
    }
    try {
      const auth = getFirebaseAuth();
      const current = auth.currentUser;
      if (!current) {
        alert("You are not logged in.");
        return;
      }
      const idToken = await current.getIdToken();
      const res = await fetch("/api/auth/delete-account", {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        alert(`Could not delete account${data?.error ? `: ${data.error}` : ""}`);
        return;
      }
      // Best-effort local cleanup
      await current.delete().catch(() => {});
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Could not delete account.");
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-white/40">
          Business info, phones, AI behaviour, and account.
        </p>
      </div>

      {/* Business card */}
      <div className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur p-5 max-w-xl">
        <h2 className="text-sm font-medium mb-3">Business</h2>
        <form onSubmit={handleSave} className="space-y-3" aria-label="Business settings">
          <div>
            <label htmlFor="businessName" className="text-xs text-white/50 mb-1 block">
              Business name
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              placeholder="Enter your business name"
              disabled={loading}
              className="w-full rounded-xl bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40 disabled:opacity-60"
            />
          </div>

          <div>
            <label htmlFor="businessPhone" className="text-xs text-white/50 mb-1 block">
              Business phone
            </label>
            <input
              id="businessPhone"
              name="businessPhone"
              type="tel"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              required
              placeholder="+1 (555) 000-0000"
              disabled={loading}
              className="w-full rounded-xl bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40 disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            className="rounded-xl bg-white text-black px-4 py-1.5 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {message ? (
            <p className="text-xs text-white/40 mt-1" role="status">
              {message}
            </p>
          ) : null}
        </form>
      </div>

      {/* AI card */}
      <div className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur p-5 max-w-xl">
        <h2 className="text-sm font-medium mb-3">AI behaviour</h2>
        <p className="text-xs text-white/35 mb-2">
          Add rules for auto-confirm, auto-book, routing etc.
        </p>
        <button
          type="button"
          className="rounded-xl bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10"
        >
          + Add rule
        </button>
      </div>

      {/* Public lead link */}
      <div className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur p-5 max-w-xl">
        <h2 className="text-sm font-medium mb-1">Public lead link</h2>
        <p className="text-xs text-white/40 mb-3">
          Share a simple link where homeowners can request a quote. Replies flow into Messages.
        </p>

        <form onSubmit={handleSavePublic} className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={publicEnabled}
              onChange={(e) => setPublicEnabled(e.target.checked)}
              className="h-4 w-4"
              disabled={pubLoading}
            />
            Enable public lead link
          </label>

          <div>
            <label className="text-xs text-white/50 mb-1 block">Link slug</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">/lead/</span>
              <input
                value={publicSlug}
                onChange={(e) => setPublicSlug(e.target.value)}
                disabled={!publicEnabled || pubLoading}
                placeholder="your-business-name"
                className="flex-1 rounded-xl bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40 disabled:opacity-40"
              />
            </div>
            <p className="mt-1 text-[10px] text-white/30">
              Letters, numbers and dashes only. Must be unique.
            </p>
          </div>

          {publicEnabled && publicSlug && (
            <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 flex items-center justify-between gap-2">
              <div className="text-xs break-all">
                <span className="text-white/50">Your link:</span>{" "}
                <span className="text-white">{`${baseUrl || ""}/lead/${publicSlug}`}</span>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(`${baseUrl || ""}/lead/${publicSlug}`).catch(() => {})}
                className="text-xs px-2 py-1 rounded-[8px] bg-white text-black hover:bg-white/90"
              >
                Copy
              </button>
            </div>
          )}

          {pubErr ? <p className="text-xs text-red-400">{pubErr}</p> : null}
          {pubSaved ? (
            <p className="text-[11px] text-emerald-400">Saved. Your lead link is ready.</p>
          ) : null}

          <button
            type="submit"
            disabled={pubSaving || pubLoading}
            className="rounded-xl bg-white text-black px-4 py-1.5 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {pubSaving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl border border-red-500/20 bg-red-950/30 p-5 max-w-xl">
        <h2 className="text-sm font-medium mb-2 text-red-200">Danger zone</h2>
        <p className="text-xs text-red-100/70 mb-3">
          Permanently delete this account and its tenant. This cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="rounded-xl bg-red-500/90 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-600"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}
