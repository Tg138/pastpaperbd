export default function NoteLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between border-b border-border px-8 py-5">
        <div className="h-5 w-40 animate-pulse rounded bg-surface-2" />
        <div className="h-7 w-7 animate-pulse rounded bg-surface-2" />
      </div>
      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-3 w-10 animate-pulse rounded bg-surface-2" />
          <div className="h-9 w-2/3 animate-pulse rounded bg-surface-2" />
          <div className="space-y-2 pt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-surface-2"
                style={{ width: `${85 - i * 8}%` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
