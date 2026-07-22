"use client";

import { SquaresFour, ListBullets } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ArchiveCategory, Project } from "@/data/projects";

const categories: Array<"Все" | ArchiveCategory> = [
  "Все",
  "Сайты",
  "Telegram",
  "Интерфейсы",
  "Эксперименты",
];

type ArchiveViewProps = {
  projects: Project[];
};

export function ArchiveView({ projects }: ArchiveViewProps) {
  const years = useMemo(
    () =>
      Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a),
    [projects],
  );

  const [category, setCategory] = useState<"Все" | ArchiveCategory>("Все");
  const [year, setYear] = useState<"Все" | number>("Все");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = projects.filter((project) => {
    const byCategory =
      category === "Все" || project.archiveCategory === category;
    const byYear = year === "Все" || project.year === year;
    return byCategory && byYear;
  });

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Категория">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`inline-flex h-10 items-center rounded-full border px-4 text-sm transition-colors ${
                  category === item
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-transparent text-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Год">
            <button
              type="button"
              onClick={() => setYear("Все")}
              className={`inline-flex h-9 items-center rounded-full border px-3 font-mono text-xs uppercase tracking-[0.12em] ${
                year === "Все"
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border text-muted"
              }`}
            >
              Все годы
            </button>
            {years.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setYear(item)}
                className={`inline-flex h-9 items-center rounded-full border px-3 font-mono text-xs uppercase tracking-[0.12em] ${
                  year === item
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-muted"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Вид">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            aria-label="Сетка"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
              view === "grid"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted"
            }`}
          >
            <SquaresFour size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label="Список"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border ${
              view === "list"
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted"
            }`}
          >
            <ListBullets size={18} weight="bold" />
          </button>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Найдено: {filtered.length}
      </p>

      {view === "grid" ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface transition-colors hover:border-foreground/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {project.archiveCategory} · {project.year}
                </p>
                <h2 className="text-lg font-medium tracking-tight">{project.title}</h2>
                <p className="text-sm text-muted">{project.status}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {filtered.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/work/${project.slug}`}
                className="grid grid-cols-[72px_1fr] items-center gap-4 py-4 transition-colors hover:bg-muted-soft/60 md:grid-cols-[88px_1.4fr_1fr_0.8fr_0.7fr]"
              >
                <div className="relative h-14 w-[72px] overflow-hidden rounded-md border border-border md:h-16 md:w-[88px]">
                  <Image
                    src={project.cover}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>
                <p className="font-medium tracking-tight">{project.title}</p>
                <p className="hidden text-sm text-muted md:block">
                  {project.archiveCategory}
                </p>
                <p className="hidden font-mono text-xs uppercase tracking-[0.12em] text-muted md:block">
                  {project.year}
                </p>
                <p className="col-span-2 text-sm text-muted md:col-span-1 md:text-right">
                  {project.status}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          По выбранным фильтрам пока ничего нет. Сбросьте категорию или год.
        </p>
      ) : null}
    </div>
  );
}
