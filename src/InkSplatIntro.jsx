import { useEffect, useMemo, useRef, useState } from "react";

export default function InkSplatIntro({
  children,
  inkColor = "#0B0C10", // the color that fills the screen
  duration = 2400,      // total ms
  center = [0.5, 0.5],  // 0..1
  onDone,               // callback when overlay finishes/fades
}) {
  const id = useMemo(() => `ink-${Math.random().toString(36).slice(2, 9)}`, []);
  const reduce = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const turbRef = useRef(null);
  const dispRef = useRef(null);
  const c0 = useRef(null), c1 = useRef(null), c2 = useRef(null);
  const overlayRef = useRef(null);

  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    // reduced motion: skip animation
    if (reduce) {
      setShowChildren(true);
      overlayRef.current && (overlayRef.current.style.opacity = "0");
      onDone?.();
      return;
    }

    const start = performance.now();
    let raf = 0;
    const [cx, cy] = center;

    function easeInOut(t){ return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2; }
    function easeOut(t){ return 1 - Math.pow(1 - t, 3); }
    function easeIn(t){ return t*t; }

    function frame(now){
      const T = Math.min((now - start) / duration, 1);
      // --- 3-phase radius: pop -> grow -> cover ---
      let R;
      if (T < 0.18) {
        // quick pop to small blot
        R = 0.18 * easeOut(T / 0.18);
      } else if (T < 0.78) {
        // bloom around center
        R = 0.18 + 0.52 * easeInOut((T - 0.18) / 0.60); // to ~0.70
      } else {
        // final cover to >1 (screen wide)
        R = 0.70 + 0.65 * easeIn((T - 0.78) / 0.22);     // to ~1.35
      }

      // radii
      c0.current?.setAttribute("r", `${R}`);
      c1.current?.setAttribute("r", `${Math.max(0, R - 0.12)}`);
      c2.current?.setAttribute("r", `${Math.max(0, R * 0.65)}`);

      // positions (tendrils)
      c0.current?.setAttribute("cx", `${cx}`); c0.current?.setAttribute("cy", `${cy}`);
      c1.current?.setAttribute("cx", `${cx + 0.06 * Math.sin(T * 8)}`);
      c1.current?.setAttribute("cy", `${cy + 0.05 * Math.cos(T * 6)}`);
      c2.current?.setAttribute("cx", `${cx - 0.06 * Math.cos(T * 5)}`);
      c2.current?.setAttribute("cy", `${cy + 0.04 * Math.sin(T * 7)}`);

      // edge raggedness
      turbRef.current?.setAttribute("baseFrequency", (0.012 + 0.006 * easeInOut(T)).toFixed(4));
      const s = 14 + 12 * Math.sin(easeInOut(T) * Math.PI);
      dispRef.current?.setAttribute("scale", s.toFixed(1));

      // when fully covered, fade overlay and reveal children
      if (T >= 0.9 && !showChildren) {
        setShowChildren(true);
        if (overlayRef.current) {
          overlayRef.current.style.transition = "opacity 420ms ease-out";
          overlayRef.current.style.opacity = "0";
          setTimeout(() => onDone?.(), 420);
        } else {
          onDone?.();
        }
      }

      if (T < 1) raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [duration, center, reduce, onDone, showChildren]);

  return (
    <div className="relative">
      {/* defs */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id={`${id}-inkRagged`}>
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="7" result="turb"/>
            <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="turb" scale="22"/>
          </filter>
          <mask
            id={`${id}-inkMask`}
            maskUnits="objectBoundingBox"
            maskContentUnits="objectBoundingBox"
            x="0" y="0" width="1" height="1"
          >
            <g filter={`url(#${id}-inkRagged)`} fill="white">
              <circle ref={c0} cx=".5" cy=".5" r="0"/>
              <circle ref={c1} cx=".5" cy=".5" r="0"/>
              <circle ref={c2} cx=".5" cy=".5" r="0"/>
            </g>
          </mask>
        </defs>
      </svg>

      {/* INK OVERLAY (visible splat) */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: inkColor,
          WebkitMask: `url(#${id}-inkMask)`,
          mask: `url(#${id}-inkMask)`,
          maskType: "luminance",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* CONTENT: kept below overlay, then faded-in when overlay vanishes */}
      <div className="relative z-10" style={{ opacity: showChildren ? 1 : 0, transition: "opacity 360ms ease-out" }}>
        {children}
      </div>

      {/* splash ring */}
      {!reduce && (
        <div className="pointer-events-none absolute inset-0 z-30 grid place-items-center">
          <div
            className="rounded-full border border-rose-400/60"
            style={{ width: 96, height: 96, animation: `${id}-ring 260ms ease-out forwards` }}
          />
          <style>{`
            @keyframes ${id}-ring { from { opacity:.35; transform:scale(0) } to { opacity:0; transform:scale(6) } }
          `}</style>
        </div>
      )}
    </div>
  );
}
