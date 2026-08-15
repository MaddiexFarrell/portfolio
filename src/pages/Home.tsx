import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { experience, profile } from "../data/portfolio";
import ProjectRow from "../components/collection/ProjectRow";
import Sidebar from "../components/collection/Sidebar";
import AboutPanel from "../components/collection/AboutPanel";
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
  const [aboutOpen, setAboutOpen] = useState(false);
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
    onToggleAbout: () => setAboutOpen((v) => !v),
    onEscape: () => setAboutOpen(false),
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
      className="min-h-screen bg-sand font-sans text-xs leading-normal text-ink"
    >
      {/* Thin top bar; the vertical separator continues down between columns */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 grid grid-cols-1 border-b border-sand-border bg-sand md:grid-cols-[7fr_3fr]"
      >
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="uppercase">Selected Work</span>
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
          <div className="flex items-center gap-3">
            <Greeting />
            <button
              type="button"
              onClick={toggleNight}
              aria-label={
                isNight ? "Switch to day mode" : "Switch to after-hours mode"
              }
              title={isNight ? "Day mode" : "After-hours mode"}
              className="text-ink-muted transition-colors hover:text-ink"
            >
              {isNight ? (
                <Sun aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
              ) : (
                <Moon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr]">
        {/* Project list */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="min-w-0"
        >
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
        <Sidebar hovered={hovered} isNight={isNight} />
      </div>

      <TimeTint />
      <AboutPanel open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
