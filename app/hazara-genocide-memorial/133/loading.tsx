// app/events/133rd-hazara-genocide-memorial/loading.tsx
export default function Loading() {
  return (
    <main
      className="mx-auto max-w-6xl px-4 py-10"
      role="status"
      aria-live="polite"
    >
      {/* Title */}
      <div className="h-8 w-80 rounded bg-gray-200 animate-pulse" />
      {/* Subtitle */}
      <div className="mt-2 h-4 w-2/3 rounded bg-gray-100 animate-pulse" />

      {/* Overview */}
      <section className="mt-10 space-y-4">
        <div className="h-5 w-40 rounded bg-gray-200 animate-pulse" />
        <div className="space-y-2 animate-pulse">
          <div className="h-4 w-[92%] rounded bg-gray-100" />
          <div className="h-4 w-[88%] rounded bg-gray-100" />
          <div className="h-4 w-[80%] rounded bg-gray-100" />
        </div>
        <div className="space-y-2 animate-pulse">
          <div className="h-4 w-[90%] rounded bg-gray-100" />
          <div className="h-4 w-[78%] rounded bg-gray-100" />
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-10 space-y-4">
        <div className="h-5 w-36 rounded bg-gray-200 animate-pulse" />
        <ul className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-gray-200" />
              <span className="h-4 w-[88%] rounded bg-gray-100" />
            </li>
          ))}
        </ul>
      </section>

      {/* Speakers */}
      <section className="mt-10">
        <div className="h-5 w-28 rounded bg-gray-200 animate-pulse" />
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              <div className="h-20 w-20 rounded-xl bg-gray-200 animate-pulse" />
              <div className="flex-1 space-y-2 animate-pulse">
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-100" />
                <div className="h-3 w-[85%] rounded bg-gray-100" />
                <div className="h-3 w-[70%] rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exhibition */}
      <section className="mt-10 space-y-3">
        <div className="h-5 w-28 rounded bg-gray-200 animate-pulse" />
        <div className="space-y-2 animate-pulse">
          <div className="h-4 w-[92%] rounded bg-gray-100" />
          <div className="h-4 w-[86%] rounded bg-gray-100" />
          <div className="h-4 w-[72%] rounded bg-gray-100" />
        </div>
      </section>

      {/* Photo Gallery (matches your larger cell layout: 1 / 2 columns) */}
      <section className="mt-10">
        <div className="h-5 w-32 rounded bg-gray-200 animate-pulse" />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="h-64 w-full rounded-t-xl bg-gray-200 animate-pulse sm:h-72 md:h-80" />
              <div className="px-4 py-3">
                <div className="h-3 w-3/4 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <span className="sr-only">Loading event report…</span>
    </main>
  );
}
