import { forwardRef, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "../../data/portfolio";
import Grain from "../Grain";

type ProjectRowProps = {
  item: Experience;
  isActive: boolean;
  onHoverChange?: (hovering: boolean) => void;
};

const ProjectRow = forwardRef<HTMLAnchorElement, ProjectRowProps>(
  ({ item, isActive, onHoverChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (videoRef.current && item.video) {
        // Set the video to show frame at 1 second when loaded
        videoRef.current.currentTime = 1;
      }
    }, [item.video]);

    const handleMouseEnter = () => {
      onHoverChange?.(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    };

    const handleMouseLeave = () => {
      onHoverChange?.(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 1;
      }
    };

    return (
      <a
        ref={ref}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group grid grid-cols-1 gap-4 border-b border-sand-border p-2 outline-none sm:grid-cols-[minmax(0,40%)_1fr]"
      >
        {/* Cover: video > image > colored placeholder */}
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
          style={item.video || item.image ? undefined : { backgroundColor: item.color }}
        >
          {item.video ? (
            <video
              ref={videoRef}
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : item.image ? (
            <img
              src={item.image}
              alt={`${item.company} cover`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <Grain opacity={0.12} blend="overlay" />
              <span className="absolute inset-0 flex items-center justify-center px-4 text-center uppercase tracking-[0.08em] text-white/90">
                {item.company}
              </span>
            </>
          )}
        </div>

        <div className="relative min-w-0 pr-8">
          <ArrowUpRight
            className={`absolute right-0 top-0.5 h-3.5 w-3.5 transition-colors duration-300 group-hover:text-[color:var(--accent)] ${
              isActive ? "text-ink" : "text-ink-muted"
            }`}
          />

          <h3 className="text-ink">{item.company}</h3>
          <p className="text-ink">{item.period}</p>

          <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
            {item.role} {item.companyDescription}
          </p>

          <span className="mt-4 inline-block text-ink underline decoration-from-font underline-offset-2 group-hover:text-ink-soft">
            Visit site
          </span>
        </div>
      </a>
    );
  },
);

ProjectRow.displayName = "ProjectRow";

export default ProjectRow;
