import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import "./index.css";
import { Projects } from "./components/Projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// keep a single Lenis instance across renders
let _lenis = null;

function setupLenisOnce() {
  if (typeof window === "undefined" || _lenis) return _lenis;

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Proxy body scrolling so ScrollTrigger uses Lenis
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      return arguments.length
        ? lenis.scrollTo(value, { immediate: true })
        : lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: innerWidth, height: innerHeight };
    },
  });

  const onRefresh = () => lenis.resize();
  ScrollTrigger.addEventListener("refresh", onRefresh);
  ScrollTrigger.refresh();

  _lenis = lenis;
  return _lenis;
}


export default function App() {
  const [ready, setReady] = useState(false);
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    setupLenisOnce();
  }, []);

  useEffect(() => {
    if (!_lenis) return;
    if (!ready) {
      _lenis.stop();  
    } else {
      _lenis.start();    
      ScrollTrigger.refresh();  
    }
  }, [ready]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const fontsReady = document.fonts?.ready ?? Promise.resolve();
        await Promise.all([fontsReady, delay(3000)]);
      } catch {}
      if (alive) setReady(true);
    })();
    return () => { alive = false; };
  }, []);

  return (
    <>
      <Navbar />
      <AnimatePresence>
        {!ready && <Preloader onDone={() => {}} duration={900} />}
      </AnimatePresence>

      {ready && (
        <main>
          <Hero />
          <About />
          <Projects />
        </main>
      )}
    </>
  );
}
