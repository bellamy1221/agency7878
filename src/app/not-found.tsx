import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-[1400px] flex-col items-start justify-center px-4 py-20 md:px-6 lg:px-8">
      <p className="editorial-label mb-4">404</p>
      <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Такой страницы нет. Вернитесь на главную или откройте архив работ.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm text-background"
        >
          На главную
        </Link>
        <Link
          href="/archive"
          className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm"
        >
          Архив
        </Link>
      </div>
    </div>
  );
}
