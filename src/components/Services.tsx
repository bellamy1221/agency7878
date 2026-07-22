"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const offers = [
  {
    id: "sites",
    title: "Сайты, которые продают спокойно",
    description:
      "Лендинги и сайты для малого бизнеса, ресторанов, отелей и частных специалистов. Понятная структура и сильная подача без корпоративного пафоса.",
    includes: [
      "Лендинги",
      "Сайты для малого бизнеса",
      "Сайты для ресторанов и отелей",
      "Сайты частных специалистов",
      "Редизайн и улучшение конверсии",
    ],
    note: "Самый частый формат",
  },
  {
    id: "telegram",
    title: "Telegram Mini Apps",
    description:
      "Бронь, заказ, лояльность или личный кабинет там, где клиент уже пишет вам. Короткий сценарий вместо хаоса в чате.",
    includes: [
      "Запись и бронирование",
      "Заказы и статусы",
      "Простая лояльность",
      "Уведомления администратору",
    ],
    note: "Когда сайт не обязателен",
  },
  {
    id: "product",
    title: "Интерфейсы и небольшие сервисы",
    description:
      "Когда нужен не только сайт, а рабочий экран: запись, панель клиента или аккуратный веб-сервис под задачу.",
    includes: [
      "Интерфейсы и небольшие веб-сервисы",
      "Панели записи и кабинеты",
      "Формы, заявки и аналитика",
    ],
    note: "Чуть сложнее, но по делу",
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = offers[active];

  return (
    <section id="services" className="scroll-mt-24 border-b border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28 lg:px-8 lg:py-36">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
            <div>
              <p className="editorial-label mb-4">Услуги</p>
              <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
                Чем могу помочь
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
              Выберите направление слева - справа откроются детали простым языком.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="hidden overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-background md:grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="border-r border-border">
              {offers.map((offer, index) => {
                const isActive = active === index;
                return (
                  <button
                    key={offer.id}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className={`flex w-full items-start justify-between gap-4 border-b border-border px-6 py-6 text-left transition-colors duration-300 last:border-b-0 lg:px-8 ${
                      isActive ? "bg-foreground text-background" : "hover:bg-muted-soft/50"
                    }`}
                  >
                    <div>
                      <p
                        className={`editorial-label mb-2 ${
                          isActive ? "!text-background/55" : ""
                        }`}
                      >
                        0{index + 1}
                      </p>
                      <p className="text-lg font-medium tracking-tight lg:text-xl">
                        {offer.title}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className={`mt-1 shrink-0 transition-transform duration-300 ${
                        isActive ? "translate-x-1 text-background" : "text-muted"
                      }`}
                      weight="bold"
                    />
                  </button>
                );
              })}
            </div>

            <div className="relative min-h-[360px] p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <span className="note-chip mb-6">{current.note}</span>
                  <h3 className="mt-6 max-w-md text-2xl font-medium tracking-tight lg:text-3xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted lg:text-base">
                    {current.description}
                  </p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {current.includes.map((item) => (
                      <li
                        key={item}
                        className="border-t border-border pt-3 text-sm text-foreground/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {offers.map((offer, index) => {
              const open = active === index;
              return (
                <div
                  key={offer.id}
                  className="overflow-hidden rounded-[var(--radius-editorial)] border border-border bg-background"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setActive(index)}
                    aria-expanded={open}
                  >
                    <span className="font-medium tracking-tight">{offer.title}</span>
                    <ArrowRight
                      size={16}
                      className={`transition-transform ${open ? "rotate-90" : ""}`}
                    />
                  </button>
                  {open ? (
                    <div className="border-t border-border px-5 pb-5 pt-3">
                      <p className="text-sm leading-relaxed text-muted">
                        {offer.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {offer.includes.map((item) => (
                          <li key={item} className="text-sm text-foreground/85">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Стоимость рассчитывается после короткого обсуждения задачи. Без прайса
            «из воздуха» и без обещаний на миллион заявок.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
