import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects
    .filter((project) => project.demoPath)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.demoPath) return { title: "Демо не найдено" };

  return {
    title: `${project.title} — интерактивная версия`,
    description: project.summary,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.demoPath) notFound();

  return (
    <article className="min-h-[100dvh] bg-[#121110] text-[#f5f0e8]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1460px] flex-col gap-6 px-5 py-7 md:flex-row md:items-end md:justify-between md:px-8 lg:px-10">
          <div>
            <Link
              href="/archive"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-white/55 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cd6a4b]"
            >
              <ArrowLeft size={15} weight="bold" />
              К архиву
            </Link>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[#d09a85]">
              Локальная интерактивная версия
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
              {project.title}
            </h1>
          </div>
          <a
            href={project.demoPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 self-start border-b border-white/30 text-sm font-semibold transition-colors hover:border-[#cd6a4b] hover:text-[#d87350] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cd6a4b] md:self-auto"
          >
            Открыть на весь экран <ArrowUpRight size={15} weight="bold" />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1540px] px-3 py-5 md:px-6 md:py-8 lg:px-8">
        <div className="overflow-hidden rounded-[1.15rem] border border-white/15 bg-white shadow-[0_1.5rem_5rem_rgb(0_0_0_/_0.34)]">
          <iframe
            title={`Интерактивная версия проекта ${project.title}`}
            src={project.demoPath}
            className="block h-[calc(100dvh-11.5rem)] min-h-[40rem] w-full bg-white"
            sandbox="allow-forms allow-modals allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </article>
  );
}
