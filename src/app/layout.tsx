import type { Metadata } from "next";
import { JetBrains_Mono, Onest, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-newsreader",
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
    default: "TSBLV - сайты для малого бизнеса",
    template: "%s · TSBLV",
  },
  description:
    "Независимая российская студия: выразительные сайты, Telegram Mini Apps и небольшие веб-сервисы для малого бизнеса, экспертов и частных проектов.",
  openGraph: {
    title: "TSBLV - сайты для малого бизнеса",
    description:
      "Понятная структура, сильная подача и аккуратные анимации. Сайты, которые приятно смотреть и удобно использовать.",
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
      className={`${onest.variable} ${sourceSerif.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="grain" aria-hidden />
        <Header />
        <main className="w-full max-w-full overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
