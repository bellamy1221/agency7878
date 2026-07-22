export const site = {
  name: "TSBLV",
  tagline: "Сайты для малого бизнеса и частных проектов",
  email: "hello@tsblv.ru",
  telegram: "https://t.me/tsblv",
  telegramHandle: "@tsblv",
  github: "https://github.com/tsblv",
  availability: "Открыт для новых проектов",
  year: new Date().getFullYear(),
} as const;

export const navLinks = [
  { href: "/#work", label: "Работы" },
  { href: "/archive", label: "Архив" },
] as const;
