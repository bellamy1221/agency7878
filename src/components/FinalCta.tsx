import {
  ArrowUpRight,
  EnvelopeSimple,
  PaperPlaneTilt,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-foreground text-background">
            <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
              <div className="relative px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
                <div
                  className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-accent/30 blur-3xl"
                  aria-hidden
                />
                <p className="editorial-label !text-background/50 mb-5">Контакт</p>
                <h2 className="relative max-w-3xl text-3xl font-medium tracking-tight md:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
                  Есть задача, которую пора превратить в работающий{" "}
                  <span className="font-serif-accent text-[1.05em] text-background">
                    сайт
                  </span>
                  ?
                </h2>
                <p className="relative mt-5 max-w-xl text-base leading-relaxed text-background/65 md:text-lg">
                  Напишите коротко, что нужно. Предложу подход, ориентир по срокам
                  и понятный следующий шаг. Без презентаций на час.
                </p>

                <div className="relative mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${site.email}?subject=Заявка%20на%20проект&body=Коротко%20о%20задаче%3A%0A%0AСроки%3A%0A%0AСсылки%20или%20референсы%3A`}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm text-background shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-transform duration-200 hover:brightness-110 active:scale-[0.98]"
                  >
                    Обсудить проект
                    <ArrowUpRight size={16} weight="bold" />
                  </a>
                  <a
                    href={site.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-background/25 bg-background/5 px-6 text-sm text-background transition-colors hover:bg-background/10"
                  >
                    <PaperPlaneTilt size={16} weight="bold" />
                    Telegram
                  </a>
                </div>
              </div>

              <div className="border-t border-background/10 bg-background/[0.04] px-6 py-10 md:px-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
                <p className="editorial-label !text-background/45 mb-6">
                  Быстрый старт
                </p>
                <ol className="space-y-5">
                  <li className="border-t border-background/10 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      01
                    </p>
                    <p className="mt-2 text-sm text-background/80">
                      Коротко опишите задачу в письме или Telegram
                    </p>
                  </li>
                  <li className="border-t border-background/10 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      02
                    </p>
                    <p className="mt-2 text-sm text-background/80">
                      Получите подход, ориентир по срокам и следующий шаг
                    </p>
                  </li>
                  <li className="border-t border-background/10 pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                      03
                    </p>
                    <p className="mt-2 text-sm text-background/80">
                      Если подходит - стартуем без лишней бюрократии
                    </p>
                  </li>
                </ol>

                <a
                  href={`mailto:${site.email}`}
                  className="mt-10 inline-flex items-center gap-2 text-sm text-background/75 transition-colors hover:text-background"
                >
                  <EnvelopeSimple size={16} weight="bold" />
                  {site.email}
                </a>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-background/40">
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
