// app/loading.tsx
export default function GenericLoading() {
  return (
    <main className="min-h-[60vh] grid place-items-center px-6">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700"
          aria-label="Loading"
          role="status"
        />
        <p className="text-sm text-slate-600">Loading…</p>
      </div>
    </main>
  );
}
