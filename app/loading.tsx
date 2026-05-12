export default function Loading() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-border px-8 py-5">
        <div className="h-5 w-32 animate-pulse rounded bg-surface-2" />
      </div>
      <div className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="h-9 w-2/3 animate-pulse rounded bg-surface-2" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-surface-2" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-lg border border-border bg-surface"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
