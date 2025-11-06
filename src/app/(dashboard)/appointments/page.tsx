"use client";

import { useState } from "react";

const MOCK_APPOINTMENTS = [
  {
    title: "Roof inspection - Calabasas",
    when: "Tue, 10:30 AM",
    assignee: "Crew A",
    status: "Confirmed",
  },
  {
    title: "Pool design - Thousand Oaks",
    when: "Tue, 1:00 PM",
    assignee: "Crew B",
    status: "Pending",
  },
  {
    title: "Backyard landscaping - Woodland Hills",
    when: "Wed, 9:00 AM",
    assignee: "Crew C",
    status: "Confirmed",
  },
];

export default function AppointmentsPage() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [assignee, setAssignee] = useState("");

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // here you'd call a real API: await api.createAppointment(...)
    setOpen(false);
    setTitle("");
    setWhen("");
    setAssignee("");
  }

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold">Appointments</h1>
          <p className="text-sm text-white/35">
            Synced with Google Calendar after creation.
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="rounded-[10px] bg-white px-3 py-1.5 text-sm text-black font-medium hover:bg-white/90"
        >
          + Add appointment
        </button>
      </div>

      <div className="rounded-[10px] border border-white/5 bg-white/1 p-4 space-y-3">
        {MOCK_APPOINTMENTS.map((apt) => (
          <div
            key={apt.title}
            className="flex items-center justify-between rounded-[10px] bg-white/3 px-3 py-2"
          >
            <div>
              <p className="text-sm">{apt.title}</p>
              <p className="text-xs text-white/35">{apt.when}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40">{apt.assignee}</span>
              <span
                className={`rounded-[10px] px-2 py-0.5 text-xs ${
                  apt.status === "Confirmed"
                    ? "bg-emerald-500/10 text-emerald-200"
                    : "bg-amber-500/10 text-amber-200"
                }`}
              >
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* add appointment modal */}
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-[14px] border border-white/10 bg-[#0f1011] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">New appointment</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white"
              >
                x
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  Title / Job
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                  placeholder="Roof inspection - Calabasas"
                />
              </div>
              <div>
                <label className="text-sm text-white/50 mb-1 block">When</label>
                <input
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  required
                  className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                  placeholder="2025-11-01 10:30"
                />
                <p className="text-[10px] text-white/25 mt-1">
                  Sylor can later sync this to Google Calendar.
                </p>
              </div>
              <div>
                <label className="text-sm text-white/50 mb-1 block">
                  Assign to
                </label>
                <input
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
                  placeholder="Crew A / John"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-[10px] bg-white text-black py-2 text-sm font-medium hover:bg-white/90"
              >
                Create appointment
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
