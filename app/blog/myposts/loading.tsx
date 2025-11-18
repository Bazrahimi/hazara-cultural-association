// app/blog/myposts/loading.tsx (or whatever file this is in)

export default function LoadingMyPosts() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8 animate-pulse">
      {/* Page title skeleton */}
      <div className="h-7 w-40 rounded-md bg-slate-200" />

      {/* 3-column skeleton grid: Drafts / Published / Archived */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Drafts skeleton */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
          <div className="h-6 w-24 bg-slate-200 rounded" />
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="h-20 w-full bg-slate-100 rounded" />
        </div>

        {/* Published skeleton */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-3">
          <div className="h-6 w-24 bg-emerald-200 rounded" />
          <div className="h-4 w-48 bg-emerald-200 rounded" />
          <div className="h-20 w-full bg-emerald-100 rounded" />
        </div>

        {/* Archived skeleton */}
        <div className="rounded-xl border border-red-200 bg-red-50/60 p-5 space-y-3">
          <div className="h-6 w-24 bg-red-200 rounded" />
          <div className="h-4 w-48 bg-red-200 rounded" />
          <div className="h-20 w-full bg-red-100 rounded" />
        </div>
      </div>
    </div>
  );
}
