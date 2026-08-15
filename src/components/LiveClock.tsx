import { useEffect, useState, type CSSProperties } from "react";

function format(date: Date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

type LiveClockProps = {
  className?: string;
  style?: CSSProperties;
};

export default function LiveClock({ className, style }: LiveClockProps) {
  const [time, setTime] = useState(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} style={style}>
      {time}
    </span>
  );
}
