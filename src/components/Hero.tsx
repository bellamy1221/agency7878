"use client";

import { ArrowDownRight, ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Link from "next/link";
import { HeroComposition } from "@/components/HeroComposition";
import { MagneticLink } from "@/components/MagneticLink";
import { site } from "@/data/site";

export function Hero() {
  // Keep the first viewport visible before Motion has hydrated. The directional
  // preview still animates when its active tab changes.
  const line = () => ({});

  return (
    <section className="relative flex min-h-[100dvh] snap-start items-center overflow-hidden pb-16 pt-20 text-[#f4efe7] md:pb-20 md:pt-24 lg:py-20">
      <div className="relative z-[2] mx-auto grid w-full max-w-[1460px] items-center gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
        <div className="lg:col-span-5 lg:pr-4">
          <motion.div className="mb-6 flex items-center gap-3" {...line()}>
            <span className="h-px w-8 bg-[#cd6a4b]" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#b7aba0]">
              Независимая digital-студия
            </p>
          </motion.div>

          <motion.h1
            className="max-w-[15ch] text-[clamp(2.75rem,4.35vw,4.4rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#f7f2ea]"
            {...line()}
          >
            Сильный визуал. Рабочий продукт.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-[39ch] text-[15px] leading-[1.65] text-[#aaa096] md:text-base"
            {...line()}
          >
            Проектирую бизнес-сайты и цифровые продукты: структура, арт-дирекшн и
            рабочий frontend в одном процессе.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...line()}>
            <Link
              href="/archive"
              className="btn-cta-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              Смотреть работы
              <ArrowDownRight size={16} weight="bold" />
            </Link>
            <MagneticLink
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-ghost inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium"
            >
              Начать проект
              <ArrowRight size={16} weight="bold" />
            </MagneticLink>
          </motion.div>

        </div>

        <motion.div
          className="relative lg:col-span-7"
          initial={false}
        >
          <HeroComposition />
        </motion.div>
      </div>
    </section>
  );
}
