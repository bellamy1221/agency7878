"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { getArchiveProjects } from "@/data/projects";
import styles from "./project-folder.module.css";

export function ProjectFolder() {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const archiveProjects = getArchiveProjects().slice(0, 5);

  const prepareArchiveOpen = () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <div className={styles.layout}>
      <div
        className={styles.stage}
        data-open={isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div aria-hidden className={styles.halo} />
        <div className={styles.folder}>
          <div aria-hidden className={styles.back}>
            <span className={styles.backLabel}>TSBLV / АРХИВ</span>
          </div>

          <div className={styles.sheets} aria-hidden>
            {[...archiveProjects].reverse().map((project, reverseIndex) => {
              const index = archiveProjects.length - 1 - reverseIndex;
              return (
                <div
                  key={project.slug}
                  className={styles.sheet}
                  style={
                    {
                      "--sheet-top": `${index * 0.35}rem`,
                      "--sheet-right": `${(archiveProjects.length - 1 - index) * 0.22}rem`,
                      "--sheet-left": `${index * 0.45}rem`,
                      "--sheet-x": `${(index - 2) * 1}rem`,
                      "--sheet-y": `${-14 - index * 5}%`,
                      "--sheet-rotate": `${(index - 2) * 0.85}deg`,
                      "--sheet-delay": `${index * 35}ms`,
                      zIndex: 10 - index,
                    } as CSSProperties
                  }
                >
                  <span className={styles.sheetLabel}>{project.category}</span>
                  <small className={styles.sheetMeta}>{project.title}</small>
                </div>
              );
            })}
          </div>

          <Link
            href="/archive"
            scroll
            className={styles.front}
            aria-label="Открыть архив проектов"
            onClick={prepareArchiveOpen}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          >
            <span className={styles.frontEyebrow}>Архив · интерактивные версии внутри</span>
            <span className={styles.frontRow}>
              <strong className={styles.frontTitle}>Архив проектов</strong>
              <span className={styles.frontArrow} aria-hidden>↗</span>
            </span>
          </Link>
        </div>
      </div>

      <motion.div
        className={styles.caption}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className={styles.captionLabel}>Архив / 07</p>
        <p className={styles.captionTitle}>Сайты, интерфейсы и эксперименты</p>
        <p className={styles.captionText}>
          Откройте папку: внутри — локальные версии проектов, которые можно листать и нажимать.
        </p>
      </motion.div>
    </div>
  );
}
