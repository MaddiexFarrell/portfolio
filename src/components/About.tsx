import { experience, profile, stats } from "../data/portfolio";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-pad border-t border-paper-border bg-paper-soft py-24 sm:py-32">
      <div className="container-content grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-6">About</p>
            <h2 className="max-w-xl font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl">
              I care about the details that make products feel effortless.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 max-w-xl space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
              <p>
                I'm {profile.name}, a {profile.role.toLowerCase()} based in{" "}
                {profile.location}. Over the past decade I've partnered with founders
                and product teams to design software that's both beautiful and
                genuinely useful.
              </p>
              <p>
                My approach blends craft with clarity — I start with the problem, move
                quickly through ideas, and sweat the details all the way to launch. I
                believe great design should feel invisible.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-paper-border pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-light tracking-tight sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div>
            <p className="eyebrow mb-6">Experience</p>
            <ul className="divide-y divide-paper-border border-y border-paper-border">
              {experience.map((e) => (
                <li key={e.company} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <div className="text-base text-ink">{e.role}</div>
                    <div className="text-sm text-ink-muted">{e.company}</div>
                  </div>
                  <span className="shrink-0 text-sm text-ink-muted">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
