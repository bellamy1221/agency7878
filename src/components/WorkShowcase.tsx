"use client";

import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/data/projects";

const tintBySlug: Record<string, string> = {
  "sol-restaurant": "bg-[#f6ebe3]",
  "hrebet-hotel": "bg-[#e8eef1]",
  "alina-vesna": "bg-[#f3ebe8]",
  "stol-mini": "bg-[#e8eef8]",
  primerochnaya: "bg-[#f1ebe0]",
};

/** Unified preview height so switching projects never jumps. */
function PreviewVisual({ project }: { project: Project }) {
  if (project.layout === "split-right") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-y-0 left-0 w-[62%] overflow-hidden rounded-[10px] border border-[#141210]/12 bg-white shadow-[0_10px_24px_rgba(20,18,16,0.08)]">
          <div className="flex items-center justify-between border-b border-[#141210]/10 px-2.5 py-1.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#6b655c]">
              Telegram
            </p>
            <p className="font-mono text-[9px] text-accent">Mini App</p>
          </div>
          <div className="relative h-[calc(100%-2rem)]">
            <Image src={project.cover} alt="" fill sizes="36vw" className="object-cover" />
          </div>
        </div>
        <div className="absolute bottom-[6%] right-[2%] top-[14%] w-[34%] overflow-hidden rounded-[14px] border-[3px] border-[#141210] bg-[#141210] shadow-[0_12px_28px_rgba(20,18,16,0.25)]">
          <Image
            src={project.gallery[2] ?? project.cover}
            alt=""
            fill
            sizes="14vw"
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  if (project.layout === "split-left") {
    return (
      <div className="grid h-full grid-cols-[1.15fr_0.85fr] gap-2.5">
        <div className="flex min-h-0 flex-col overflow-hidden rounded-[10px] border border-[#141210]/12 bg-white shadow-[0_10px_24px_rgba(20,18,16,0.07)]">
          <div className="browser-chrome !bg-[#ece7e0]">
            <span className="browser-dot" />
            <span className="browser-dot" />
            <span className="browser-dot" />
          </div>
          <div className="relative min-h-0 flex-1">
            <Image src={project.cover} alt="" fill sizes="28vw" className="object-cover" />
          </div>
        </div>
        <div className="flex min-h-0 flex-col overflow-hidden rounded-[10px] border border-[#141210]/12 bg-white shadow-[0_10px_24px_rgba(20,18,16,0.07)]">
          <div className="relative min-h-0 flex-1">
            <Image
              src={project.gallery[0] ?? project.cover}
              alt=""
              fill
              sizes="18vw"
              className="object-cover"
            />
          </div>
          <div className="border-t border-[#141210]/10 px-2 py-1.5">
            <p className="text-[11px] font-medium text-[#141210]">Номера и локация</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-[#141210]/12 bg-white shadow-[0_10px_24px_rgba(20,18,16,0.07)]">
      <div className="browser-chrome !bg-[#ece7e0]">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="ml-2 truncate font-mono text-[9px] text-[#6b655c]">
          {project.slug}.tsblv.studio
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        <Image
          src={project.cover}
          alt={`Превью ${project.title}`}
          fill
          sizes="42vw"
          className="object-cover"
        />
      </div>
      <div className="grid shrink-0 grid-cols-3 gap-px border-t border-[#141210]/10 bg-[#141210]/10">
        {[project.gallery[0], project.gallery[1], project.gallery[2]].map((src, i) => (
          <div key={src ?? i} className="relative aspect-[5/2.6] bg-white">
            <Image
              src={src ?? project.cover}
              alt=""
              fill
              sizes="12vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkShowcase({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const project = projects[active];
  const tint = tintBySlug[project.slug] ?? "bg-[#f3eee8]";

  const go = (index: number) => {
    setActive((index + projects.length) % projects.length);
  };

  return (
    <div className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
      <div className="hidden min-h-0 flex-1 gap-5 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-6">
        <div
          className="flex min-h-0 flex-col justify-center lg:col-span-4"
          role="listbox"
          aria-label="Список проектов"
        >
          {projects.map((item, index) => {
            const isActive = index === active;
            return (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                role="option"
                aria-selected={isActive}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`group flex w-full items-center justify-between gap-3 border-b border-border py-2.5 text-left transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                    0{index + 1} · {item.category}
                  </p>
                  <p className="mt-0.5 truncate text-[15px] font-medium tracking-[-0.02em]">
                    {item.shortTitle ?? item.title}
                  </p>
                </div>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                    isActive ? "bg-accent" : "bg-border group-hover:bg-muted"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>

        <div className="relative min-h-[28rem] lg:col-span-8 xl:min-h-[30rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={project.slug}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 will-change-[opacity]"
            >
              <Link
                href={`/work/${project.slug}`}
                className={`group flex h-full flex-col overflow-hidden rounded-[12px] border border-[#141210]/10 ${tint} p-3 text-[#141210] shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(0,0,0,0.34)]`}
              >
                <div className="min-h-0 flex-1 overflow-hidden">
                  <PreviewVisual project={project} />
                </div>
                <div className="mt-2.5 grid h-[5.5rem] shrink-0 gap-3 border-t border-[#141210]/12 pt-2.5 md:grid-cols-[1.35fr_auto] md:items-end">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6b655c]">
                      {project.status}
                    </p>
                    <h3 className="mt-0.5 truncate text-lg font-semibold tracking-[-0.03em] text-[#141210]">
                      {project.shortTitle ?? project.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-[#5a544c]">
                      {project.objective}
                    </p>
                  </div>
                  <span className="btn-cta-primary inline-flex h-10 items-center gap-1.5 self-start rounded-full px-4 text-[13px] font-semibold md:self-end">
                    Смотреть кейс
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            0{active + 1} / 0{projects.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Предыдущий проект"
              onClick={() => go(active - 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Следующий проект"
              onClick={() => go(active + 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
            >
              <CaretRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className={`w-[88%] shrink-0 snap-center rounded-[10px] border border-[#141210]/10 p-3 text-[#141210] transition-transform active:scale-[0.99] ${
                tintBySlug[item.slug] ?? "bg-[#f3eee8]"
              }`}
            >
              <div className="overflow-hidden rounded-lg border border-[#141210]/10">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="85vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#6b655c]">
                {item.category} · {item.status}
              </p>
              <h3 className="mt-0.5 text-lg font-semibold tracking-[-0.02em] text-[#141210]">
                {item.shortTitle ?? item.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[13px] text-[#5a544c]">{item.objective}</p>
              <span className="btn-cta-primary mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold">
                Смотреть кейс
                <ArrowUpRight size={13} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
