import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Scatter -> Compose title (auto-plays on mount)
 * Usage: <HeroTitle lines={["Nicholas", "Lawrentius"]} />
 */
export default function HeroTitle({ lines = [] }) {
  const wrapRef = useRef(null);

  // split each line into <span class="char">…</span>
  const splitLines = () => {
    const els = wrapRef.current.querySelectorAll("[data-line]");
    const charSets = [];
    els.forEach((el) => {
      const text = el.textContent;
      el.textContent = "";
      const frag = document.createDocumentFragment();
      const chars = [];
      for (const ch of text) {
        const s = document.createElement("span");
        s.className = "char";
        s.textContent = ch === " " ? "\u00A0" : ch;
        frag.appendChild(s);
        chars.push(s);
      }
      el.appendChild(frag);
      charSets.push(chars);
    });
    return charSets;
  };

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      const charSets = splitLines();
      const allChars = charSets.flat();

      // initial scatter
      gsap.set(allChars, {
        opacity: 0,
        x: () => gsap.utils.random(-120, 120, 1),
        y: () => gsap.utils.random(-80, 80, 1),
        rotate: () => gsap.utils.random(-35, 35, 1),
        scale: () => gsap.utils.random(0.8, 1.15),
        filter: "blur(10px)",
      });

      // compose into place
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(allChars, {
        opacity: 1,
        x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)",
        duration: 1.2,
        stagger: { each: 0.02, from: "random" },
      })
      // small tactile settle
      .to(allChars, {
        y: (i) => (i % 2 ? -2 : 2),
        duration: 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
        stagger: 0.005,
      }, "-=0.6");

      // continuous micro-drift (very subtle)
      gsap.to(allChars, {
        y: "+=1.5",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.02, from: "center" },
      });

      // gentle gradient shimmer on each line
      const lineEls = wrapRef.current.querySelectorAll("[data-line]");
      gsap.to(lineEls, {
        backgroundPositionX: "100%",
        duration: 6,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="leading-[0.92] tracking-[-0.02em] font-extrabold">
      {lines.map((t, i) => (
        <h1
          key={i}
          data-line
          className="gradient-text m-0 text-[clamp(40px,9vw,112px)]"
          style={{ backgroundPositionX: "0%" }}
        >
          {t}
        </h1>
      ))}
    </div>
  );
}
