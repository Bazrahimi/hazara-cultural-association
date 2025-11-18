// app/blog/ui/BlogPostFormSkeleton.tsx
export default function BlogPostFormSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-pulse">
      {/* Header */}
      <header className="mt-10 md:mt-5 space-y-2">
        <div className="h-7 w-64 rounded-md bg-slate-200" />
        <div className="h-4 w-80 rounded-md bg-slate-100" />
      </header>

      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-10 w-full rounded-md bg-slate-100" />
        </div>

        {/* Category + Status + Featured */}
        <div className="grid gap-4 md:grid-cols-3 items-end">
          <div className="space-y-2">
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-10 w-full rounded-md bg-slate-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-12 rounded bg-slate-200" />
            <div className="h-8 w-40 rounded-full bg-slate-100" />
          </div>
          <div className="h-5 w-40 rounded bg-slate-100" />
        </div>

        {/* Event + location row */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-10 w-full rounded-md bg-slate-100" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-10 w-full rounded-md bg-slate-100" />
          </div>
        </div>

        {/* Content editor */}
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-slate-200" />
          <div className="h-48 w-full rounded-md bg-slate-100" />
        </div>

        {/* Hero image */}
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="h-32 w-full rounded-md bg-slate-100" />
        </div>

        {/* Footer button row */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-4 w-56 rounded bg-slate-100" />
          <div className="h-9 w-28 rounded-md bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
