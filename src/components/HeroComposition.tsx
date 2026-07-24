"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ProjectPreviewCover } from "@/components/ProjectPreviewCover";
import { getFeaturedProjects } from "@/data/projects";

export function HeroComposition() {
  const projects = getFeaturedProjects();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const project = projects[active];

  useEffect(() => {
    if (reduce || manual) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % projects.length),
      4600,
    );
    return () => window.clearInterval(timer);
  }, [manual, projects.length, reduce]);

  return (
    <div className="hero-device-stage">
      <div className="hero-device-orbit" aria-hidden />
      <div className="hero-device-grid" aria-hidden />

      <motion.div
        className="hero-device-object"
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-device-backplate hero-device-backplate-two" aria-hidden />
        <div className="hero-device-backplate hero-device-backplate-one" aria-hidden />

        <div className="hero-device-shell">
          <div className="hero-device-topbar">
            <span className="hero-device-mark">TSBLV / ПРЕВЬЮ</span>
            <span className="hero-device-live">Интерактивный проект</span>
          </div>

          <div
            id="hero-direction-panel"
            role="tabpanel"
            aria-labelledby={`hero-direction-tab-${active}`}
            className="hero-device-screen"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectPreviewCover
                  project={project}
                  index={active}
                  priority
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  showMetadata={false}
                  fill
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                className={`hero-device-screen-copy${project.previewCopySide === "left" ? " is-left" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>0{active + 1} / 05</p>
                <div>
                  <span>{project.previewCategory}</span>
                  <strong>{project.previewTitle}</strong>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hero-device-footer">
            <span>Стратегия</span>
            <span>Арт-дирекшн</span>
            <span>Фронтенд</span>
            <span className="hero-device-year">2026</span>
          </div>
        </div>

        <div className="hero-device-pedestal" aria-hidden>
          <span />
        </div>
      </motion.div>

      <div className="hero-direction-rail" role="tablist" aria-label="Направления студии">
        {projects.map((item, index) => (
          <button
            key={item.slug}
            id={`hero-direction-tab-${index}`}
            type="button"
            role="tab"
            aria-controls="hero-direction-panel"
            aria-selected={index === active}
            onClick={() => {
              setManual(true);
              setActive(index);
            }}
            onMouseEnter={() => {
              setManual(true);
              setActive(index);
            }}
            onFocus={() => {
              setManual(true);
              setActive(index);
            }}
            className={index === active ? "is-active" : ""}
          >
            <span>0{index + 1}</span>
            {item.previewCategory}
          </button>
        ))}
      </div>
    </div>
  );
}
