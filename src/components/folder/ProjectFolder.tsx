"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import styles from "./project-folder.module.css";

const FOLDER_SHEETS = [
  {
    id: "local-landing",
    label: "Сайт",
    title: "Лендинг локального сервиса",
    text: "Короткий промосайт с оффером, услугами и формой заявки.",
    year: 2025,
    status: "Концепция",
  },
  {
    id: "cabinet",
    label: "Интерфейс",
    title: "Интерфейс личного кабинета",
    text: "Кабинет клиента: статусы, документы и понятные следующие шаги.",
    year: 2024,
    status: "Эксперимент",
  },
  {
    id: "type",
    label: "Эксперимент",
    title: "Эксперимент с типографикой",
    text: "Крупный набор и ритм строк для лендингов малого бизнеса.",
    year: 2025,
    status: "Эксперимент",
  },
  {
    id: "event",
    label: "Промо",
    title: "Промосайт события",
    text: "Афиша, программа и регистрация без лишнего шума.",
    year: 2024,
    status: "Концепция",
  },
  {
    id: "booking-form",
    label: "Форма",
    title: "Мобильная форма записи",
    text: "Короткая запись с телефона: услуга, слот, подтверждение.",
    year: 2025,
    status: "Концепция",
  },
] as const;

export function ProjectFolder() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [ajar, setAjar] = useState(false);
  const [peekIndex, setPeekIndex] = useState<number | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !stageRef.current || frameRef.current)
      return;
    const currentTarget = stageRef.current;
    const { clientX, clientY } = event;
    frameRef.current = window.requestAnimationFrame(() => {
      const bounds = currentTarget.getBoundingClientRect();
      currentTarget.style.setProperty(
        "--folder-x",
        `${(((clientX - bounds.left) / bounds.width) * 2 - 1) * 2}deg`,
      );
      currentTarget.style.setProperty(
        "--folder-y",
        `${(((clientY - bounds.top) / bounds.height) * 2 - 1) * -1.5}deg`,
      );
      frameRef.current = null;
    });
  };

  const resetPointer = () => {
    stageRef.current?.style.setProperty("--folder-x", "0deg");
    stageRef.current?.style.setProperty("--folder-y", "0deg");
  };

  const sheet = FOLDER_SHEETS[activeIndex];

  return (
    <div className={styles.layout}>
      <div
        ref={stageRef}
        className={styles.stage}
        data-open={isOpen}
        data-ajar={ajar && !isOpen}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse" && !reduce) setAjar(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") {
            setAjar(false);
            setIsOpen(false);
            setPeekIndex(null);
          }
          resetPointer();
        }}
        onPointerMove={handlePointerMove}
      >
        <div aria-hidden className={styles.halo} />
        <div className={styles.folder}>
          <div aria-hidden className={styles.back}>
            <span className={styles.backLabel}>TSBLV / ARCHIVE</span>
          </div>

          <div className={styles.sheets}>
            {[...FOLDER_SHEETS].reverse().map((item, revI) => {
              const index = FOLDER_SHEETS.length - 1 - revI;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={activeIndex === index}
                  data-peek={peekIndex === index ? "true" : "false"}
                  className={styles.sheet}
                  style={
                    {
                      "--sheet-top": `${index * 0.35}rem`,
                      "--sheet-right": `${(4 - index) * 0.22}rem`,
                      "--sheet-left": `${index * 0.45}rem`,
                      "--sheet-x": `${(index - 2) * 1}rem`,
                      "--sheet-y": `${-14 - index * 5}%`,
                      "--sheet-rotate": `${(index - 2) * 0.85}deg`,
                      "--sheet-delay": `${index * 35}ms`,
                      "--sheet-edge-x": `${(index - 2) * 0.35}rem`,
                      zIndex: 10 - index,
                    } as CSSProperties
                  }
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setPeekIndex(index);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") {
                      setPeekIndex((v) => (v === index ? null : v));
                    }
                  }}
                  onFocus={() => setPeekIndex(index)}
                  onBlur={() => setPeekIndex((v) => (v === index ? null : v))}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsOpen(true);
                  }}
                >
                  <span className={styles.sheetLabel}>{item.label}</span>
                  <small className={styles.sheetMeta}>
                    {item.year} · {item.status}
                  </small>
                </button>
              );
            })}
          </div>

          <div className={styles.front}>
            <span className={styles.frontEyebrow}>Архив · файлы внутри</span>
            <div className={styles.frontRow}>
              <p className={styles.frontTitle}>{sheet.title.toUpperCase()}</p>
              <span className={styles.frontArrow} aria-hidden>
                ↗
              </span>
            </div>
            <button
              type="button"
              className={styles.frontHit}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Закрыть папку" : "Открыть папку"}
              onClick={() => setIsOpen((v) => !v)}
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sheet.id}
          className={styles.caption}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-live="polite"
        >
          <p className={styles.captionLabel}>
            {sheet.label} · {sheet.year} · {sheet.status}
          </p>
          <p className={styles.captionTitle}>{sheet.title}</p>
          <p className={styles.captionText}>{sheet.text}</p>
          {isOpen ? (
            <Link href="/archive" className={styles.archiveCta}>
              Открыть полный архив
            </Link>
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
