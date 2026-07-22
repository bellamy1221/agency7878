"use client";

import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/projects";

function PreviewVisual({ project }: { project: Project }) {
  if (project.layout === "split-right") {
    return (
      <div className="relative min-h-[240px] md:min-h-[300px]">
        <div className="absolute left-0 top-2 w-[70%] overflow-hidden rounded-xl border border-border bg-surface shadow-[0_12px_30px_rgba(22,21,19,0.08)]">
          <div className="browser-chrome">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={project.cover} alt="" fill sizes="50vw" className="object-cover" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-[38%] overflow-hidden rounded-[1.2rem] border border-border bg-background shadow-lg">
          <div className="relative aspect-[9/15]">
            <Image
              src={project.gallery[2] ?? project.cover}
              alt=""
              fill
              sizes="28vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  if (project.layout === "compact") {
    return (
      <div className="grid gap-2">
        <div className="overflow-hidden rounded-[var(--radius-editorial)] border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <p className="editorial-label">Комната</p>
            <p className="font-mono text-[10px] text-muted">estimate</p>
          </div>
          <div className="relative aspect-[16/9]">
            <Image src={project.cover} alt="" fill sizes="55vw" className="object-cover" />
            <div className="absolute bottom-2 left-2 rounded-md border border-border bg-background/90 px-2 py-1">
              <p className="text-xs font-medium">от 186 000 ₽</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[project.gallery[0], project.gallery[1], project.gallery[2]].map((src, i) => (
            <div key={src ?? i} className="overflow-hidden rounded-md border border-border">
              <div className="relative aspect-[4/3]">
                <Image
                  src={src ?? project.cover}
                  alt=""
                  fill
                  sizes="18vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.layout === "editorial") {
    return (
      <div className="relative">
        <div className="browser-chrome rounded-t-[var(--radius-editorial)] border border-b-0 border-border">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-b-[var(--radius-editorial)] border border-border">
          <Image src={project.cover} alt="" fill sizes="55vw" className="object-cover" />
        </div>
        <div className="absolute -left-2 bottom-4 hidden w-32 -rotate-2 rounded-lg border border-border bg-background p-2 shadow-sm md:block">
          <p className="editorial-label mb-1">Запись</p>
          <p className="text-xs text-muted">услуги · доверие · заявка</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface shadow-[0_12px_30px_rgba(22,21,19,0.07)]">
      <div className="browser-chrome">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted">
          {project.slug}.tsblv.studio
        </span>
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={project.cover}
          alt={`Превью ${project.title}`}
          fill
          sizes="55vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export function WorkShowcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = projects[active];

  const go = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setActive(next);
  };

  return (
    <div>
      <div className="hidden gap-8 lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4" role="listbox" aria-label="Список проектов">
          {projects.map((item, index) => {
            const isActive = index === active;
            return (
              <button
                key={item.slug}
                type="button"
                role="option"
                aria-selected={isActive}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`flex w-full items-start justify-between gap-3 border-b border-border px-1 py-4 text-left transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    0{index + 1} · {item.category}
                  </p>
                  <p
                    className={`mt-1 text-lg tracking-tight ${
                      isActive ? "font-medium" : "font-normal"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    isActive ? "bg-accent" : "bg-border"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-[var(--radius-editorial)] border border-border bg-surface p-4 md:p-5"
            >
              <PreviewVisual project={project} />
              <div className="mt-5 grid gap-4 md:grid-cols-[1.2fr_auto] md:items-end">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {project.year}
                    {project.isConcept ? " · Независимая концепция" : ""}
                  </p>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {project.objective}
                  </p>
                  <p className="mt-2 text-sm text-foreground/80">
                    {project.services.join(", ")}
                  </p>
                </div>
                <Link
                  href={`/work/${project.slug}`}
                  className="btn-primary inline-flex h-11 items-center gap-2 self-start rounded-full px-5 text-sm md:self-end"
                >
                  Смотреть кейс
                  <ArrowUpRight size={15} weight="bold" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
            0{active + 1} / 0{projects.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Предыдущий проект"
              onClick={() => go(active - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Следующий проект"
              onClick={() => go(active + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((item, index) => (
            <article
              key={item.slug}
              className="w-[86%] shrink-0 snap-center rounded-[var(--radius-editorial)] border border-border bg-surface p-3"
              onClick={() => setActive(index)}
            >
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="relative aspect-[16/11]">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="85vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                {item.category}
              </p>
              <h3 className="mt-1 text-xl font-medium tracking-tight">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{item.summary}</p>
              <Link
                href={`/work/${item.slug}`}
                className="mt-3 inline-flex items-center gap-1 text-sm text-accent"
              >
                Смотреть кейс
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
