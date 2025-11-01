"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("UrbanLux Construction");
  const [businessPhone, setBusinessPhone] = useState("+1 (818) 555-1234");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          businessPhone,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setMessage("Saved ✅");
    } catch (err) {
      setMessage("Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold">Settings</h1>
        <p className="text-sm text-white/35">
          Business info, phones, and AI behaviour.
        </p>
      </div>

      {/* BUSINESS CARD */}
      <div className="rounded-[10px] border border-white/5 bg-white/1 p-4 max-w-xl">
        <h2 className="text-sm font-medium mb-3">Business</h2>
        <form onSubmit={handleSave} className="space-y-3">
          {/* Business name */}
          <div>
            <label
              htmlFor="businessName"
              className="text-sm text-white/50 mb-1 block"
            >
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
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          {/* Business phone */}
          <div>
            <label
              htmlFor="businessPhone"
              className="text-sm text-white/50 mb-1 block"
            >
              Business phone
            </label>
            <input
              id="businessPhone"
              name="businessPhone"
              type="tel"
              value={businessPhone}
              onChange={(e) => setBusinessPhone(e.target.value)}
              required
              placeholder="Enter your business phone"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-[10px] bg-white text-black px-4 py-1.5 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {message ? (
            <p className="text-xs text-white/40 mt-1">{message}</p>
          ) : null}
        </form>
      </div>

      {/* AI BEHAVIOUR CARD */}
      <div className="rounded-[10px] border border-white/5 bg-white/1 p-4 max-w-xl">
        <h2 className="text-sm font-medium mb-3">AI behaviour</h2>
        <p className="text-xs text-white/35 mb-2">
          You can add controls here later: auto-confirm, auto-book, crew routing,
          etc.
        </p>
        <button className="rounded-[10px] bg-white/5 px-3 py-1.5 text-sm text-white/80 hover:bg-white/10">
          + Add rule
        </button>
      </div>
    </div>
  );
}
