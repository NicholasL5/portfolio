import { motion } from "framer-motion";
import { ComponentBlender } from "./ComponentBlender";

export function Projects(){
  return (
    <section
      id="projects"
      className="relative grid min-h-[100svh] w-full place-items-center bg-neutral-900">

      <ComponentBlender />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="z-10 max-w-5xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="font-bold leading-[0.95] tracking-tight [text-wrap:balance]
                     text-[clamp(3rem,8vw,6rem)] text-white"
        >
          Projects
        </motion.h1>
      </motion.div>

    </section>
  );
}