import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { getArchiveProjects } from "@/data/projects";

export function HomeArchive() {
  const projects = getArchiveProjects();

  return (
    <section
      id="archive-preview"
      aria-labelledby="home-archive-title"
      className="scroll-mt-20 border-t border-white/10 py-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1460px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-7 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Other work / {String(projects.length).padStart(2, "0")}
              </p>
              <h2
                id="home-archive-title"
                className="mt-3 text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.06em]"
              >
                Archive
              </h2>
            </div>
            <Link
              href="/archive"
              className="inline-flex min-h-11 items-center self-start border-b border-white/28 text-sm font-semibold transition-colors hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:self-auto"
            >
              Открыть полный архив <span className="ml-2" aria-hidden>↗</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * 0.035, 0.16)}>
              <ProjectCard project={project} index={index} compact priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
