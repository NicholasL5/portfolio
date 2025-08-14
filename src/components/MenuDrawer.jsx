// components/MenuDrawer.jsx
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

const panel = {
  hidden:  { x: "100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 220, damping: 22 } },
  exit:    { x: "100%", transition: { duration: 0.25 } },
};

export function MenuDrawer({ open, onClose }) {
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm touch-none"
            initial="hidden" animate="visible" exit="exit" variants={backdrop}
          />

          <motion.aside
            role="dialog" aria-modal="true" aria-labelledby="menu-heading"
            className="fixed right-0 top-0 bottom-0 z-50 w-[min(88vw,420px)] sm:w-[min(64vw,520px)]"
            initial="hidden" animate="visible" exit="exit" variants={panel}
          >
            <div className="relative h-full overflow-hidden bg-neutral-900 text-white">
              <div className="absolute inset-0 bg-black/20" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between p-8">
                <div>
                  <h2 id="menu-heading" className="text-2xl font-semibold">Menu</h2>
                  <nav className="mt-15 space-y-6 text-3xl font-semibold">
                    <a ref={firstLinkRef} href="#home"    onClick={onClose} className="block hover:opacity-90">Home</a>
                    <a                    href="#about"   onClick={onClose} className="block hover:opacity-90">About</a>
                    <a                    href="#projects"onClick={onClose} className="block hover:opacity-90">Projects</a>
                    <a                    href="#contact" onClick={onClose} className="block hover:opacity-90">Contact</a>
                  </nav>
                </div>

                <div className="text-xs opacity-80">
                  © {new Date().getFullYear()} Nicholas Lawrentius
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
