"use client";

import { motion, useReducedMotion } from "motion/react";

type FaqNudgeProps = {
  q: string;
  a: string;
  className?: string;
};

/** Tiny Q&A square for empty corners while scrolling. */
export function FaqNudge({ q, a, className = "" }: FaqNudgeProps) {
  const reduce = useReducedMotion();

  return (
    <motion.aside
      className={`w-[7.5rem] rounded-xl border border-white/12 bg-[#1a1714]/75 p-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md md:w-[8.25rem] ${className}`}
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -3, scale: 1.03 }}
    >
      <p className="text-[11px] font-semibold leading-snug text-[#f4efe7]">{q}</p>
      <p className="mt-1.5 text-[10px] leading-snug text-[#b7a99a]">{a}</p>
    </motion.aside>
  );
}
