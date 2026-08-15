import { experience, profile, type Experience } from "../../data/portfolio";
import LastUpdated from "../LastUpdated";
import PixelCat from "../PixelCat";
import ShortcutKeys from "./ShortcutKeys";

const linkClass =
  "text-ink underline decoration-from-font underline-offset-2 transition-colors hover:text-ink-soft";

type SidebarProps = {
  hovered: Experience | null;
  isNight: boolean;
  onToggleNight: () => void;
};

export default function Sidebar({ hovered, isNight, onToggleNight }: SidebarProps) {
  return (
    <aside className="order-1 flex flex-col justify-between border-b border-sand-border px-3 py-4 md:sticky md:top-0 md:order-2 md:h-screen md:overflow-y-auto md:border-b-0 md:border-l">
      <div>
        <p className="text-[15px] font-medium tracking-tight text-ink">
          {profile.role}
        </p>
        <div className="mt-4 flex flex-col items-start gap-0.5">
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            LinkedIn
          </a>
          {/* On mobile the experience block below is hidden, so the CV link
              lives here instead. */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={`${linkClass} md:hidden`}
          >
            CV →
          </a>
        </div>

        <p className="mt-6 max-w-xs leading-relaxed text-ink">{profile.bio}</p>
        <p className="mt-4 text-ink">{profile.status}</p>

        <div className="relative mt-10 hidden border-t border-sand-border pt-6 md:block">
          <PixelCat className="absolute bottom-full right-4" />
          <ul className="space-y-1">
            {experience.map((e) => {
              const isHovered = hovered?.id === e.id;
              return (
                <li key={e.id}>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group"
                  >
                    <span
                      className="text-ink underline decoration-from-font underline-offset-2 transition-all group-hover:opacity-60"
                      style={isHovered ? { color: e.color } : undefined}
                    >
                      {e.company}
                    </span>
                    <span className="tnum text-ink-muted">
                      , {e.location} ({e.period})
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={`mt-8 inline-block ${linkClass}`}
          >
            CV →
          </a>
        </div>
      </div>

      <div className="mt-16 hidden space-y-5 md:block">
        {isNight && (
          <p className="text-xs text-ink-muted">
            You're seeing the after-hours version of this site.
          </p>
        )}
        <ShortcutKeys isNight={isNight} onToggleNight={onToggleNight} />
        <LastUpdated className="tnum block text-xs text-ink-muted" />
      </div>
    </aside>
  );
}
