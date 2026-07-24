import Link from "next/link";
import { ProjectPreviewCover } from "@/components/ProjectPreviewCover";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  className?: string;
  compact?: boolean;
  priority?: boolean;
  archive?: boolean;
};

export function ProjectCard({
  project,
  index,
  className = "",
  compact = false,
  priority = false,
  archive = false,
}: ProjectCardProps) {
  const detailsHref = `/work/${project.slug}`;
  const primaryHref = project.demoPath ?? detailsHref;
  const primaryLabel = project.demoPath ? "Открыть интерактивную версию" : "Открыть разбор проекта";

  if (archive) {
    return (
      <article className={`group min-w-0 ${className}`}>
        <Link
          href={primaryHref}
          className="block rounded-[0.7rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={`${primaryLabel} «${project.title}»`}
        >
          <ProjectPreviewCover
            project={project}
            index={index}
            priority={priority}
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-[4/3] rounded-[0.7rem] border border-current/12"
          />
          <div className="mt-3 flex items-start justify-between gap-3 border-b border-current/12 pb-3">
            <h2 className="text-sm font-medium tracking-[-0.025em] text-current/70">
              {project.projectType}
            </h2>
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-current/45">
              Открыть ↗
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={`group min-w-0 ${className}`}>
      <Link
        href={primaryHref}
        className="block rounded-[0.9rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        aria-label={`${primaryLabel} «${project.title}»`}
      >
        <ProjectPreviewCover
          project={project}
          index={index}
          priority={priority}
          sizes={
            compact
              ? "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              : "(max-width: 768px) 100vw, 58vw"
          }
          className={`${compact ? "aspect-[4/3]" : "aspect-[16/10]"} rounded-[0.9rem] border border-current/12`}
        />
      </Link>

      <div className={compact ? "mt-3" : "mt-4"}>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-current/48">
          {project.category}
        </p>
        <h2
          className={`mt-1 font-semibold tracking-[-0.045em] ${
            compact ? "text-xl" : "text-2xl md:text-3xl"
          }`}
        >
          <Link
            href={primaryHref}
            className="rounded-sm transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
          >
          {project.previewTitle}
          </Link>
        </h2>
        <p className="mt-1.5 text-xs font-medium text-current/52">
          {project.projectType}
        </p>
        <p
          className={`mt-2 text-current/58 ${
            compact ? "text-[13px] leading-[1.55]" : "max-w-[52ch] text-sm leading-relaxed"
          }`}
        >
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            href={primaryHref}
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
          >
            {project.demoPath ? "Открыть сайт" : "Case study"} <span aria-hidden>↗</span>
          </Link>
          {project.demoPath ? (
            <Link
              href={detailsHref}
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-current/55 transition-colors hover:text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
            >
              Case study <span aria-hidden>↗</span>
            </Link>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-current/55 transition-colors hover:text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
            >
              Live project <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
