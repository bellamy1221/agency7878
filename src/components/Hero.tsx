"use client";

import { ArrowRight, ArrowDownRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const stages = [
  {
    id: "task",
    label: "Задача",
    text: "Нужен сайт, который приводит заявки, а не просто «красиво выглядит».",
  },
  {
    id: "structure",
    label: "Структура",
    text: "Собираю понятный путь: оффер, доказательства, услуги, следующий шаг.",
  },
  {
    id: "design",
    label: "Дизайн",
    text: "Делаю сильную подачу без шума: тип, ритм, акцент, адаптив.",
  },
  {
    id: "live",
    label: "Работающий сайт",
    text: "Запускаю продукт с формами, скоростью и ясным контактом.",
  },
] as const;

const proofs = [
  "Дизайн и разработка в одном месте",
  "Прямое общение без менеджеров",
  "Адаптив, формы и запуск",
  "Работаю по понятным этапам",
];

export function Hero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((v) => (v + 1) % stages.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const stage = stages[active];

  return (
    <section className="relative overflow-x-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(198,93,58,0.10),transparent_36%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 pb-12 pt-10 md:px-6 md:pb-14 md:pt-12 lg:min-h-[calc(100svh-4.25rem)] lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:pb-10 lg:pt-10">
        <div className="lg:col-span-7">
          <p className="editorial-label mb-4">
            Дизайн и разработка для малого бизнеса
          </p>

          <h1 className="max-w-5xl text-[clamp(2.1rem,4.6vw,3.85rem)] font-medium leading-[1.06] tracking-tight text-foreground">
            Сайты и цифровые продукты, которые помогают получать{" "}
            <span className="font-serif-accent text-[1.03em]">заявки</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Проектирую и запускаю лендинги, сайты, Telegram Mini Apps и интерфейсы
            для малого бизнеса, экспертов и частных проектов.
          </p>

          <p className="mt-3 max-w-lg border-l-2 border-accent/45 pl-4 text-sm leading-relaxed text-foreground/75 md:text-[15px]">
            Понятная структура, сильная визуальная подача и аккуратные анимации.
            Без лишней сложности и агентской наценки.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm"
            >
              Обсудить проект
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link
              href="/#work"
              className="btn-secondary inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm text-foreground"
            >
              Смотреть работы
              <ArrowDownRight size={16} weight="bold" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {proofs.map((item) => (
              <li
                key={item}
                className="border-t border-border pt-2 text-sm text-foreground/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div
            className="rounded-[var(--radius-editorial)] border border-border bg-surface p-4 md:p-5"
            onPointerMove={(e) => {
              if (reduce || e.pointerType !== "mouse") return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = (e.clientX - rect.left) / rect.width;
              setActive(Math.min(stages.length - 1, Math.floor(ratio * stages.length)));
            }}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="editorial-label">Краткий бриф</p>
              <p className="font-mono text-[11px] text-muted">
                0{active + 1} / 0{stages.length}
              </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {stages.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="min-h-[148px] rounded-lg border border-border bg-background p-4"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {stage.label}
                </p>
                <p className="mt-3 text-lg font-medium leading-snug tracking-tight md:text-xl">
                  {stage.text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center gap-2">
              {stages.map((item, index) => (
                <span
                  key={item.id}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    index <= active ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
