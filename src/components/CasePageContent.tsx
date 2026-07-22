import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/data/projects";
import { getAdjacentProjects } from "@/data/projects";
import { site } from "@/data/site";

type CasePageProps = {
  project: Project;
};

export function CasePageContent({ project }: CasePageProps) {
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <article>
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-14 lg:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft size={14} weight="bold" />
            К работам
          </Link>

          <div className="mt-8 max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {project.category} · {project.year}
              {project.isConcept ? " · Независимая концепция" : ""}
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-tight md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {project.summary}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-10 md:px-6 lg:px-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-editorial)] border border-border">
          <Image
            src={project.cover}
            alt={`Обложка проекта ${project.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-10 md:grid-cols-12 md:gap-12 md:px-6 md:py-16 lg:px-8">
        <section className="md:col-span-5">
          <h2 className="text-2xl font-medium tracking-tight">Контекст</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {project.context}
          </p>
        </section>
        <section className="md:col-span-6 md:col-start-7">
          <h2 className="text-2xl font-medium tracking-tight">Задача</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {project.problem}
          </p>
        </section>
      </div>

      <div className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:px-8 lg:py-20">
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Подход</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {project.objective}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Решение</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              {project.solution}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted"
                >
                  {service}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:px-8 lg:py-20">
        <section>
          <h2 className="text-2xl font-medium tracking-tight">Функциональность</h2>
          <ul className="mt-4 space-y-3">
            {project.functionality.map((item) => (
              <li
                key={item}
                className="border-t border-border pt-3 text-sm text-foreground/85"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight">
            Визуальное направление
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {project.visualDirection}
          </p>
        </section>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-6 lg:px-8 lg:py-10">
        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
          Кадры и адаптив
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-12">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-editorial)] border border-border md:col-span-7">
            <Image
              src={project.gallery[0] ?? project.cover}
              alt={`${project.title}: основной экран`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-editorial)] border border-border md:col-span-5">
            <Image
              src={project.gallery[1] ?? project.cover}
              alt={`${project.title}: дополнительный экран`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[var(--radius-editorial)] border border-border md:col-span-4 md:col-start-5">
            <Image
              src={project.gallery[2] ?? project.cover}
              alt={`${project.title}: мобильный экран`}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-14 md:grid-cols-3 md:px-6 lg:px-8 lg:py-16">
        <section className="rounded-[var(--radius-editorial)] border border-border bg-surface p-6 md:p-7">
          <h2 className="text-lg font-medium tracking-tight">Вклад</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.contribution}
          </p>
        </section>
        <section className="rounded-[var(--radius-editorial)] border border-border bg-surface p-6 md:p-7">
          <h2 className="text-lg font-medium tracking-tight">Разработка</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.development}
          </p>
        </section>
        <section className="rounded-[var(--radius-editorial)] border border-border bg-surface p-6 md:p-7">
          <h2 className="text-lg font-medium tracking-tight">Результат</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{project.outcome}</p>
          {project.isConcept ? (
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Независимая концепция
            </p>
          ) : null}
        </section>
      </div>

      <div className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-5 px-4 py-10 md:flex-row md:items-center md:px-6 md:py-12 lg:px-8">
          <h2 className="max-w-md text-xl font-medium tracking-tight md:text-2xl">
            Нужен сайт с похожим уровнем проработки?
          </h2>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <PaperPlaneTilt size={16} weight="bold" />
            Обсудить проект
          </a>
        </div>
      </div>

      <nav aria-label="Соседние проекты" className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group flex items-center gap-4 border-b border-border px-4 py-8 transition-colors hover:bg-muted-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent md:border-b-0 md:border-r md:px-6 lg:px-8"
            >
              <ArrowLeft size={18} className="text-muted" weight="bold" />
              <div>
                <p className="editorial-label mb-2">Предыдущий</p>
                <p className="text-lg font-medium tracking-tight group-hover:text-accent">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-end gap-4 px-4 py-8 text-right transition-colors hover:bg-muted-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent md:px-6 lg:px-8"
            >
              <div>
                <p className="editorial-label mb-2">Следующий</p>
                <p className="text-lg font-medium tracking-tight group-hover:text-accent">
                  {next.title}
                </p>
              </div>
              <ArrowRight size={18} className="text-muted" weight="bold" />
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
