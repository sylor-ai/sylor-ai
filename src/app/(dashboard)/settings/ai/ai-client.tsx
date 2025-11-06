"use client";

import { useEffect, useState } from "react";
import { getFirebaseAuth } from "@/lib/firebase";

type AiProfile = {
  enabled: boolean;
  businessName: string;
  services: string;
  serviceArea: string;
  tone: "friendly" | "direct" | "luxury" | "casual";
  bookingStyle: "phone_call" | "site_visit" | "video_call";
  bookingPhone: string;
  hours: string;
  extraNotes: string;
};

export default function AiSettingsClient() {
  const [profile, setProfile] = useState<AiProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getFirebaseAuth().currentUser?.getIdToken();
        const res = await fetch("/api/ai/profile", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const json = await res.json();
        if (!res.ok || json?.ok === false) {
          throw new Error(json?.error || "Failed to load AI profile");
        }
        setProfile(json.profile as AiProfile);
      } catch (e: any) {
        setError(e?.message || "Failed to load AI profile");
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const token = await getFirebaseAuth().currentUser?.getIdToken();
      const res = await fetch("/api/ai/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(profile),
      });
      const json = await res.json();
      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || "Failed to save settings");
      }
      setProfile(json.profile as AiProfile);
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  function updateProfile<K extends keyof AiProfile>(key: K, value: AiProfile[K]) {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  if (!profile) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-4">
        <div className="panel max-w-md text-sm text-white/70">
          {error ? `Error: ${error}` : "Loading AI settings..."}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="chip">AI Assistant</p>
            <h1 className="mt-2">Sylor AI SMS Assistant</h1>
            <p className="mt-2 text-sm text-white/60">
              Tailor how Sylor AI greets new leads, books appointments, and hands conversations back to you.
            </p>
          </div>
          <div className="hidden text-right text-xs text-white/50 md:flex md:flex-col md:items-end">
            <span>Connected through Twilio</span>
            <span className="mt-1 text-white/70">Realtime SMS automations</span>
          </div>
        </div>

        <div className="panel flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/85">Automation status</p>
            <p className="text-xs text-white/55">
              {profile.enabled ? "Sylor AI is replying to incoming leads automatically." : "AI replies are paused."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => updateProfile("enabled", !profile.enabled)}
            aria-pressed={profile.enabled}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
              profile.enabled ? "bg-white" : "bg-white/15"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-[#050509] transition-transform ${
                profile.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <section className="panel space-y-5">
          <header>
            <h2>Business identity</h2>
            <p className="mt-2 text-sm text-white/60">
              Give the assistant the basics about your company so replies feel on-brand.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>Business name (optional)</span>
              <input
                className="w-full"
                value={profile.businessName}
                onChange={(e) => updateProfile("businessName", e.target.value)}
                placeholder="Sylor Roofing Co."
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>Service area</span>
              <input
                className="w-full"
                value={profile.serviceArea}
                onChange={(e) => updateProfile("serviceArea", e.target.value)}
                placeholder="Los Angeles & San Fernando Valley"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span>Services (comma separated)</span>
            <textarea
              className="w-full min-h-[120px]"
              value={profile.services}
              onChange={(e) => updateProfile("services", e.target.value)}
              placeholder="roofing, siding, gutters"
            />
          </label>
        </section>

        <section className="panel space-y-5">
          <header>
            <h2>Messaging style</h2>
            <p className="mt-2 text-sm text-white/60">
              Choose the tone and how you want Sylor to book qualified leads for you.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>Brand tone</span>
              <select
                className="w-full"
                value={profile.tone}
                onChange={(e) => updateProfile("tone", e.target.value as AiProfile["tone"])}
              >
                <option value="friendly">Friendly</option>
                <option value="direct">Direct</option>
                <option value="luxury">Luxury</option>
                <option value="casual">Casual</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>Booking style</span>
              <select
                className="w-full"
                value={profile.bookingStyle}
                onChange={(e) => updateProfile("bookingStyle", e.target.value as AiProfile["bookingStyle"])}
              >
                <option value="phone_call">Phone call</option>
                <option value="site_visit">On-site visit</option>
                <option value="video_call">Video call</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>Booking phone</span>
              <input
                className="w-full"
                value={profile.bookingPhone}
                onChange={(e) => updateProfile("bookingPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              <span>Hours</span>
              <input
                className="w-full"
                value={profile.hours}
                onChange={(e) => updateProfile("hours", e.target.value)}
                placeholder="Mon-Fri 8am-6pm"
              />
            </label>
          </div>
        </section>

        <section className="panel space-y-5">
          <header>
            <h2>Additional guidance</h2>
            <p className="mt-2 text-sm text-white/60">
              Tell Sylor about warranties, pricing rules, escalation steps, or any hand-off instructions.
            </p>
          </header>
          <label className="flex flex-col gap-2 text-sm text-white/70">
            <span>Notes for Sylor AI</span>
            <textarea
              className="w-full min-h-[140px]"
              value={profile.extraNotes}
              onChange={(e) => updateProfile("extraNotes", e.target.value)}
              placeholder="Mention lifetime warranty, send HVAC jobs to team inbox, ask zip for solar leads..."
            />
          </label>
        </section>

        {error && (
          <div className="panel border-red-500/40 bg-red-500/10 text-sm text-red-200">
            {error}
          </div>
        )}
        {saved && !error && (
          <div className="panel border-emerald-500/40 bg-emerald-500/10 text-sm text-emerald-200">
            Settings saved. Sylor AI will use the new profile on the next incoming lead.
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            Sylor AI only replies over SMS using your connected Twilio number. Update your phone routing in Settings.
          </p>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
