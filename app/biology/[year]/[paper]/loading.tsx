export default function PaperLoading() {
  return (
    <div className="flex flex-1 flex-col md:h-screen md:overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-6 py-3 shrink-0">
        <div className="flex items-baseline gap-3">
          <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-16 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-10 animate-pulse rounded bg-surface-2" />
        </div>
        <div className="h-7 w-7 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-2 shrink-0">
        <div className="h-7 w-7 animate-pulse rounded bg-surface-2" />
        <div className="h-7 w-48 animate-pulse rounded bg-surface-2" />
        <div className="h-5 w-px bg-border" />
        <div className="h-7 w-32 animate-pulse rounded bg-surface-2" />
        <div className="ml-auto h-7 w-24 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="flex flex-1 items-center justify-center bg-surface-2 text-sm text-muted">
        Loading paper…
      </div>
    </div>
  );
}
