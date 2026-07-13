import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { profile } from "../data/portfolio";

import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function Hero() {
  return (
    <section id="top" className="section-pad relative overflow-hidden pt-36 pb-20 sm:pt-44">
      <div className="container-content">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow mb-8">
            {profile.role} · {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-4xl font-display text-[2.6rem] font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-opacity hover:opacity-80"
            >
              View selected work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline text-sm text-ink-soft hover:text-ink"
            >
              {profile.email}
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle decorative gradient orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 blur-3xl"
      />
    </section>
  );
}
