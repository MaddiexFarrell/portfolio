import { forwardRef, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Experience } from "../../data/portfolio";
import Grain from "../Grain";

// Touch-primary devices have no hover, so videos play via IntersectionObserver
// instead (see effect below).
const isTouchDevice =
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

type ProjectRowProps = {
  item: Experience;
  isActive: boolean;
  onHoverChange?: (hovering: boolean) => void;
};

const ProjectRow = forwardRef<HTMLAnchorElement, ProjectRowProps>(
  ({ item, isActive, onHoverChange }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    // Keep the latest callback in a ref so the observer effect doesn't
    // re-subscribe every render (Home passes an inline function).
    const onHoverChangeRef = useRef(onHoverChange);
    useEffect(() => {
      onHoverChangeRef.current = onHoverChange;
    });

    useEffect(() => {
      const video = videoRef.current;
      if (video && item.video) {
        const defaultTime = item.videoStartTime ?? 8;
        const setDefaultTime = () => {
          video.currentTime = defaultTime;
        };
        
        // Wait for metadata to load before setting time
        if (video.readyState >= 1) {
          // Metadata already loaded
          setDefaultTime();
        } else {
          video.addEventListener('loadedmetadata', setDefaultTime);
        }
        
        return () => {
          video.removeEventListener('loadedmetadata', setDefaultTime);
        };
      }
    }, [item.video, item.videoStartTime]);

    // On touch devices the row ~60% in view plays (and lends its accent
    // color), pausing again once scrolled away.
    useEffect(() => {
      const video = videoRef.current;
      if (!video || !item.video || !isTouchDevice) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            onHoverChangeRef.current?.(true);
          } else {
            video.pause();
            onHoverChangeRef.current?.(false);
          }
        },
        { threshold: 0.6 },
      );
      observer.observe(video);
      return () => observer.disconnect();
    }, [item.video]);

    const handleMouseEnter = () => {
      onHoverChange?.(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };

    const handleMouseLeave = () => {
      onHoverChange?.(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = item.videoStartTime ?? 8;
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
          className="relative aspect-[16/9] w-full overflow-hidden"
          style={item.video || item.image ? undefined : { backgroundColor: item.color }}
        >
          {item.video ? (
            <>
              <video
                ref={videoRef}
                src={item.video}
                poster={item.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              />
              {item.logo && (
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  className="absolute inset-0 m-auto h-14 w-auto max-w-[50%] object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-0"
                />
              )}
            </>
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

          <h3 className="text-[15px] font-medium tracking-tight text-ink">
            {item.company}
          </h3>
          <p className="tnum mt-0.5 text-xs text-ink-muted">{item.period}</p>

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
