"use client";

const TESTIMONIALS = [
  {
    quote:
      "We deployed Sylor across SMS and inbound forms in 48 hours. Our response time dropped from 7 minutes to 4 seconds and bookings jumped 38%.",
    author: "Kelly Romero",
    role: "COO, Northwind Solar",
  },
  {
    quote:
      "It feels like we hired a world-class coordinator who never sleeps. Sylor handles intake, reminders, and upsells while we stay focused on delivery.",
    author: "Marcus Allen",
    role: "Founder, Align Renovations",
  },
];

export function Testimonials() {
  return (
    <section
      id="customers"
      className="rounded-[32px] border border-white/10 bg-[#07070b]/70 px-6 py-16 md:px-12 md:py-20"
    >
      <div className="flex flex-col gap-4 mb-10">
        <span className="text-xs uppercase tracking-[0.4em] text-white/50">
          Teams scaling with Sylor
        </span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          &quot;We finally automate the boring stuff without compromising the brand.&quot;
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <article
            key={item.author}
            className="rounded-[26px] border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <p className="text-lg text-white/80 leading-relaxed">&quot;{item.quote}&quot;</p>
            <div className="mt-6">
              <p className="text-white font-semibold">{item.author}</p>
              <p className="text-white/50 text-sm">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
