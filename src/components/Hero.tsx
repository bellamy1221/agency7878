"use client";

import { ArrowRight, ArrowDownRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MagneticLink } from "@/components/MagneticLink";
import { FaqNudge } from "@/components/FaqNudge";
import { site } from "@/data/site";

export function Hero() {
  const reduce = useReducedMotion();

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.5,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section className="relative flex min-h-[100dvh] snap-start flex-col justify-center overflow-hidden text-[#f4efe7]">
      <div className="relative z-[2] mx-auto grid w-full max-w-[1400px] items-center gap-6 px-4 py-10 md:px-6 lg:grid-cols-12 lg:gap-5 lg:px-8 lg:py-6">
        <div className="lg:col-span-5">
          <motion.p
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c9b8a8]"
            {...line(0.05)}
          >
            Дизайн и разработка для малого бизнеса
          </motion.p>

          <motion.h1
            className="max-w-[14ch] font-serif text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#f7f2ea]"
            {...line(0.1)}
          >
            Больше заявок. Меньше хаоса в продажах.
          </motion.h1>

          <motion.p
            className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-[#b7a99a] md:text-base"
            {...line(0.16)}
          >
            Делаю сайты, лендинги и Telegram Mini Apps, которые ясно показывают
            оффер и ведут гостя к заявке.
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap items-center gap-3" {...line(0.22)}>
            <MagneticLink
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-primary inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              Обсудить проект
              <ArrowRight size={16} weight="bold" />
            </MagneticLink>
            <Link
              href="/#work"
              className="btn-cta-ghost inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium"
            >
              Смотреть работы
              <ArrowDownRight size={16} weight="bold" />
            </Link>
          </motion.div>

          <motion.ul
            className="mt-6 grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-3"
            {...line(0.28)}
          >
            {["Дизайн и код вместе", "Прямой контакт", "Запуск под ключ"].map(
              (item) => (
                <li
                  key={item}
                  className="text-[12px] font-medium leading-snug text-[#c9b8a8]"
                >
                  {item}
                </li>
              ),
            )}
          </motion.ul>
        </div>

        <div className="relative lg:col-span-7">
          <motion.div
            className="relative mx-auto max-w-xl lg:ml-auto lg:max-w-none"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduce ? undefined : { scale: 1.01 }}
          >
            <div className="pointer-events-none absolute -inset-5 rounded-[40%_48%_42%_50%] bg-[rgba(232,196,158,0.12)] blur-3xl" />

            <div className="relative overflow-hidden rounded-[38%_46%_40%_48%/42%_38%_48%_40%] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[5/4]">
                <Image
                  src="https://picsum.photos/seed/tsblv-hero-studio/2400/1900"
                  alt="Пример визуальной подачи проекта"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-transparent" />
              </div>
            </div>

            <motion.div
              className="absolute -bottom-2 left-2 z-10 w-[min(100%,280px)] sm:bottom-4 sm:left-4 md:w-[300px]"
              style={{ perspective: 1100, transformStyle: "preserve-3d" }}
              initial={reduce ? false : { opacity: 0, y: 18, rotateX: 18 }}
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: 1,
                      y: [0, -5, 0],
                      rotateX: [10, 6, 10],
                      rotateY: [-10, -6, -10],
                    }
              }
              transition={{
                opacity: { duration: 0.55, delay: 0.35 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }}
              drag={!reduce}
              dragConstraints={{ left: -16, right: 16, top: -10, bottom: 10 }}
              dragElastic={0.14}
              whileHover={reduce ? undefined : { scale: 1.03, rotateY: -4 }}
            >
              <div
                className="relative overflow-hidden rounded-[1.35rem] border border-white/30 px-4 py-4"
                style={{
                  background:
                    "linear-gradient(145deg, #e4e0db 0%, #a8a49e 38%, #6a6661 72%, #d2cec8 100%)",
                  transform: "translateZ(24px)",
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 22px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.18)",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/40 blur-2xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-3 top-1 h-px bg-white/50"
                  aria-hidden
                />
                <p className="relative font-mono text-[10px] uppercase tracking-[0.14em] text-[#2a2825]/70">
                  Результат для бизнеса
                </p>
                <p className="relative mt-2 text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-[#161513]">
                  Понятный оффер и быстрый путь к заявке
                </p>
                <p className="relative mt-2 text-[12px] leading-snug text-[#2a2825]/75">
                  Структура, дизайн и запуск в одних руках
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <FaqNudge
        q="С чего обычно начинаем?"
        a="С цели: кому продаём и что должно случиться после визита."
        className="absolute bottom-4 right-3 z-20 hidden max-w-[8rem] sm:block md:bottom-8 md:right-6 lg:bottom-12 lg:right-10"
      />
    </section>
  );
}
