import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { experience, profile } from "../data/portfolio";
import ProjectRow from "../components/collection/ProjectRow";
import Sidebar from "../components/collection/Sidebar";
import { useKeyboardNav } from "../components/collection/useKeyboardNav";
import Greeting from "../components/Greeting";
import TimeTint from "../components/TimeTint";
import { useAfterHours } from "../hooks/useAfterHours";

// Animation variants for entrance
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [reversed, setReversed] = useState(false);
  const { isNight, toggle: toggleNight } = useAfterHours();
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const items = useMemo(
    () => (reversed ? [...experience].reverse() : experience),
    [reversed],
  );
  const hovered = hoveredIndex !== null ? items[hoveredIndex] : null;

  const handleIndexChange = useCallback((i: number) => {
    setActiveIndex(i);
    rowRefs.current[i]?.focus();
    rowRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  useKeyboardNav({
    itemCount: items.length,
    activeIndex: activeIndex ?? -1,
    onIndexChange: handleIndexChange,
    onOpenResume: () => window.open(profile.resumeUrl, "_blank"),
  });

  // The hovered project lends its signature color to the site chrome
  // (::selection, the row arrow). When nothing is hovered, the CSS default
  // for the current theme applies (see index.css).
  const accentVars = (
    hovered ? { "--accent": hovered.color } : {}
  ) as CSSProperties;

  return (
    <div
      style={accentVars}
      className="min-h-screen bg-sand font-sans text-[13px] leading-normal text-ink"
    >
      {/* Thin top bar; the vertical separator continues down between columns */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 grid grid-cols-1 border-b border-sand-border bg-sand md:grid-cols-[7fr_3fr]"
      >
        {/* On mobile the about block comes first, so this label moves into
            the work column (see below) and only the name row remains here. */}
        <div className="hidden items-center justify-between px-2 py-1.5 md:flex">
          <span className="text-xs uppercase tracking-[0.08em]">
            Selected Work
          </span>
          <button
            type="button"
            onClick={() => setReversed((v) => !v)}
            aria-label="Reverse project order"
            title="Reverse order"
            className={`text-ink-muted transition-all duration-300 hover:text-ink ${
              reversed ? "rotate-180" : ""
            }`}
          >
            ⇅
          </button>
        </div>
        <div className="flex items-center justify-between border-sand-border px-3 py-1.5 md:border-l">
          <span>{profile.name}</span>
          <Greeting />
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr]">
        {/* Project list */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="order-2 min-w-0 md:order-1"
        >
          <div className="flex items-center justify-between border-b border-sand-border px-2 py-1.5 md:hidden">
            <span className="text-xs uppercase tracking-[0.08em]">
              Selected Work
            </span>
            <button
              type="button"
              onClick={() => setReversed((v) => !v)}
              aria-label="Reverse project order"
              title="Reverse order"
              className={`text-ink-muted transition-all duration-300 hover:text-ink ${
                reversed ? "rotate-180" : ""
              }`}
            >
              ⇅
            </button>
          </div>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={rowVariants}
              layout
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
            >
              <ProjectRow
                item={item}
                isActive={activeIndex === i}
                onHoverChange={(hovering) =>
                  setHoveredIndex((prev) =>
                    hovering ? i : prev === i ? null : prev,
                  )
                }
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
              />
            </motion.div>
          ))}
        </motion.main>

        {/* Sidebar */}
        <Sidebar hovered={hovered} isNight={isNight} onToggleNight={toggleNight} />
      </div>

      <TimeTint />
    </div>
  );
}
