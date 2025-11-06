"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useState } from "react";

export default function LeadCaptureClient() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";
  const searchParams = useSearchParams();
  const prefillService = searchParams.get("service") ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(prefillService);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/public/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, phone, message }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(
          data?.error === "invalid-slug"
            ? "This link is no longer active."
            : "Could not submit your request. Please try again."
        );
        setLoading(false);
        return;
      }

      setDone(true);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setErr("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold mb-2">Thanks — we’ve got your request</h1>
          <p className="text-sm text-white/60">You’ll receive a text message shortly from our Sylor AI assistant.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[18px] border border-white/10 bg-[#0f1011]/80 p-6 shadow-xl">
        <div className="mb-4">
          <p className="text-xs text-white/40 mb-1">Powered by Sylor AI</p>
          <h1 className="text-2xl font-semibold">Request a quote</h1>
          <p className="text-sm text-white/55 mt-1">Leave your details and we’ll text you back.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-white/60 mb-1 block">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1 block">Mobile phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+1 (555) 123-4567"
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            />
            <p className="mt-1 text-[10px] text-white/30">You’ll receive SMS updates about this request. Reply STOP to opt out.</p>
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1 block">What do you need help with?</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Roof leak over the kitchen, 2-story house..."
              className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40 resize-none"
            />
          </div>

          {err ? (
            <p className="text-xs text-red-400 bg-red-400/5 rounded-[8px] px-3 py-2">{err}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send request →"}
          </button>
        </form>
      </div>
    </div>
  );
}

