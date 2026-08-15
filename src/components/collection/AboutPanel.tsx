import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type AboutPanelProps = {
  open: boolean;
  onClose: () => void;
};

// Draft copy — replace these with real details about you.
const facts = [
  "Based in San Francisco, chasing good coffee and better critique.",
  "Sketches on paper before pixels, most of the time.",
  "Reads design-systems retros for fun.",
];

export default function AboutPanel({ open, onClose }: AboutPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="More about me"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md border border-sand-border bg-sand p-6 shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between">
              <h2 className="uppercase tracking-[0.08em] text-ink">
                A few more things
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-ink-muted transition-colors hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-6 space-y-3 leading-relaxed text-ink-soft">
              {facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <p className="mt-6 text-ink-muted">
              Press Esc to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
