"use client";

const THREADS = [
  {
    from: "Kitchen remodel - Encino",
    last: "Yes Tuesday 10:30 is good.",
    time: "2m ago",
  },
  {
    from: "Pool build - Thousand Oaks",
    last: "Can you send a quote?",
    time: "8m ago",
  },
  {
    from: "Roof repair - Calabasas",
    last: "Thanks!",
    time: "12m ago",
  },
];

export default function MessagesPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[280px,1fr] h-[calc(100vh-4rem)]">
      {/* left list */}
      <div className="rounded-[10px] border border-white/5 bg-white/1 p-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Conversations</p>
          <button className="text-xs text-white/40 hover:text-white">
            + New
          </button>
        </div>
        <div className="space-y-2">
          {THREADS.map((t, i) => (
            <button
              key={t.from}
              className={`w-full text-left rounded-[10px] px-3 py-2 ${
                i === 0
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5"
              }`}
            >
              <p className="text-sm">{t.from}</p>
              <p className="text-xs text-white/30 truncate">{t.last}</p>
            </button>
          ))}
        </div>
      </div>

      {/* right chat */}
      <div className="rounded-[10px] border border-white/5 bg-white/1 flex flex-col">
        <div className="border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Kitchen remodel - Encino</p>
            <p className="text-xs text-white/35">SMS · (818) 555-5555</p>
          </div>
          <span className="rounded-[10px] bg-emerald-500/10 px-2 py-1 text-xs text-emerald-200">
            AI replying
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
          <div className="inline-block rounded-[10px] bg-white/5 px-3 py-2">
            Hi, I need a kitchen remodel in Encino.
          </div>
          <div className="inline-block rounded-[10px] bg-purple-500/10 px-3 py-2">
            Sylor: We can do that ✅. Are you free Tue 10:30 AM or Wed 2:00 PM?
          </div>
          <div className="inline-block rounded-[10px] bg-white/5 px-3 py-2">
            Tue 10:30 is good.
          </div>
        </div>
        <div className="border-t border-white/5 p-3 flex gap-2">
          <input
            className="flex-1 rounded-[10px] bg-[#0b0b0c] border border-white/10 px-3 py-2 text-sm outline-none focus:border-white/40"
            placeholder="Type a message…"
          />
          <button className="rounded-[10px] bg-white/80 text-black px-3 py-2 text-sm hover:bg-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
