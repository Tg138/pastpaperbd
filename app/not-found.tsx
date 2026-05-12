import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-8 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:text-accent transition-colors"
        >
          pastpaperbd
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-8 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="text-xs uppercase tracking-wider text-muted">404</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Nothing here.
          </h1>
          <p className="mt-3 text-muted">
            That page isn&apos;t in the deck. Try one of these instead.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link
              href="/biology"
              className="rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium hover:border-accent hover:bg-accent-soft transition-colors"
            >
              Papers
            </Link>
            <Link
              href="/biology/spec"
              className="rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium hover:border-accent hover:bg-accent-soft transition-colors"
            >
              Spec
            </Link>
            <Link
              href="/biology/notes"
              className="rounded-md border border-border bg-surface px-4 py-3 text-sm font-medium hover:border-accent hover:bg-accent-soft transition-colors"
            >
              Notes
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
