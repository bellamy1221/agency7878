import type { Metadata } from "next";
import { ArchiveView } from "@/components/ArchiveView";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Архив",
  description:
    "Архив работ TSBLV: концепции сайтов, интерфейсы, Telegram Mini Apps и визуальные эксперименты.",
};

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 md:py-20 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">Архив</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Концепции, эксперименты и работы вне избранного. У каждой позиции
          честный статус: коммерческий проект, концепт или эксперимент.
        </p>
      </div>
      <ArchiveView projects={projects} />
    </div>
  );
}
