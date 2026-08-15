// __BUILD_DATE__ is injected at build time in vite.config.ts, so this always
// reflects when the site was last built/deployed — no manual updates needed.
const buildDate = new Date(__BUILD_DATE__);

// YY.MM.DD, e.g. "26.01.18"
function format(date: Date) {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

export default function LastUpdated({ className }: { className?: string }) {
  return <span className={className}>Last Updated {format(buildDate)}</span>;
}
