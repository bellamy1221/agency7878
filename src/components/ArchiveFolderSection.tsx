"use client";

import { motion, useReducedMotion } from "motion/react";
import { FaqNudge } from "@/components/FaqNudge";
import { ProjectFolder } from "@/components/folder/ProjectFolder";
import { Reveal } from "@/components/Reveal";

export function ArchiveFolderSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex snap-start flex-col justify-center overflow-hidden border-b border-border/60 py-10 md:py-12 lg:py-14">
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f86f5]/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      ) : null}

      <FaqNudge
        q="Что внутри архива?"
        a="Короткие идеи и интерфейсы, которые не вошли в избранное."
        className="absolute left-3 top-[18%] z-20 hidden max-w-[8rem] xl:left-6 xl:block 2xl:left-10"
      />
      <FaqNudge
        q="Можно взять идею как основу?"
        a="Да. Адаптируем под ваш оффер и аудиторию."
        className="absolute right-3 top-[18%] z-20 hidden max-w-[8rem] xl:right-6 xl:block 2xl:right-10"
      />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-4 md:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-foreground md:text-2xl">
              Ещё идеи в архиве
            </h2>
            <p className="mx-auto mt-1.5 max-w-md text-[13px] leading-relaxed text-muted">
              Короткие сайты, интерфейсы и эксперименты. Откройте папку или
              перейдите в полный архив.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-3 w-full md:mt-4">
          <ProjectFolder compact />
        </Reveal>
      </div>
    </section>
  );
}
