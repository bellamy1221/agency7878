import { ProjectFolder } from "@/components/folder/ProjectFolder";
import { Reveal } from "@/components/Reveal";

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 border-t border-white/10 py-24 md:py-32 lg:py-36">
      <div className="mx-auto w-full max-w-[1460px] px-5 md:px-8 lg:px-10">
        <Reveal>
          <h2 className="max-w-[12ch] text-[clamp(2.65rem,4.6vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
            Работы в архиве
          </h2>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.65] text-muted md:text-base">
            Открывайте папку — внутри собраны локальные интерактивные версии проектов,
            которые можно посмотреть прямо в портфолио.
          </p>
        </Reveal>

        <Reveal className="mt-10 md:mt-14" delay={0.05}>
          <ProjectFolder />
        </Reveal>
      </div>
    </section>
  );
}
