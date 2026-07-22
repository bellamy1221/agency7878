"use client";

import { Reveal } from "@/components/Reveal";

const steps = [
  {
    title: "Знакомство и задача",
    text: "Коротко обсуждаем цель, аудиторию, сроки и то, что уже есть: тексты, фото, текущий сайт или только идея.",
    tip: "15-20 минут обычно хватает",
  },
  {
    title: "Структура и визуальное направление",
    text: "Собираю структуру страниц и предлагаю визуальный тон: типографика, цвет, характер подачи. Согласовываем до детальной отрисовки.",
    tip: "Сначала каркас, потом пиксели",
  },
  {
    title: "Дизайн и разработка",
    text: "Делаю дизайн ключевых экранов и сразу собираю рабочий сайт или интерфейс. Правки проходят по ходу, без бесконечных абстрактных макетов.",
    tip: "Видите живой результат раньше",
  },
  {
    title: "Проверка и запуск",
    text: "Проверяю адаптив, формы, скорость и базовую аналитику. Публикую проект и остаюсь на связи по поддержке после запуска.",
    tip: "Не бросаю после публикации",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="editorial-label mb-4">Процесс</p>
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Как проходит работа
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Четыре шага. Без лишних созвонов и агентского жаргона.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          <div
            className="absolute left-[1.15rem] top-3 hidden h-[calc(100%-1.5rem)] w-px bg-border md:block lg:left-[1.35rem]"
            aria-hidden
          />

          <ol className="space-y-4 md:space-y-0">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <li className="group relative grid gap-4 rounded-[var(--radius-editorial)] border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[4px_4px_0_rgba(198,93,58,0.18)] md:grid-cols-[5rem_1fr_12rem] md:items-start md:gap-8 md:border-0 md:bg-transparent md:p-0 md:py-8 md:hover:translate-y-0 md:hover:shadow-none">
                  <div className="relative z-10 flex items-center gap-3 md:block">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background font-mono text-sm text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-background md:h-11 md:w-11">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-[15px]">
                      {step.text}
                    </p>
                  </div>
                  <p className="note-chip self-start md:mt-1 md:justify-self-end">
                    {step.tip}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
