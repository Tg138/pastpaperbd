"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
          <div className="text-xs uppercase tracking-wider text-muted">Error</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Something went sideways.
          </h1>
          <p className="mt-3 text-muted">
            The page couldn&apos;t render. Try again, or head home and pick a different
            route.
          </p>
          {error.digest && (
            <p className="mt-3 font-mono text-xs text-muted">
              ref: {error.digest}
            </p>
          )}
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => unstable_retry()}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
