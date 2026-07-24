"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { ArchiveCategory, Project } from "@/data/projects";

type ArchiveViewProps = {
  projects: Project[];
};

export function ArchiveView({ projects }: ArchiveViewProps) {
  const reduce = useReducedMotion();
  const categories = useMemo<Array<"Все" | ArchiveCategory>>(
    () => ["Все", ...Array.from(new Set(projects.map((project) => project.archiveCategory)))],
    [projects],
  );
  const [category, setCategory] = useState<"Все" | ArchiveCategory>("Все");
  const filtered = projects.filter(
    (project) => category === "Все" || project.archiveCategory === category,
  );

  return (
    <div className="mt-8 md:mt-10">
      <div className="archive-filter-bar" role="group" aria-label="Категория работ">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            data-active={category === item}
            onClick={() => setCategory(item)}
            className="archive-filter"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-current/48">
        <p>Работы / {String(filtered.length).padStart(2, "0")}</p>
        <p>Откройте проект</p>
      </div>

      <motion.div
        className="mt-7 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 xl:gap-y-11"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project, index) => (
            <motion.div
              key={`${category}-${project.slug}`}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{
                duration: 0.42,
                delay: Math.min(index * 0.035, 0.18),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                priority={index < 3}
                archive
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-12 border-y border-current/15 py-10 text-center text-sm text-current/60">
          В этой категории пока нет работ.
        </div>
      ) : null}
    </div>
  );
}
