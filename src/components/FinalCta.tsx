import {
  EnvelopeSimple,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const steps = [
  "Коротко обсуждаем задачу",
  "Фиксируем объём, срок и стоимость",
  "Начинаю работу после предоплаты",
];

const requests = [
  "Лендинг или сайт",
  "Telegram Mini App",
  "Интерфейс или небольшой сервис",
  "Редизайн существующего проекта",
];

export function FinalCta() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 lg:min-h-[calc(100svh-4.25rem)] lg:flex lg:items-center"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-foreground text-background">
            <div className="grid lg:grid-cols-12">
              <div className="relative px-6 py-10 md:px-10 md:py-12 lg:col-span-7 lg:px-12 lg:py-14">
                <div
                  className="pointer-events-none absolute -right-8 top-0 h-40 w-40 rounded-full bg-accent/25 blur-3xl"
                  aria-hidden
                />
                <h2 className="relative max-w-2xl text-3xl font-medium tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                  Есть задача? Давайте быстро поймём, как её{" "}
                  <span className="font-serif-accent text-[1.04em]">решить</span>.
                </h2>
                <p className="relative mt-4 max-w-xl text-sm leading-relaxed text-background/65 md:text-base">
                  Опишите проект в нескольких предложениях. Я предложу подход,
                  ориентир по срокам и понятный следующий шаг.
                </p>

                <div className="relative mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={site.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
                  >
                    <PaperPlaneTilt size={16} weight="bold" />
                    Написать в Telegram
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-background/25 px-6 text-sm text-background transition-colors hover:bg-background/10"
                  >
                    <EnvelopeSimple size={16} weight="bold" />
                    {site.email}
                  </a>
                </div>

                <ol className="relative mt-10 grid gap-3 sm:grid-cols-3">
                  {steps.map((step, index) => (
                    <li
                      key={step}
                      className="border-t border-background/15 pt-3 text-sm text-background/75"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                        0{index + 1}
                      </span>
                      <p className="mt-2 leading-snug">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-background/10 bg-background/[0.04] px-6 py-10 md:px-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
                <p className="editorial-label !text-background/45 mb-5">
                  С чем обычно пишут
                </p>
                <ul className="space-y-3">
                  {requests.map((item) => (
                    <li
                      key={item}
                      className="border-t border-background/12 pt-3 text-sm text-background/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-background/40">
                  {site.availability}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
