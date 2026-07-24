"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const archiveNotes = [
  ["A.01", "Типографические системы", "Эксперимент"],
  ["A.02", "Интерфейсные состояния", "UI study"],
  ["A.03", "Короткие продуктовые идеи", "Концепции"],
] as const;

export function ArchiveFolderSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative snap-start overflow-hidden border-b border-white/10 py-24 md:py-32 lg:py-40">
      <motion.div
        className="archive-teaser-orb"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1460px] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-10">
        <Reveal className="lg:col-span-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d09a85]">
            Архив / 03
          </p>
          <h2 className="mt-5 max-w-[10ch] text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
            Идеи, пробы, системы.
          </h2>
          <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.7] text-muted md:text-base">
            Рабочая полка студии: визуальные эксперименты и продуктовые наброски,
            которые показывают диапазон подходов вне главной пятёрки.
          </p>
          <Link
            href="/archive"
            className="btn-cta-primary mt-8 inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
          >
            Открыть каталог
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
          <div className="border-t border-white/12">
            {archiveNotes.map(([index, title, status]) => (
              <div
                key={index}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 py-5"
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#d87350]">
                  {index}
                </span>
                <span className="text-sm font-medium tracking-[-0.015em] transition-transform duration-300 group-hover:translate-x-1 md:text-base">
                  {title}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#746c64]">
                  {status}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-right font-mono text-[9px] uppercase tracking-[0.14em] text-[#655e57]">
            10 позиций · обновляется
          </p>
        </Reveal>
      </div>
    </section>
  );
}
