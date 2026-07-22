import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-sans-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif-accent",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TSBLV — дизайн и разработка сайтов",
    template: "%s · TSBLV",
  },
  description:
    "Независимый дизайнер и frontend-разработчик: лендинги и сайты с понятной структурой, продуманной анимацией и аккуратной реализацией.",
  openGraph: {
    title: "TSBLV — дизайн и разработка сайтов",
    description:
      "Выразительные лендинги и сайты для бизнеса. Дизайн и разработка в одних руках.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${interTight.variable} ${sourceSerif.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
