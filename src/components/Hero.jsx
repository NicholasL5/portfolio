import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative isolate grid min-h-[100svh] w-full place-items-center bg-herofg px-4 text-fg antialiased">
      {/* bg */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero.png")' }}
      />

      <div className="absolute inset-0 z-10 bg-black/40" />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 overflow-visible font-sans text-center font-bold tracking-tight
                   [text-wrap:balance] text-[clamp(2.25rem,4vw+1rem,4.8rem)] leading-[1.15]"
      >
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r
                         from-fuchsia-500 to-cyan-300 px-[0.06em] py-[0.04em]">
        Welcome to <br/><i>Nicholas Lawrentius&apos;</i><br/> studio
        </span>
      </motion.h1>
    </section>
  );
}
