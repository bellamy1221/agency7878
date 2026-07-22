"use client";

import { List, X } from "@phosphor-icons/react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/MagneticLink";
import { navLinks, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [0, 160], [0, 1]);
  const progress = useSpring(rawProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  const maxW = useTransform(progress, [0, 1], ["100%", "72%"]);
  const padX = useTransform(progress, [0, 1], [20, 16]);
  const height = useTransform(progress, [0, 1], [52, 44]);
  const gap = useTransform(progress, [0, 1], [24, 16]);
  const radius = useTransform(progress, [0, 1], [999, 999]);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pillClass = isHome
    ? "bg-[#121110]/45 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#121110]/32"
    : "border border-border/60 bg-background/80 shadow-[0_8px_30px_rgba(20,18,16,0.06)] backdrop-blur-xl";

  return (
    <header className="sticky top-0 z-50">
      <div className="relative mx-auto flex max-w-[1400px] justify-center px-3 pt-2 md:px-5 lg:px-6">
        <motion.div
          className={`relative flex w-full items-center justify-between ${
            isHome ? "" : "h-12 px-4 md:h-14 md:px-5"
          } ${pillClass}`}
          style={
            reduce || !isHome
              ? { borderRadius: 999 }
              : {
                  maxWidth: maxW,
                  height,
                  paddingLeft: padX,
                  paddingRight: padX,
                  borderRadius: radius,
                }
          }
          animate={
            reduce || !isHome
              ? undefined
              : {
                  boxShadow: scrolled
                    ? "0 12px 40px rgba(0,0,0,0.4)"
                    : "0 10px 40px rgba(0,0,0,0.28)",
                }
          }
        >
          {isHome ? (
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.07), 0 0 24px rgba(255,220,180,0.04)",
              }}
              aria-hidden
            />
          ) : null}

          <Link
            href="/"
            className="relative z-10 shrink-0 text-[15px] font-semibold tracking-[-0.03em] text-foreground transition-opacity hover:opacity-65"
            onClick={() => setOpen(false)}
          >
            {site.name}
          </Link>

          <motion.nav
            className="relative z-10 hidden items-center lg:flex"
            style={reduce || !isHome ? undefined : { gap }}
            aria-label="Основная навигация"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link whitespace-nowrap text-[13px] font-medium text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <MagneticLink
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={
                isHome
                  ? "btn-cta-primary group inline-flex h-8 items-center whitespace-nowrap rounded-full px-3.5 text-[12px] font-semibold md:h-9 md:px-4 md:text-[13px]"
                  : "btn-primary inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium"
              }
            >
              Обсудить
            </MagneticLink>
          </motion.nav>

          <button
            type="button"
            className="relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </motion.div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="mx-3 mt-2 rounded-2xl border border-white/10 bg-[#121110]/92 px-4 py-5 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col gap-0.5" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-primary mt-2 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Обсудить проект
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
