import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

export function Preloader({ onDone, duration }) {
  const reduce = useReducedMotion();
  const rootRef = useRef(null);

  // split text into characters
  const text = "Please wait…";
  const letters = useMemo(() => text.split(""), []);

  // auto-finish after `duration`
  useEffect(() => {
    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  // GSAP wave
  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".preloader-char");
      gsap.from(chars, {
        y: 8, opacity: 0, stagger: 0.02, duration: 0.5, ease: "power2.out",
      });
      gsap.to(chars, {
        keyframes: [
          { y: -6, rotate: 6, duration: 0.35, ease: "sine.out" },
          { y: 0, rotate: 0, duration: 0.35, ease: "sine.in" },
        ],
        stagger: { each: 0.06, from: 0 },
        repeat: -1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      className="fixed inset-0 z-50 grid place-items-center bg-bg text-fg"
      aria-busy="true"
      aria-live="polite"
      ref={rootRef}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="sr-only">Loading, please wait…</span>

        <div aria-hidden="true" className="text-lg font-semibold text-fg/80 select-none">
          {letters.map((ch, i) => (
            <span key={i} className="preloader-char inline-block will-change-transform">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        {/* Progress bar synced to `duration` */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            key={duration}                       // restart if duration changes
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className="h-full origin-left bg-gradient-to-r from-fuchsia-500 to-cyan-300 will-change-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}
