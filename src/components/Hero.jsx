// src/components/Hero.jsx
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative grid min-h-[100svh] w-full place-items-center bg-bg px-4 text-fg antialiased">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-sans text-center font-bold leading-tight tracking-tight
                   text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-300
                   [text-wrap:balance] max-w-[16ch]
                   text-[clamp(2.25rem,4vw+1rem,4.8rem)]"
      >
        Welcome to Nicholas Lawrentius&apos; Playground
      </motion.h1>
    </section>
  );
}
