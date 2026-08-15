import { useEffect, useState } from "react";

// A whisper of color over the whole page that follows the visitor's clock:
// warm in the morning, neutral midday, dusk-lavender in the evening, and a
// deeper blue late at night. Multiply blend so it only ever darkens.
function tintFor(hour: number) {
  if (hour >= 5 && hour < 11) return { color: "#F2A93B", opacity: 0.05 };
  if (hour >= 11 && hour < 17) return { color: "#FFFFFF", opacity: 0 };
  if (hour >= 17 && hour < 22) return { color: "#8B7BB8", opacity: 0.05 };
  return { color: "#41527A", opacity: 0.07 };
}

export default function TimeTint() {
  const [hour, setHour] = useState(() => new Date().getHours());

  useEffect(() => {
    const id = setInterval(() => setHour(new Date().getHours()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { color, opacity } = tintFor(hour);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 mix-blend-multiply transition-colors duration-1000"
      style={{ backgroundColor: color, opacity }}
    />
  );
}
