"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  AnimatePresence,
} from "motion/react";
import type { PointerEvent } from "react";
import { useEffect, useState } from "react";

const notes = [
  {
    id: "a",
    rotate: -3,
    x: "4%",
    y: "8%",
    label: "Заметка",
    text: "Сначала путь гостя, потом декор.",
  },
  {
    id: "b",
    rotate: 2.5,
    x: "52%",
    y: "18%",
    label: "Ритм",
    text: "Крупный тип. Короткий следующий шаг.",
  },
  {
    id: "c",
    rotate: -1.5,
    x: "18%",
    y: "58%",
    label: "Характер",
    text: "Чуть тепла и одна острая деталь.",
  },
];

const ticker = [
  "Кнопка не прячется",
  "Меньше шума - больше ясности",
  "Красиво, но по делу",
];

export function HeroComposition() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setTick((v) => (v + 1) % ticker.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 16);
    y.set(py * 10);
  };

  return (
    <div
      className="relative isolate min-h-[340px] overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface md:min-h-[400px]"
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex items-center justify-between border-b border-border px-4 py-3 md:px-5">
        <p className="editorial-label">Доска идей</p>
        <div className="h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={ticker[tick]}
              initial={reduce ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={reduce ? undefined : { y: -12, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="font-mono text-[11px] text-accent"
            >
              {ticker[tick]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        style={reduce ? undefined : { x: springX, y: springY }}
        className="relative h-[280px] md:h-[330px]"
      >
        {notes.map((note, index) => {
          const isActive = active === index;
          return (
            <button
              key={note.id}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`absolute w-[44%] max-w-[190px] rounded-lg border bg-background p-3 text-left shadow-[0_10px_30px_rgba(22,21,19,0.06)] transition-all duration-400 ease-out md:w-[42%] ${
                isActive
                  ? "z-20 border-foreground/25 scale-[1.03]"
                  : "z-10 border-border opacity-90"
              }`}
              style={{
                left: note.x,
                top: note.y,
                transform: `rotate(${note.rotate}deg)`,
              }}
            >
              <p className="editorial-label mb-2">{note.label}</p>
              <p className="text-sm leading-snug text-foreground">{note.text}</p>
            </button>
          );
        })}

        <div className="absolute bottom-4 right-4 max-w-[180px] rounded-lg border border-dashed border-accent/40 bg-accent-soft/80 px-3 py-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            Напоминание
          </p>
          <p className="mt-1 text-xs leading-snug text-foreground/85">
            Не агентство. Один человек. Прямой разговор.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
