"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { HeroComposition } from "@/components/HeroComposition";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(198,93,58,0.11),transparent_38%),radial-gradient(circle_at_92%_18%,rgba(22,21,19,0.04),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-[1400px] items-end gap-10 px-4 pb-16 pt-12 md:px-6 md:pb-24 md:pt-14 lg:min-h-[calc(100dvh-68px)] lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-12">
        <div className="lg:col-span-7 lg:pb-6">
          <motion.div
            className="mb-6 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="editorial-label">Независимая студия</p>
            <span className="note-chip">для малого бизнеса и экспертов</span>
          </motion.div>

          <motion.h1
            className="max-w-[18ch] text-[clamp(2.35rem,5.4vw,4.6rem)] font-medium leading-[1.04] tracking-tight text-foreground lg:max-w-none"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            Сайты, которые приятно смотреть и удобно{" "}
            <span className="font-serif-accent text-[1.04em]">использовать</span>.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Проектирую и разрабатываю выразительные сайты и цифровые продукты для
            малого бизнеса, экспертов и частных проектов.
          </motion.p>

          <motion.p
            className="mt-3 max-w-lg border-l-2 border-accent/50 pl-4 text-sm leading-relaxed text-foreground/75 md:text-[15px]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
          >
            Понятная структура, сильная подача и аккуратные анимации без лишней
            сложности.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <Link
              href="/#work"
              className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm"
            >
              Смотреть работы
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link
              href="/#contact"
              className="btn-secondary inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm text-foreground"
            >
              Обсудить проект
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:col-start-8"
        >
          <HeroComposition />
        </motion.div>
      </div>
    </section>
  );
}
