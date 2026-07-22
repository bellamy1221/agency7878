import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const capabilities = [
  "Понятная структура под бизнес-задачу",
  "Сильная визуальная подача",
  "Мышление про конверсию",
  "Лёгкие и уместные анимации",
  "Адаптивная frontend-разработка",
  "Быстрый практичный запуск",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="editorial-label">О студии</p>
            <span className="note-chip">один человек · весь цикл</span>
          </div>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5 lg:pt-4">
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              Честно и{" "}
              <span className="font-serif-accent">по-человечески</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
              TSBLV - независимая российская digital-студия. Делаю выразительные
              сайты и лёгкие цифровые продукты для малого бизнеса, локальных мест,
              экспертов и частных проектов.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Я сам веду проект от структуры до запуска, поэтому вы говорите
              напрямую с человеком, который отвечает за результат.
            </p>
            <blockquote className="mt-8 max-w-sm border-l-2 border-accent pl-4 text-base leading-relaxed text-foreground/85 md:text-lg">
              Красиво достаточно, чтобы запомнили. Ясно достаточно, чтобы написали.
            </blockquote>
          </Reveal>

          <Reveal className="relative lg:col-span-6 lg:col-start-7" delay={0.08}>
            <div className="relative ml-0 max-w-lg lg:ml-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-editorial)] border border-border">
                <Image
                  src="https://picsum.photos/seed/tsblv-studio-desk/900/1200"
                  alt="Рабочее пространство студии TSBLV"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover contrast-[1.04]"
                />
              </div>
              <div className="absolute -bottom-5 -left-3 max-w-[210px] -rotate-2 rounded-lg border border-border bg-background p-3 shadow-[0_12px_30px_rgba(22,21,19,0.08)] md:-left-8">
                <p className="editorial-label mb-1">Между делом</p>
                <p className="text-sm leading-snug text-foreground/85">
                  Не делаю «глобальные агентства». Делаю сайты, которыми удобно
                  пользоваться.
                </p>
              </div>
            </div>

            <ul className="mt-14 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="border-t border-border pt-3 text-sm text-foreground/85 transition-colors hover:text-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
