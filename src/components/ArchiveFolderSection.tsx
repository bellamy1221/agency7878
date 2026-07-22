"use client";

import Link from "next/link";
import { ProjectFolder } from "@/components/folder/ProjectFolder";
import { Reveal } from "@/components/Reveal";

export function ArchiveFolderSection() {
  return (
    <section className="mt-12 border-t border-border pt-10 md:mt-14 md:pt-12">
      <Reveal>
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <p className="editorial-label mb-3">Ещё работы</p>
            <p className="max-w-sm text-base leading-relaxed text-muted md:text-lg">
              Небольшие проекты, интерфейсы и эксперименты лежат в архиве.
            </p>
            <Link
              href="/archive"
              className="btn-secondary mt-5 inline-flex h-11 items-center rounded-full border border-foreground/20 px-5 text-sm"
            >
              Открыть архив
            </Link>
          </div>
          <div className="mx-auto w-full max-w-md scale-[0.92] overflow-x-hidden lg:mx-0 lg:justify-self-end">
            <ProjectFolder />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
