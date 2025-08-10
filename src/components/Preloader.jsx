import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Preloader({ onDone, duration = 900 }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    let t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      className="fixed inset-0 z-50 grid place-items-center bg-bg text-fg"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg font-semibold text-white/80">
          Loading…
        </div>

        {/* Progress bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: reduce ? 0.6 : duration / 1000,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-300"
          />
        </div>
      </div>
    </motion.div>
  );
}