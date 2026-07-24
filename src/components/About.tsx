import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";

const capabilities = [
  ["01", "Структура", "Выстраиваю путь пользователя вокруг конкретной бизнес-задачи."],
  ["02", "Арт-дирекшн", "Создаю визуальную систему с характером, а не набор модных эффектов."],
  ["03", "Разработка", "Собираю адаптивный интерфейс, который остаётся быстрым и поддерживаемым."],
  ["04", "Запуск", "Довожу продукт до рабочего состояния и передаю понятную основу для роста."],
] as const;

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 snap-start overflow-hidden border-y border-white/10">
      <div className="about-glow" aria-hidden />
      <div className="relative mx-auto max-w-[1460px] px-5 py-24 md:px-8 md:py-32 lg:px-10 lg:py-40">
        <Reveal>
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d09a85]">
              О студии / 02
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-[#776e66] md:block">
              Один специалист · единая ответственность
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h2 className="max-w-[13ch] text-[clamp(2.8rem,6.2vw,6.8rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              Проектирую бизнесу{" "}
              <span className="font-serif-accent text-[#d99a81]">цифровое лицо</span>,{" "}
              которое работает.
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-2" delay={0.08}>
            <p className="max-w-[38ch] text-lg leading-[1.55] text-[#d1c7bc] md:text-xl">
              TSBLV объединяет продуктовый взгляд, визуальное направление и
              frontend-разработку в одном процессе.
            </p>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.7] text-[#91877e]">
              Вы общаетесь напрямую с человеком, который принимает решения и
              отвечает за результат — от первого экрана до готового запуска.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#f4efe7] transition-colors hover:text-[#d87350]"
            >
              Обсудить задачу
              <ArrowDownRight size={16} weight="bold" />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {capabilities.map(([number, title, text], index) => (
            <Reveal
              key={title}
              delay={index * 0.05}
              className="border-b border-white/10 py-6 sm:px-5 sm:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="font-mono text-[10px] tracking-[0.14em] text-[#d87350]">{number}</p>
              <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em]">{title}</h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-[#8f857b]">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
