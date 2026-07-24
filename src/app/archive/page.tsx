import type { Metadata } from "next";
import { ArchiveScrollReset } from "@/components/ArchiveScrollReset";
import { ArchiveView } from "@/components/ArchiveView";
import { getArchiveProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Архив",
  description:
    "Архив TSBLV: сайты, цифровые продукты, Telegram Mini Apps и визуальные эксперименты.",
};

export default function ArchivePage() {
  const projects = getArchiveProjects();

  return (
    <div className="archive-page min-h-[100dvh]">
      <ArchiveScrollReset />
      <div className="mx-auto max-w-[1460px] px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-8 border-b border-current/15 pb-8 md:pb-10">
          <div>
            <p className="archive-kicker">TSBLV / АРХИВ 2026</p>
            <h1 className="mt-4 text-[clamp(3.6rem,8vw,7.5rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
              Архив<span className="archive-title-mark">.</span>
            </h1>
          </div>
          <div className="pb-1 font-mono text-[9px] uppercase tracking-[0.14em] text-current/50">
            <span>{projects.length} локальных работ</span>
          </div>
        </header>

        <ArchiveView projects={projects} />
      </div>
    </div>
  );
}
