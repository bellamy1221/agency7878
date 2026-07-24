"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const LOUVER_COUNT = 14;
const STORAGE_KEY = "tsblv-glass-louvers-v2";

type LoadingScreenProps = {
  onDone?: () => void;
};

/**
 * Hero-only intro: horizontal glass louvers rotate open, then dissolve.
 * Does not persist on the page after exit.
 */
export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"closed" | "open" | "fade" | "gone">(
    "closed",
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen === "1" || reduce) {
        const skipTimer = window.setTimeout(() => {
          setPhase("gone");
          onDone?.();
        }, 0);
        return () => window.clearTimeout(skipTimer);
      }
    }

    const openTimer = window.setTimeout(() => setPhase("open"), 480);
    const fadeTimer = window.setTimeout(() => setPhase("fade"), 480 + 1100);
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("gone");
      onDone?.();
    }, 480 + 1100 + 480);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reduce, onDone]);

  return (
    <AnimatePresence>
      {phase !== "gone" ? (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "fade" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[#0c0b0a]/88" />

          <div
            className="absolute inset-0 flex flex-col"
            style={{ perspective: "2200px", transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: LOUVER_COUNT }).map((_, i) => {
              const delay = i * 0.045;
              return (
                <motion.div
                  key={i}
                  className="relative w-full flex-1 origin-center will-change-transform"
                  style={{
                    transformStyle: "preserve-3d",
                    background:
                      "linear-gradient(180deg, rgba(255,248,238,0.14) 0%, rgba(180,168,152,0.08) 42%, rgba(40,36,32,0.55) 100%)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.35)",
                    backdropFilter: "blur(10px) saturate(1.05)",
                    WebkitBackdropFilter: "blur(10px) saturate(1.05)",
                  }}
                  initial={{ rotateX: 0, opacity: 1 }}
                  animate={
                    phase === "closed"
                      ? { rotateX: 0, opacity: 1 }
                      : {
                          rotateX: -82,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 1.05,
                    delay,
                    ease: [0.45, 0.05, 0.2, 1],
                  }}
                >
                  {/* Glass highlight edge */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    aria-hidden
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={
              phase === "closed"
                ? { opacity: 1 }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 0.45 }}
          >
            <p className="text-2xl font-semibold tracking-[-0.04em] text-[#f4efe7]/95 md:text-3xl">
              TSBLV
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
