import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="
        relative isolate grid
        h-screen                               
        supports-[height:105dvh]:h-[105dvh]    
        sm:h-[105svh]                    
        w-full place-items-center overflow-hidden
        bg-herofg px-4 text-fg antialiased
      ">
      {/* bg */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/hero.png")',
         }}
      />

      <div className="absolute inset-0 z-10 bg-black/40" />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 overflow-visible font-sans text-center font-bold tracking-tight
                   [text-wrap:balance] text-[clamp(2.25rem,4vw+1rem,4.8rem)] leading-[1.15]"
      >
        <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} 
        className="inline-block text-transparent bg-clip-text bg-gradient-to-r
                         from-fuchsia-500 to-cyan-300 px-[1em] py-[0.04em]">
        <i>Nicholas Lawrentius&apos;</i><br/> Homepage
        </motion.span>
      </motion.h1>
    </section>
  );
}
