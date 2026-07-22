import { ArchiveFolderSection } from "@/components/ArchiveFolderSection";
import { Reveal } from "@/components/Reveal";
import { WorkShowcase } from "@/components/WorkShowcase";
import { getFeaturedProjects } from "@/data/projects";

export function SelectedWork() {
  const projects = getFeaturedProjects();

  return (
    <section
      id="work"
      className="scroll-mt-24 border-b border-border lg:min-h-[130svh]"
    >
      <div className="mx-auto max-w-[1400px] overflow-x-hidden px-4 py-14 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="mb-8 max-w-3xl md:mb-10">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
              Избранные работы
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              Пять концепций под реальные задачи малого бизнеса: от сайта ресторана
              до интерактивного конфигуратора.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <WorkShowcase projects={projects} />
        </Reveal>

        <ArchiveFolderSection />
      </div>
    </section>
  );
}
