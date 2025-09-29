// app/about-us/loading.tsx
export default function Loading() {
  return (
    <main
      className="mx-auto max-w-6xl px-4 py-10"
      role="status"
      aria-live="polite"
    >
      {/* Title */}
      <div className="h-8 w-40 rounded bg-gray-200 animate-pulse" />

      {/* Intro paragraph */}
      <div className="mt-4 space-y-2 animate-pulse">
        <div className="h-4 w-11/12 rounded bg-gray-200" />
        <div className="h-4 w-10/12 rounded bg-gray-200" />
        <div className="h-4 w-9/12 rounded bg-gray-200" />
      </div>

      {/* Sections */}
      <div className="mt-10 space-y-10">
        {["Acknowledgement", "Our Purpose", "Our Vision", "What We Do"].map(
          (_, i) => (
            <section key={i} className="animate-pulse">
              <div className="h-5 w-56 rounded bg-gray-200" />
              <div className="mt-3 space-y-2">
                <div className="h-4 w-11/12 rounded bg-gray-200" />
                <div className="h-4 w-10/12 rounded bg-gray-200" />
                <div className="h-4 w-8/12 rounded bg-gray-200" />
              </div>
            </section>
          )
        )}

        {/* Team grid skeleton */}
        <section className="animate-pulse">
          <div className="h-5 w-56 rounded bg-gray-200" />
          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-7 md:grid-cols-3 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="mx-auto h-24 w-24 rounded-full bg-gray-200" />
                <div className="mx-auto mt-3 h-4 w-2/3 rounded bg-gray-200" />
                <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-gray-100" />
                <div className="mx-auto mt-3 w-full max-w-[92%] border-t border-gray-100" />
                <div className="mt-3 h-3 w-full rounded bg-gray-100" />
                <div className="mt-2 h-3 w-5/6 rounded bg-gray-100" />
                <div className="mt-2 h-3 w-2/3 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <span className="sr-only">Loading About Us…</span>
    </main>
  );
}
