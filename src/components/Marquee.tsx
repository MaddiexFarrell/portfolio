import { capabilities } from "../data/portfolio";

export default function Marquee() {
  const items = [...capabilities, ...capabilities];
  return (
    <div className="border-y border-paper-border bg-paper-soft py-5">
      <div className="relative flex overflow-hidden">
        <div className="flex min-w-full shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
          {items.map((c, i) => (
            <span key={i} className="flex items-center gap-10 text-sm text-ink-muted">
              <span className="uppercase tracking-[0.18em]">{c}</span>
              <span className="text-ink-border">✦</span>
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex min-w-full shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10"
        >
          {items.map((c, i) => (
            <span key={i} className="flex items-center gap-10 text-sm text-ink-muted">
              <span className="uppercase tracking-[0.18em]">{c}</span>
              <span className="text-ink-border">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
