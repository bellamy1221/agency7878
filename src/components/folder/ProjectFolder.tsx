"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import styles from "./project-folder.module.css";

const SHEETS = [
  {
    id: "a",
    label: "Сайт",
    title: "Сайт для сервиса",
    year: 2026,
    status: "Концепция",
  },
  {
    id: "b",
    label: "Интерфейс",
    title: "Кабинет клиента",
    year: 2026,
    status: "Эксперимент",
  },
  {
    id: "c",
    label: "Промо",
    title: "Сайт события",
    year: 2026,
    status: "Концепция",
  },
  {
    id: "d",
    label: "Форма",
    title: "Быстрая запись",
    year: 2026,
    status: "Концепция",
  },
] as const;

/**
 * All sheets fan open on hover; only the first sheet is interactive.
 */
export function ProjectFolder({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const work = SHEETS[0];

  return (
    <div className={styles.layout}>
      <div
        className={styles.stage}
        data-open={open}
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
      >
        <div aria-hidden className={styles.halo} />
        <div className={styles.folder}>
          <div aria-hidden className={styles.back}>
            <span className={styles.backLabel}>TSBLV / ARCHIVE</span>
          </div>

          <div className={styles.sheets}>
            {[...SHEETS].reverse().map((item, revI) => {
              const index = SHEETS.length - 1 - revI;
              const isFirst = index === 0;
              return (
                <div
                  key={item.id}
                  className={styles.sheet}
                  data-first={isFirst ? "true" : "false"}
                  style={
                    {
                      "--sheet-x": `${(index - 1.5) * 0.35}rem`,
                      "--sheet-y": `${-12 - index * 3.2}%`,
                      "--sheet-rotate": `${(index - 1.5) * 0.45}deg`,
                      "--sheet-delay": `${index * 22}ms`,
                      "--sheet-nest": `${index * 0.22}rem`,
                      zIndex: 10 - index,
                    } as CSSProperties
                  }
                  aria-hidden={!isFirst}
                >
                  <span className={styles.sheetLabel}>{item.label}</span>
                  <small className={styles.sheetMeta}>
                    {item.year} · {item.status}
                  </small>
                </div>
              );
            })}
          </div>

          <div className={styles.front}>
            <span className={styles.frontArrow} aria-hidden>
              ↗
            </span>
            <button
              type="button"
              className={styles.frontHit}
              aria-expanded={open}
              aria-label={open ? "Закрыть папку" : "Открыть папку"}
              onClick={() => setOpen((v) => !v)}
            />
          </div>
        </div>
      </div>

      <div
        className={compact ? `${styles.caption} ${styles.captionCompact}` : styles.caption}
      >
        <p className={styles.captionLabel}>
          {work.label} · {work.year} · {work.status}
        </p>
        <p className={styles.captionTitle}>{work.title}</p>
        <Link href="/archive" className={styles.archiveCta}>
          Открыть весь архив
        </Link>
      </div>
    </div>
  );
}
