import { useEffect, useState } from "react";

// Between 10 PM and 5 AM (visitor's clock) the site switches to its night
// self automatically. The header toggle sets a manual override that persists
// and wins over the clock.
const OVERRIDE_KEY = "after-hours-override";

type Override = "day" | "night" | null;

function isNightHour(hour: number) {
  return hour >= 22 || hour < 5;
}

function readOverride(): Override {
  const v = localStorage.getItem(OVERRIDE_KEY);
  return v === "day" || v === "night" ? v : null;
}

export function useAfterHours() {
  const [override, setOverride] = useState<Override>(readOverride);
  const [autoNight, setAutoNight] = useState(() =>
    isNightHour(new Date().getHours()),
  );

  useEffect(() => {
    const id = setInterval(
      () => setAutoNight(isNightHour(new Date().getHours())),
      60_000,
    );
    return () => clearInterval(id);
  }, []);

  const isNight = override !== null ? override === "night" : autoNight;

  useEffect(() => {
    document.documentElement.classList.toggle("after-hours", isNight);
    // Swap favicon to match the theme — awake cat for day, sleepy cat for night.
    const favicon = document.getElementById("favicon") as HTMLLinkElement | null;
    if (favicon) {
      favicon.href = isNight ? "/favicon-night.png" : "/favicon-day.png";
    }
  }, [isNight]);

  const toggle = () => {
    const next: Override = isNight ? "day" : "night";
    localStorage.setItem(OVERRIDE_KEY, next);
    setOverride(next);
  };

  return { isNight, toggle };
}
