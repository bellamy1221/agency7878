"use client";

import { ArrowUpRight, EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { BrandMarkFooter } from "@/components/BrandMarkFooter";
import { MagneticLink } from "@/components/MagneticLink";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function FinalCta() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="relative snap-start overflow-hidden pt-24 md:pt-32 lg:pt-36">
      <div className="mx-auto max-w-[1460px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <div className="contact-panel">
            <div className="relative z-[2] grid gap-10 p-6 md:p-9 lg:grid-cols-12 lg:gap-10 lg:p-12">
              <div className="lg:col-span-8">
                <h2 className="max-w-[12ch] text-[clamp(2.7rem,5.3vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[#f7f2ea]">
                  Есть задача — найдём ей форму.
                </h2>
              </div>

              <div className="flex flex-col justify-end lg:col-span-4">
                <p className="max-w-[36ch] text-[15px] leading-[1.65] text-[#a99d92] md:text-base">
                  Напишите, что нужно создать, для кого и к какому сроку. Я отвечу
                  с уточнениями и предложу понятный следующий шаг.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <MagneticLink
                    href={site.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta-primary inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
                  >
                    <PaperPlaneTilt size={16} weight="bold" />
                    Telegram
                  </MagneticLink>
                  <a
                    href={site.emailCompose}
                    className="btn-cta-ghost inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                  >
                    <EnvelopeSimple size={16} weight="bold" />
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="relative z-[2] grid border-t border-white/10 md:grid-cols-3">
              {["Цель и контекст", "Сроки и объём", "Дизайн и запуск"].map((item) => (
                <motion.div
                  key={item}
                  className="flex min-h-14 items-center justify-between gap-3 border-b border-white/10 px-6 py-4 md:border-b-0 md:border-r md:px-8 md:last:border-r-0"
                  whileHover={reduce ? undefined : { x: 3 }}
                >
                  <span className="text-sm text-[#c9beb3]">{item}</span>
                  <ArrowUpRight size={14} className="text-[#6f665f]" />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <BrandMarkFooter />
    </section>
  );
}
