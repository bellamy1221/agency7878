import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ProjectFeature } from "@/components/ProjectFeature";
import { getFeaturedProjects } from "@/data/projects";

export function SelectedWork() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <Reveal>
          <div className="mb-12 grid gap-6 md:mb-20 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="editorial-label mb-4">Работы</p>
              <h2 className="max-w-xl text-3xl font-medium tracking-tight md:text-5xl">
                Избранные{" "}
                <span className="font-serif-accent">концепции</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted md:justify-self-end md:text-right md:text-base">
              Разные форматы подачи специально: от immersive-сайта до слоёв
              интерфейса. Все кейсы честно помечены как независимые концепции.
            </p>
          </div>
        </Reveal>

        <div className="section-rule mb-14 md:mb-20" />

        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={Math.min(index * 0.03, 0.12)}
              className={index === 2 ? "md:-mx-2" : undefined}
            >
              <ProjectFeature project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 md:mt-24">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <p className="text-sm text-muted">
              Ещё эксперименты и черновики - в архиве.
            </p>
            <Link
              href="/archive"
              className="inline-flex items-center border-b border-foreground/30 pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              Смотреть полный архив
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
