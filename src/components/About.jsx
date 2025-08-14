// components/About.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ComponentBlender } from "./ComponentBlender";
import { BackgroundBlogCard } from "./BgCards";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const text = textRef.current;
    const grid = gridRef.current;

    const ctx = gsap.context(() => {
      // Pin the text when it reaches the middle of the screen
      // and unpin when the cards (grid) are fully out of view.
      const pin = ScrollTrigger.create({
        trigger: text,
        start: "center center",       // text scrolls INTO middle
        endTrigger: grid,
        end: "bottom top+=16",        // release a hair after grid leaves screen
        pin: text,
        pinSpacing: true,
        anticipatePin: 1,
        // markers: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative grid w-full place-items-center bg-neutral-900 px-6 py-24"
      // ^ replaced pt-50/pb-50 (not Tailwind) with py-32
    >
      {/* background deco, keep it behind */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ComponentBlender />
      </div>

      {/* Centered content (pinned) */}
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-20 max-w-5xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="font-bold leading-[0.95] tracking-tight [text-wrap:balance]
                     text-[clamp(3rem,6vw,5rem)] text-white"
          data-speed="0.6"  // slower parallax on heading
        >
          About
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-white/90 leading-relaxed
                     text-[clamp(1.1rem,1.9vw,1rem)]"
          data-speed="0.3"  // tiny drift
        >
          I’m Nicholas, a software engineer who enjoys building delightful, performant
          web experiences and tinkering with ML.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-white/80 leading-relaxed
                     text-[clamp(1rem,1.6vw,0.8rem)]"
          data-speed="0.45"
        >
          Recently: React + Framer Motion, Tailwind, and a sprinkle of 3D/parallax.
        </motion.p>
      </motion.div>

      {/* Cards layer (scrolls under the pinned text) */}
      <motion.ul
        ref={gridRef}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        className="relative z-10 mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[
          {
            title: "Early days",
            author: "React • Framer Motion • Tailwind",
            bgSrc:
              "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
            avatarSrc:
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop",
          },
          {
            title: "Nowadays",
            author: "Node • Python • LLMs",
            bgSrc:
              "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
            avatarSrc:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
          },
          {
            title: "Future days",
            author: "Micro-interactions • Parallax",
            bgSrc:
              "https://images.unsplash.com/photo-1511207538750-b1c1f3a0c4f1?q=80&w=1200&auto=format&fit=crop",
            avatarSrc:
              "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
          },
        ].map((c) => (
          <motion.li
            key={c.title}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <BackgroundBlogCard {...c} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
