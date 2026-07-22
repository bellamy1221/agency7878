"use client";

import { motion, useReducedMotion } from "motion/react";

const PHRASE = "Как мы делали CPV";
const ROW = Array.from({ length: 8 }, () => PHRASE);

/** North Ossetia flag neon: white → yellow → red, scrolling ticker. */
export function NeonFlagMarquee() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-t border-white/10 py-3">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#100f0e] to-transparent md:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#100f0e] to-transparent md:w-28"
        aria-hidden
      />

      <motion.div
        className="flex w-max gap-10 whitespace-nowrap will-change-transform"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 28, ease: "linear", repeat: Infinity }
        }
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-10 px-2">
            {ROW.map((text, i) => (
              <span
                key={`${copy}-${i}`}
                className="neon-ossetia font-mono text-[11px] font-semibold uppercase tracking-[0.28em] md:text-[12px]"
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
