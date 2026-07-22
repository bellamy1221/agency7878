"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useInView,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import type { Project } from "@/data/projects";

function useTilt() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 140, damping: 18 });
  const ry = useSpring(y, { stiffness: 140, damping: 18 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 10);
    y.set(py * 7);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { reduce, rx, ry, onMove, onLeave };
}

function MaskImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ""} ${
        reduce ? "" : `mask-reveal ${inView ? "is-in" : ""}`
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover contrast-[1.03]"
      />
    </div>
  );
}

function BrowserPreview({
  project,
  tall,
}: {
  project: Project;
  tall?: boolean;
}) {
  const { reduce, rx, ry, onMove, onLeave } = useTilt();

  return (
    <div
      className="group overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface shadow-[0_18px_50px_rgba(22,21,19,0.07)] transition-transform duration-500 hover:-translate-y-1"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ borderColor: `${project.accent}33` }}
    >
      <div className="browser-chrome">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="ml-2 truncate font-mono text-[10px] text-muted">
          {project.slug}.tsblv.studio
        </span>
      </div>
      <motion.div
        style={reduce ? undefined : { x: rx, y: ry }}
        className={`relative w-full overflow-hidden ${
          tall ? "aspect-[16/12]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.cover}
          alt={`Превью ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/20 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

function LayeredUiPreview({ project }: { project: Project }) {
  return (
    <div className="relative min-h-[320px] md:min-h-[420px]">
      <div className="absolute left-0 top-6 w-[68%] overflow-hidden rounded-xl border border-border bg-surface shadow-[0_16px_40px_rgba(22,21,19,0.08)] transition-transform duration-500 hover:-translate-y-1 md:top-10">
        <div className="browser-chrome">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
        </div>
        <div className="relative aspect-[16/11]">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[42%] overflow-hidden rounded-[1.4rem] border border-border bg-background shadow-[0_20px_40px_rgba(22,21,19,0.12)] transition-transform duration-500 hover:-translate-y-2">
        <div className="relative aspect-[9/16]">
          <Image
            src={project.gallery[2] ?? project.cover}
            alt=""
            fill
            sizes="30vw"
            className="object-cover"
          />
        </div>
      </div>
      <div
        className="absolute right-[8%] top-0 rounded-lg border border-border bg-background px-3 py-2 shadow-sm"
        style={{ borderColor: project.accent }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          UI crop
        </p>
        <p className="mt-1 text-xs font-medium">{project.functionality[0]}</p>
      </div>
    </div>
  );
}

function StackedPreview({ project }: { project: Project }) {
  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <p className="editorial-label">Панель</p>
          <p className="font-mono text-[10px] text-muted">day view</p>
        </div>
        <div className="relative aspect-[16/9]">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[project.gallery[0], project.gallery[1]].map((src, i) => (
          <div
            key={src ?? i}
            className="overflow-hidden rounded-lg border border-border transition-transform duration-500 hover:-translate-y-1"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={src ?? project.cover}
                alt=""
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorialPreview({ project }: { project: Project }) {
  return (
    <div className="relative">
      <div
        className="mb-4 max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl"
        style={{ color: project.accent }}
      >
        {project.shortTitle ?? project.title}
      </div>
      <div className="relative ml-auto w-[88%] overflow-hidden rounded-[var(--radius-editorial)] border border-border md:w-[92%]">
        <MaskImage
          src={project.cover}
          alt={`Превью ${project.title}`}
          className="aspect-[5/4]"
          sizes="50vw"
        />
      </div>
      <div className="absolute -left-1 bottom-8 hidden w-40 -rotate-2 rounded-lg border border-border bg-background p-3 shadow-sm md:block">
        <p className="editorial-label mb-1">Фрагмент</p>
        <p className="text-xs leading-snug text-muted">
          {project.services.slice(0, 2).join(" · ")}
        </p>
      </div>
    </div>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
      <span>{project.category}</span>
      <span aria-hidden className="h-3 w-px bg-border" />
      <span>{project.year}</span>
      {project.isConcept ? (
        <>
          <span aria-hidden className="h-3 w-px bg-border" />
          <span>Независимая концепция</span>
        </>
      ) : null}
    </div>
  );
}

function CopyBlock({
  project,
  compact,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <>
      <Meta project={project} />
      <h3
        className={`mt-3 font-medium tracking-tight ${
          compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        {project.summary}
      </p>
      {!compact ? (
        <>
          <p className="mt-4 text-sm text-foreground/80">
            <span className="text-muted">Цель: </span>
            {project.objective}
          </p>
          <p className="mt-2 text-sm text-foreground/80">
            <span className="text-muted">Что сделано: </span>
            {project.services.join(", ")}
          </p>
        </>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-2 text-sm text-accent transition-transform duration-300 group-hover/link:translate-x-0.5">
        Смотреть кейс
        <ArrowUpRight size={16} weight="bold" />
      </span>
    </>
  );
}

function CaseLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group/link block ${className ?? ""}`}>
      {children}
    </Link>
  );
}

export function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const n = String(index + 1).padStart(2, "0");

  if (project.layout === "full") {
    return (
      <article className="relative">
        <p className="editorial-label mb-4">{n} / Immersive</p>
        <CaseLink href={`/work/${project.slug}`}>
          <BrowserPreview project={project} tall />
        </CaseLink>
        <div className="mt-7 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} />
          </CaseLink>
          <div className="justify-self-start rounded-lg border border-dashed border-border bg-surface px-4 py-3 md:justify-self-end">
            <p className="editorial-label mb-1">Фокус</p>
            <p className="text-sm text-foreground/80">
              Атмосфера + меню + бронь в одном спокойном потоке.
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (project.layout === "split-left") {
    return (
      <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="editorial-label mb-4">{n} / Split</p>
          <CaseLink href={`/work/${project.slug}`}>
            <BrowserPreview project={project} />
          </CaseLink>
        </div>
        <div className="lg:col-span-5 lg:pt-10">
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} />
          </CaseLink>
        </div>
      </article>
    );
  }

  if (project.layout === "editorial") {
    return (
      <article className="border-y border-border py-12 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <p className="editorial-label">{n} / Editorial</p>
          <span className="note-chip">личный бренд</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <CaseLink href={`/work/${project.slug}`} className="lg:pt-4">
            <CopyBlock project={project} />
          </CaseLink>
          <CaseLink href={`/work/${project.slug}`}>
            <EditorialPreview project={project} />
          </CaseLink>
        </div>
      </article>
    );
  }

  if (project.layout === "split-right") {
    return (
      <article className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:order-1">
          <p className="editorial-label mb-4">{n} / Layers</p>
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} />
          </CaseLink>
        </div>
        <div className="lg:col-span-7 lg:order-2">
          <CaseLink href={`/work/${project.slug}`}>
            <LayeredUiPreview project={project} />
          </CaseLink>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[var(--radius-editorial)] border border-border bg-surface p-5 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="editorial-label">{n} / Interface</p>
        <p className="font-mono text-[11px] text-muted">stacked UI</p>
      </div>
      <div className="grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <CaseLink href={`/work/${project.slug}`}>
          <StackedPreview project={project} />
        </CaseLink>
        <CaseLink href={`/work/${project.slug}`}>
          <CopyBlock project={project} compact />
        </CaseLink>
      </div>
    </article>
  );
}
