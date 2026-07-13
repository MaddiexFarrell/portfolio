import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Work() {
  return (
    <section id="work" className="section-pad py-24 sm:py-32">
      <div className="container-content">
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-paper-border pb-8">
            <div>
              <p className="eyebrow mb-3">Selected work</p>
              <h2 className="font-display text-3xl font-light tracking-tight sm:text-4xl">
                A few things I'm proud of.
              </h2>
            </div>
            <span className="hidden text-sm text-ink-muted sm:block">
              {projects.length} projects
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1}>
              <motion.a
                href={project.href ?? "#"}
                className="group block"
                whileHover="hover"
              >
                <div className="relative overflow-hidden rounded-2xl border border-paper-border">
                  <div
                    className={`aspect-[4/3] w-full bg-gradient-to-br ${project.cover}`}
                  />
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 flex items-end justify-end p-5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink shadow-sm">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </motion.div>
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-normal tracking-tight">
                    {project.title}
                  </h3>
                  <span className="shrink-0 text-sm text-ink-muted">{project.year}</span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{project.category}</p>
                <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-ink-soft">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-paper-border px-3 py-1 text-xs text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
