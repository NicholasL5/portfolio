import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Hero } from "./components/Hero";
import { Preloader } from "./components/Preloader";
import "./index.css";

export default function App() {
  const [ready, setReady] = useState(false);
  const delay = (ms) => {
    return new Promise((r) => setTimeout(r, ms));
  }
  useEffect(() => {
    // Wait for fonts so the hero renders with the correct typeface
    let alive = true;
    (async () => {
      try { 
        const fontsReady = document.fonts?.ready ?? Promise.resolve();
        await Promise.all([fontsReady, delay(700)]); 
      } catch {
        console.log('failed')
      }
      // Minimum splash time is inside Preloader (duration)
      if(alive) setReady(true);
    })();
    return () => { alive = false; };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!ready && <Preloader onDone={() => {}} duration={900} />}

        </AnimatePresence>
      {ready && <Hero />}
    </>
  );
}
