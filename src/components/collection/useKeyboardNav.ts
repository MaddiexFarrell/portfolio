import { useEffect } from "react";

type Options = {
  itemCount: number;
  activeIndex: number;
  onIndexChange: (index: number) => void;
  onOpenResume: () => void;
};

// Hidden power-user layer: arrow keys move between projects, R opens the résumé.
export function useKeyboardNav({
  itemCount,
  activeIndex,
  onIndexChange,
  onOpenResume,
}: Options) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          const next = Math.min(itemCount - 1, Math.max(0, activeIndex) + 1);
          onIndexChange(next);
          break;
        }
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          const prev = Math.max(0, (activeIndex < 0 ? itemCount : activeIndex) - 1);
          onIndexChange(prev);
          break;
        }
        case "r":
        case "R":
          onOpenResume();
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [itemCount, activeIndex, onIndexChange, onOpenResume]);
}
