"use client";

import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/authed-fetch";

export default function PublicLinkClient() {
  const [slug, setSlug] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    (typeof window !== "undefined" ? window.location.origin : "");

  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await authedFetch("/api/settings/public-link", {
          method: "GET",
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({} as any));
        if (!cancel) {
          setSlug(data.publicSlug ?? "");
          setEnabled(data.publicCaptureEnabled ?? false);
          setBusinessName(data.businessName ?? "");
        }
      } catch (e: any) {
        console.error(e);
        if (!cancel) {
          setErr(
            e?.message?.includes("401")
              ? "Please sign in again."
              : "Could not load settings."
          );
        }
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setSaved(false);

    if (enabled && !slug.trim()) {
      setErr("Slug is required when the link is enabled.");
      return;
    }

    setSaving(true);
    try {
      const res = await authedFetch("/api/settings/public-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publicSlug: slug,
          publicCaptureEnabled: enabled,
          businessName,
        }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (!data.ok) {
        if (data.error === "slug-taken")
          setErr("That link is already taken. Please choose another.");
        else if (data.error === "invalid-slug")
          setErr("Please use only letters, numbers and dashes.");
        else setErr("Could not save settings.");
        setSaving(false);
        return;
      }
      setSlug(data.publicSlug ?? "");
      setEnabled(data.publicCaptureEnabled ?? false);
      setSaved(true);
      setSaving(false);
    } catch (e: any) {
      console.error(e);
      setErr(e?.message || "Could not save settings.");
      setSaving(false);
    }
  }

  const fullUrl = enabled && slug && baseUrl ? `${baseUrl}/lead/${slug}` : "";

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="w-full max-w-xl mx-auto rounded-[18px] border border-white/10 bg-[#0f1011]/70 p-6 shadow-xl text-sm text-white/70">
          Loading public link...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="w-full max-w-xl mx-auto rounded-[18px] border border-white/10 bg-[#0f1011]/70 p-6 shadow-xl">
        <div className="mb-4">
          <p className="text-xs text-white/40 mb-1">Settings</p>
          <h1 className="text-2xl font-semibold">Public lead link</h1>
          <p className="text-sm text-white/55 mt-1">
            Share a simple link where homeowners can request a quote. Sylor AI
            will text them from your Twilio number once they submit.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="h-4 w-4"
            />
            Enable public lead link
          </label>

          <div>
            <label className="text-sm text-white/60 mb-1 block">Link slug</label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">/lead/</span>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                disabled={!enabled}
                placeholder={
                  businessName
                    ? businessName
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "-")
                        .replace(/-+/g, "-")
                        .replace(/^-|-$/g, "")
                    : "your-business-name"
                }
                className="flex-1 rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40 disabled:opacity-40"
              />
            </div>
            <p className="mt-1 text-[10px] text-white/30">
              Letters, numbers and dashes only. This must be unique across all
              Sylor AI customers.
            </p>
          </div>

          {fullUrl ? (
            <div className="rounded-[12px] bg-white/5 border border-white/10 px-3 py-2 flex items-center justify-between gap-2">
              <div className="text-xs break-all">
                <span className="text-white/50">Your link:</span>{" "}
                <span className="text-white">{fullUrl}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  navigator.clipboard?.writeText(fullUrl).catch(() => {})
                }
                className="text-xs px-2 py-1 rounded-[8px] bg-white text-black hover:bg-white/90"
              >
                Copy
              </button>
            </div>
          ) : (
            <p className="text-[11px] text-white/30">
              Once enabled, you&apos;ll see your shareable link here.
            </p>
          )}

          {err ? (
            <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">
              {err}
            </p>
          ) : null}

          {saved ? (
            <p className="text-[11px] text-emerald-400 bg-emerald-400/5 rounded-[8px] px-3 py-2">
              Saved. Your lead link is ready to share.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-white/30">
          When someone fills out this form, Sylor AI creates a lead, starts a
          conversation and sends them a welcome SMS. Replies go straight into
          your Messages inbox.
        </p>
      </div>
    </div>
  );
}
