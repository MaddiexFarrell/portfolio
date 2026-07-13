import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/portfolio";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section-pad py-24 sm:py-36">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-6">Contact</p>
          <h2 className="max-w-3xl font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl">
            Have a project in mind? Let's make something good together.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 font-display text-2xl font-light tracking-tight sm:text-3xl"
          >
            <span className="link-underline">{profile.email}</span>
            <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-sm text-ink-soft hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
