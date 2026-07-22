export const site = {
  name: "TSBLV",
  tagline: "Дизайн и разработка сайтов для бизнеса",
  email: "biznes2001md@gmail.com",
  /** Opens Gmail compose in a new tab — prefer over mailto for primary email CTAs. */
  emailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=biznes2001md@gmail.com",
  telegram: "https://t.me/moralyss",
  telegramHandle: "@moralyss",
  availability: "Есть место для нового проекта",
  year: 2026,
} as const;

export const navLinks = [
  { href: "/#work", label: "Работы" },
  { href: "/archive", label: "Архив" },
] as const;
