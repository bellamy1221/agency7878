"use client";

import { FaqNudge } from "@/components/FaqNudge";
import { Reveal } from "@/components/Reveal";
import { WorkShowcase } from "@/components/WorkShowcase";
import { getFeaturedProjects } from "@/data/projects";

export function SelectedWork() {
  const projects = getFeaturedProjects();

  return (
    <section
      id="work"
      className="relative flex snap-start flex-col border-b border-white/10 py-10 md:py-12 lg:py-14"
    >
      <FaqNudge
        q="Почему концепции, а не кейсы?"
        a="Показываю подход к работе. Живой проект собираю уже под вашу задачу."
        className="absolute right-3 top-16 z-20 hidden max-w-[8rem] xl:block xl:right-6 xl:top-20 2xl:right-10"
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col overflow-x-hidden px-4 md:px-6 lg:px-8">
        <Reveal>
          <div className="mb-4 shrink-0 text-center lg:mb-5 lg:max-w-[70%] lg:text-left">
            <h2 className="text-xl font-semibold tracking-[-0.035em] md:text-2xl lg:text-[1.65rem]">
              Избранные работы
            </h2>
            <p className="mx-auto mt-1 max-w-2xl text-[13px] leading-relaxed text-muted lg:mx-0">
              Несколько проектов, показывающих мой подход к дизайну, структуре и
              разработке.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <WorkShowcase projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
