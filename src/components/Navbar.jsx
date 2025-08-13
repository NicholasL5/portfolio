import { useState } from "react";
import fallbackLogo from "../assets/mylogo-gray.png";
import { MenuDrawer } from "./MenuDrawer";

export function Navbar({ logoSrc }) {
  const [open, setOpen] = useState(false);
  const src = logoSrc ?? fallbackLogo;

  return (
    <nav className="fixed inset-x-0 top-0 z-40">
      <div className="h-20 md:h-24 bg-transparent">
        <div className="relative h-full">
          <a
            href="/"
            className="absolute left-[7%] top-1/2 -translate-y-1/2 inline-flex items-center gap-2"
          >
            <img
              src={src}
              alt="NL logo"
              className="h-12 md:h-14 w-auto select-none"
              draggable="false"
            />
          </a>

          {/* Hamburger bigger, positioned ~70% from left on sm+ */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="
                absolute top-1/2 -translate-y-1/2
                right-[50%]                         /* mobile: 5% from right */
                sm:right-auto sm:left-[48vw] sm:translate-x-0  /* laptop+: 70% of viewport */
                inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center
                rounded-md hover:bg-white/10
            "
          >
            {/* bars */}
            <span
              className={`absolute block h-[3px] md:h-1 w-8 md:w-9 rounded bg-bg 
                will-change-transform transition-transform ease-out duration-500 
                ${open ? "translate-y-0 rotate-45" : "-translate-y-3"
              }`}
            />
            <span
              className={`absolute block h-[3px] md:h-1 w-8 md:w-9 rounded bg-bg transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-[3px] md:h-1 w-8 md:w-9 rounded bg-bg 
                will-change-transform transition-transform ease-out duration-500 delay-75 
                ${open ? "translate-y-0 -rotate-45" : "translate-y-3"
              }`}
            />
          </button>

          <MenuDrawer open={open} onClose={() => setOpen(false)} />

        </div>
      </div>
    </nav>
  );
}
