import Link from "next/link";
import { navLinks, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-6 lg:px-8 lg:py-20">
        <div className="space-y-4">
          <p className="text-2xl font-medium tracking-tight">{site.name}</p>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Выразительные лендинги и сайты с понятной структурой, продуманной
            анимацией и аккуратной технической реализацией.
          </p>
          <p className="note-chip !normal-case tracking-normal">
            {site.availability}
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm text-muted">Навигация</p>
          <ul className="space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="transition-colors hover:text-accent">
                Контакт
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm text-muted">Связь</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Telegram {site.telegramHandle}
              </a>
            </li>
            <li>
              <a
                href={site.emailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <p>
            © {site.year} {site.name}
          </p>
          <p>Независимый дизайнер и разработчик</p>
        </div>
      </div>
    </footer>
  );
}
