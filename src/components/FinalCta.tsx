"use client";

import {
  EnvelopeSimple,
  PaperPlaneTilt,
  ChatCircleDots,
  CalendarBlank,
  RocketLaunch,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { MagneticLink } from "@/components/MagneticLink";
import { BrandMarkFooter } from "@/components/BrandMarkFooter";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

const steps = [
  {
    icon: ChatCircleDots,
    title: "Коротко обсуждаем задачу",
    text: "Вы пишете цель и формат. Я задаю уточнения и предлагаю ясный план.",
  },
  {
    icon: CalendarBlank,
    title: "Фиксируем сроки и бюджет",
    text: "Согласуем объем, дедлайн и стоимость до старта. Без сюрпризов по ходу.",
  },
  {
    icon: RocketLaunch,
    title: "Запускаем и отдаем результат",
    text: "После предоплаты начинаю работу и довожу сайт до готового запуска.",
  },
];

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative flex snap-start flex-col overflow-hidden pt-10 md:pt-12 lg:pt-14"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8">
        <Reveal>
          <div className="relative" style={{ perspective: 1400 }}>
            <motion.div
              className="relative overflow-hidden rounded-[22px] border border-white/14"
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(155deg, #322922 0%, #1e1915 42%, #12100e 100%)",
                boxShadow:
                  "0 36px 90px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.08) inset, 0 -18px 40px rgba(0,0,0,0.35) inset",
              }}
              initial={reduce ? false : { opacity: 0, y: 24, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: reduce ? 0 : 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              animate={
                reduce
                  ? undefined
                  : { rotateY: [-1.5, 1.5, -1.5], rotateX: [3, 4.5, 3] }
              }
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-white/10 to-transparent"
                aria-hidden
              />

              <div className="relative z-[2] grid lg:grid-cols-12">
                <div
                  className="px-5 py-7 md:px-8 md:py-8 lg:col-span-7 lg:px-10 lg:py-9"
                  style={{ transform: "translateZ(28px)" }}
                >
                  <h2 className="max-w-xl text-[1.5rem] font-semibold tracking-[-0.035em] text-[#f4efe7] md:text-[1.85rem] md:leading-[1.08]">
                    Расскажите о задаче. Покажу, как получить из нее заявки.
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#b7a99a] md:text-[15px]">
                    Без длинных брифов. Напишите в Telegram: что нужно, для кого и
                    какой результат хотите.
                  </p>

                  <motion.div
                    className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    style={{ transform: "translateZ(16px)" }}
                    whileHover={reduce ? undefined : { y: -3, scale: 1.01 }}
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <MagneticLink
                        href={site.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cta-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
                      >
                        <PaperPlaneTilt size={16} weight="bold" />
                        Написать в Telegram
                      </MagneticLink>
                      <MagneticLink
                        href={`mailto:${site.email}`}
                        className="btn-cta-ghost inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold"
                      >
                        <EnvelopeSimple size={16} weight="bold" />
                        {site.email}
                      </MagneticLink>
                    </div>
                  </motion.div>
                </div>

                <div
                  className="border-t border-white/8 bg-black/20 px-5 py-6 md:px-7 lg:col-span-5 lg:border-l lg:border-t-0 lg:px-7 lg:py-8"
                  style={{ transform: "translateZ(18px)" }}
                >
                  <p className="mb-3 text-sm font-semibold text-[#f4efe7]">
                    Как проходит старт
                  </p>
                  <ul className="space-y-2.5">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <motion.li
                          key={step.title}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.06 * index, duration: 0.35 }}
                          whileHover={reduce ? undefined : { y: -2 }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/25 text-accent">
                              <Icon size={16} weight="bold" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-[#f4efe7]">
                                {step.title}
                              </p>
                              <p className="mt-0.5 text-[12px] leading-snug text-[#b7a99a]">
                                {step.text}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="relative z-[2] flex items-center justify-between border-t border-white/8 px-5 py-2.5 md:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a7c6e]">
                  © {site.year} {site.name}
                </p>
                <p className="text-[12px] text-[#b7a99a]">{site.availability}</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <BrandMarkFooter />
    </section>
  );
}
