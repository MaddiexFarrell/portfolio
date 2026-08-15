import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router preserves scroll position across route changes. This resets to
// the top whenever the path changes (unless navigating to an in-page #anchor).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
