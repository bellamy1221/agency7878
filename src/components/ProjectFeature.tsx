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

const sceneShell =
  "relative flex w-full max-w-full flex-col justify-center overflow-x-hidden py-10 lg:min-h-[calc(100svh-4.25rem)] lg:justify-center lg:py-6 lg:pb-10";

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
    x.set(px * 8);
    y.set(py * 5);
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
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
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
        sizes={sizes}
        className="object-cover contrast-[1.03]"
      />
    </div>
  );
}

function BrowserPreview({
  project,
  compact,
}: {
  project: Project;
  compact?: boolean;
}) {
  const { reduce, rx, ry, onMove, onLeave } = useTilt();

  return (
    <div
      className="group overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface shadow-[0_14px_40px_rgba(22,21,19,0.07)] transition-transform duration-500 hover:-translate-y-0.5"
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
          compact ? "aspect-[16/9] lg:aspect-[16/8.5]" : "aspect-[16/10] lg:aspect-[16/9]"
        }`}
      >
        <Image
          src={project.cover}
          alt={`Превью ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/15 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

function LayeredUiPreview({ project }: { project: Project }) {
  return (
    <div className="relative min-h-[260px] md:min-h-[320px] lg:min-h-[360px]">
      <div className="absolute left-0 top-4 w-[68%] overflow-hidden rounded-xl border border-border bg-surface shadow-[0_14px_34px_rgba(22,21,19,0.08)] transition-transform duration-500 hover:-translate-y-1 md:top-6">
        <div className="browser-chrome">
          <span className="browser-dot" />
          <span className="browser-dot" />
          <span className="browser-dot" />
        </div>
        <div className="relative aspect-[16/10] lg:aspect-[16/9]">
          <Image src={project.cover} alt="" fill sizes="50vw" className="object-cover" />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[40%] overflow-hidden rounded-[1.25rem] border border-border bg-background shadow-[0_16px_34px_rgba(22,21,19,0.12)] transition-transform duration-500 hover:-translate-y-1">
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
      <div
        className="absolute right-[6%] top-0 rounded-lg border border-border bg-background px-3 py-2 shadow-sm"
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

function ConfiguratorPreview({ project }: { project: Project }) {
  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-surface">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <p className="editorial-label">Комната</p>
          <p className="font-mono text-[10px] text-muted">live estimate</p>
        </div>
        <div className="relative aspect-[16/9] lg:aspect-[16/8]">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="55vw"
            className="object-cover"
          />
          <div className="absolute bottom-3 left-3 rounded-md border border-border bg-background/90 px-2.5 py-1.5 backdrop-blur-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Оценка
            </p>
            <p className="text-sm font-medium">от 186 000 ₽</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {[
          { src: project.gallery[0], label: "Каталог" },
          { src: project.gallery[1], label: "Материалы" },
          { src: project.gallery[2] ?? project.cover, label: "Сохранение" },
        ].map((item) => (
          <div
            key={item.label}
            className="overflow-hidden rounded-lg border border-border transition-transform duration-500 hover:-translate-y-0.5"
          >
            <div className="relative aspect-[4/3]">
              <Image src={item.src ?? project.cover} alt="" fill sizes="18vw" className="object-cover" />
            </div>
            <p className="border-t border-border bg-background px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {item.label}
            </p>
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
        className="mb-3 max-w-[14ch] text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-[2.75rem]"
        style={{ color: project.accent }}
      >
        {project.shortTitle ?? project.title}
      </div>
      <div className="relative ml-auto w-[88%] overflow-hidden rounded-[var(--radius-editorial)] border border-border md:w-[90%]">
        <MaskImage
          src={project.cover}
          alt={`Превью ${project.title}`}
          className="aspect-[5/3.6] lg:aspect-[5/3.2]"
          sizes="50vw"
        />
      </div>
      <div className="absolute -left-1 bottom-6 hidden w-36 -rotate-2 rounded-lg border border-border bg-background p-2.5 shadow-sm md:block">
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
  dense,
}: {
  project: Project;
  dense?: boolean;
}) {
  return (
    <>
      <Meta project={project} />
      <h3
        className={`mt-2 font-medium tracking-tight ${
          dense ? "text-2xl md:text-3xl lg:text-[2rem]" : "text-3xl md:text-4xl lg:text-[2.5rem]"
        }`}
      >
        {project.title}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted md:text-[15px]">
        {project.summary}
      </p>
      <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
        <span className="text-muted">Цель: </span>
        {project.objective}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm text-accent transition-transform duration-300 group-hover/link:translate-x-0.5 lg:mt-5">
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
      <article className={sceneShell}>
        <p className="editorial-label mb-3">{n} / Immersive</p>
        <CaseLink href={`/work/${project.slug}`}>
          <BrowserPreview project={project} compact />
        </CaseLink>
        <div className="mt-5 grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} dense />
          </CaseLink>
          <div className="justify-self-start rounded-lg border border-dashed border-border bg-surface px-3 py-2.5 md:justify-self-end">
            <p className="editorial-label mb-1">Фокус</p>
            <p className="text-sm text-foreground/80">
              Атмосфера, меню и бронь в одном спокойном потоке.
            </p>
          </div>
        </div>
      </article>
    );
  }

  if (project.layout === "split-left") {
    return (
      <article className={`${sceneShell} lg:grid lg:grid-cols-12 lg:items-center lg:gap-10`}>
        <div className="lg:col-span-7">
          <p className="editorial-label mb-3">{n} / Split</p>
          <CaseLink href={`/work/${project.slug}`}>
            <BrowserPreview project={project} compact />
          </CaseLink>
        </div>
        <div className="mt-5 lg:col-span-5 lg:mt-0">
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} dense />
          </CaseLink>
        </div>
      </article>
    );
  }

  if (project.layout === "editorial") {
    return (
      <article className={`${sceneShell} border-y border-border`}>
        <div className="mb-5 flex items-end justify-between gap-4">
          <p className="editorial-label">{n} / Editorial</p>
          <span className="note-chip">личный бренд</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} dense />
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
      <article className={`${sceneShell} lg:grid lg:grid-cols-12 lg:items-center lg:gap-10`}>
        <div className="lg:col-span-5">
          <p className="editorial-label mb-3">{n} / Layers</p>
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} dense />
          </CaseLink>
        </div>
        <div className="mt-6 lg:col-span-7 lg:mt-0">
          <CaseLink href={`/work/${project.slug}`}>
            <LayeredUiPreview project={project} />
          </CaseLink>
        </div>
      </article>
    );
  }

  return (
    <article className={`${sceneShell}`}>
      <div className="rounded-[var(--radius-editorial)] border border-border bg-surface p-4 md:p-6 lg:p-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="editorial-label">{n} / Configurator</p>
          <p className="font-mono text-[11px] text-muted">product UI</p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:gap-8">
          <CaseLink href={`/work/${project.slug}`}>
            <ConfiguratorPreview project={project} />
          </CaseLink>
          <CaseLink href={`/work/${project.slug}`}>
            <CopyBlock project={project} dense />
          </CaseLink>
        </div>
      </div>
    </article>
  );
}
