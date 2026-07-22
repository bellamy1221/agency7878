"use client";

import { motion, useReducedMotion } from "motion/react";

/** Site ends on a hollow outline TSBLV with a calm soft color drift. */
export function BrandMarkFooter() {
  const reduce = useReducedMotion();

  return (
    <footer className="relative mt-4 overflow-hidden md:mt-6">
      <div className="relative mx-auto flex min-h-[28vw] max-w-[1400px] select-none items-end justify-center overflow-hidden md:min-h-[22vw]">
        <motion.p
          aria-hidden
          className="brand-mark-outline translate-y-[38%] text-center font-sans text-[clamp(7rem,28vw,24rem)] font-semibold leading-none tracking-[-0.07em]"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          TSBLV
        </motion.p>
      </div>
    </footer>
  );
}
