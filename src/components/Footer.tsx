import { profile } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-pad border-t border-paper-border py-10">
      <div className="container-content flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-ink-muted">
          © {year} {profile.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="#top" className="link-underline text-sm text-ink-soft hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
