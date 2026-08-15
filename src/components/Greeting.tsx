import { useEffect, useState } from "react";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";

// Greets the visitor in *their* timezone — a nice contrast with the header
// clock, which always shows my time.
function getGreeting(now: Date) {
  const hour = now.getHours();
  if (hour >= 5 && hour < 11) return { Icon: Sunrise, text: "Good morning" };
  if (hour >= 11 && hour < 17) return { Icon: Sun, text: "Good afternoon" };
  if (hour >= 17 && hour < 22) return { Icon: Sunset, text: "Good evening" };
  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return { Icon: Moon, text: `Good grief, it's ${time}` };
}

// The site remembers repeat visitors (counted once per day). On visits 2+,
// the greeting text swaps for these; the time-based icon stays.
const RETURN_LINES: Record<number, string> = {
  2: "Hi! You're back!",
  3: "Three visits. Should we just get coffee?",
  4: "You know where the CV is by now.",
};
const FINAL_LINE = "Just email me already. Seriously :)";

function getVisitCount() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const count = parseInt(localStorage.getItem("visit-count") ?? "0", 10) || 0;
    if (localStorage.getItem("visit-date") === today) return count;
    localStorage.setItem("visit-date", today);
    localStorage.setItem("visit-count", String(count + 1));
    return count + 1;
  } catch {
    return 1;
  }
}

export default function Greeting({ className }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());
  const [visitCount] = useState(getVisitCount);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { Icon, text } = getGreeting(now);
  const displayText =
    visitCount >= 5
      ? FINAL_LINE
      : (RETURN_LINES[visitCount] ?? text);

  return (
    <p className={`flex items-center gap-1.5 ${className ?? ""}`}>
      <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
      <span>{displayText}</span>
    </p>
  );
}
