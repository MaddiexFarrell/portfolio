import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A small pixel cat that lives on the sidebar divider. It keeps San
// Francisco hours: asleep from 10 PM to 7 AM SF time, otherwise sitting,
// blinking, and flicking its tail. Pet it (click) for a reaction.
//
// Sprites are string maps: '#' = ink pixel, 'e' = eye (paper-colored while
// open, ink while blinking), '.' = transparent. Drawn in currentColor so the
// cat adapts to day and after-hours themes automatically.

const PX = 2;

// Chibi loaf: big round head, 2x2 eyes, tucked paws, tail wrapped at right.
const SIT_TAIL_DOWN = [
  ".#.......#...",
  ".##......##..",
  ".##########..",
  ".#ee####ee#..",
  ".#ee####ee#..",
  ".##########..",
  "..########...",
  "..#########..",
  ".##########..",
  ".##########.#",
  ".##########.#",
  ".############",
  "..###.###....",
];

const SIT_TAIL_UP = [
  ".#.......#...",
  ".##......##..",
  ".##########..",
  ".#ee####ee#..",
  ".#ee####ee#..",
  ".##########..",
  "..########...",
  "..#########.#",
  ".##########.#",
  ".##########..",
  ".##########..",
  ".##########..",
  "..###.###....",
];

const SLEEP = [
  "..#.####....",
  "..########..",
  ".##########.",
  ".##########.",
  ".##########.",
  "..########..",
];

function isCatSleepTime() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "America/Los_Angeles",
    }).format(new Date()),
  );
  return hour >= 22 || hour < 7;
}

function Sprite({ map, blink }: { map: string[]; blink?: boolean }) {
  const rects: React.ReactNode[] = [];
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === ".") continue;
      const isOpenEye = ch === "e" && !blink;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * PX}
          y={y * PX}
          width={PX}
          height={PX}
          fill={isOpenEye ? "rgb(var(--c-sand))" : "currentColor"}
        />,
      );
    }
  });
  return (
    <svg
      width={map[0].length * PX}
      height={map.length * PX}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rects}
    </svg>
  );
}

export default function PixelCat({ className }: { className?: string }) {
  const [asleep, setAsleep] = useState(isCatSleepTime);
  const [wokenUp, setWokenUp] = useState(false);
  const [blink, setBlink] = useState(false);
  const [tailUp, setTailUp] = useState(false);
  // "heart" = petted while awake, "grump" = woken up from a nap
  const [reaction, setReaction] = useState<"heart" | "grump" | null>(null);

  const sleeping = asleep && !wokenUp;

  useEffect(() => {
    const id = setInterval(() => setAsleep(isCatSleepTime()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Random blinks while awake.
  useEffect(() => {
    if (sleeping) return;
    let closeId: ReturnType<typeof setTimeout>;
    let openId: ReturnType<typeof setTimeout>;
    function scheduleBlink() {
      closeId = setTimeout(() => {
        setBlink(true);
        openId = setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 150);
      }, 2500 + Math.random() * 4000);
    }
    scheduleBlink();
    return () => {
      clearTimeout(closeId);
      clearTimeout(openId);
    };
  }, [sleeping]);

  // Occasional tail flick while awake.
  useEffect(() => {
    if (sleeping) return;
    const id = setInterval(() => {
      setTailUp(true);
      setTimeout(() => setTailUp(false), 450);
    }, 4200);
    return () => clearInterval(id);
  }, [sleeping]);

  const handleClick = () => {
    if (sleeping) {
      // Wake the cat briefly; it goes back to sleep on its own, mildly annoyed.
      setReaction("grump");
      setWokenUp(true);
      setTimeout(() => setWokenUp(false), 5000);
    } else {
      setReaction("heart");
    }
    setTimeout(() => setReaction(null), 900);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="The cat that lives on this website"
      className={`text-ink outline-none ${className ?? ""}`}
    >
      <div className="relative flex items-end">
        <AnimatePresence>
          {reaction && (
            <motion.span
              key={reaction}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: -3 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[9px]"
              style={reaction === "heart" ? { color: "#E0526E" } : undefined}
            >
              {reaction === "heart" ? "♥" : "!"}
            </motion.span>
          )}
        </AnimatePresence>

        {sleeping && (
          <span aria-hidden className="absolute -top-3 right-0">
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                className="absolute right-0 font-mono text-[8px] text-ink-muted"
                animate={{ y: [0, -8], x: [0, 3], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.4,
                  delay: i * 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                z
              </motion.span>
            ))}
          </span>
        )}

        <motion.div
          whileHover={sleeping ? undefined : { rotate: -5 }}
          animate={
            reaction === "heart" && !sleeping ? { y: [0, -5, 0] } : { y: 0 }
          }
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformOrigin: "bottom center" }}
        >
          {sleeping ? (
            <motion.div
              style={{ transformOrigin: "bottom" }}
              animate={{ scaleY: [1, 1.05, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sprite map={SLEEP} />
            </motion.div>
          ) : (
            <Sprite map={tailUp ? SIT_TAIL_UP : SIT_TAIL_DOWN} blink={blink} />
          )}
        </motion.div>
      </div>
    </button>
  );
}
