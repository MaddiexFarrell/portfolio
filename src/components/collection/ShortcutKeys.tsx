import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Tiny rendered keycaps that physically depress when the visitor presses the
// real key — the shortcuts document themselves.
type KeyDef = { code: string; glyph: string };

const GROUPS: { keys: KeyDef[]; label: string }[] = [
  {
    keys: [
      { code: "arrowup", glyph: "↑" },
      { code: "arrowdown", glyph: "↓" },
    ],
    label: "navigate",
  },
  { keys: [{ code: "e", glyph: "E" }], label: "email" },
  { keys: [{ code: "l", glyph: "L" }], label: "linkedin" },
];

function Keycap({ glyph, pressed }: { glyph: string; pressed: boolean }) {
  return (
    <kbd
      className={`flex h-6 w-6 items-center justify-center rounded-[3px] border border-sand-border font-sans text-[10px] text-ink-soft transition-all duration-100 ${
        pressed
          ? "translate-y-[1.5px] bg-sand-soft shadow-none"
          : "bg-sand shadow-[0_1.5px_0_0_rgb(var(--c-sand-border))]"
      }`}
    >
      {glyph}
    </kbd>
  );
}

type ShortcutKeysProps = {
  className?: string;
  isNight: boolean;
  onToggleNight: () => void;
};

export default function ShortcutKeys({
  className,
  isNight,
  onToggleNight,
}: ShortcutKeysProps) {
  const [pressed, setPressed] = useState<Set<string>>(new Set());

  useEffect(() => {
    function down(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      setPressed((prev) => {
        if (prev.has(key)) return prev;
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    }
    function up(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      setPressed((prev) => {
        if (!prev.has(key)) return prev;
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
    // Clear on blur so keys don't stick when focus leaves the window.
    function clear() {
      setPressed(new Set());
    }
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, []);

  return (
    <div className={`hidden items-end gap-4 md:flex ${className ?? ""}`}>
      {GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col items-start gap-1.5">
          <div className="flex gap-1">
            {group.keys.map((k) => (
              <Keycap key={k.code} glyph={k.glyph} pressed={pressed.has(k.code)} />
            ))}
          </div>
          <span className="text-[10px] text-ink-muted">{group.label}</span>
        </div>
      ))}
      <div className="flex flex-col items-start gap-1.5">
        <button
          type="button"
          onClick={onToggleNight}
          aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
          className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-sand-border bg-sand text-ink-soft shadow-[0_1.5px_0_0_rgb(var(--c-sand-border))] transition-all duration-100 hover:bg-sand-soft"
        >
          {isNight ? (
            <Sun className="h-3.5 w-3.5" strokeWidth={1.5} />
          ) : (
            <Moon className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
        </button>
        <span className="text-[10px] text-ink-muted">
          {isNight ? "day" : "night"}
        </span>
      </div>
    </div>
  );
}
