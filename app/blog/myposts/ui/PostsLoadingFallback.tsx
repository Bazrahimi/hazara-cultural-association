// app/blog/myposts/ui/PostsLoadingFallback.tsx

export default function PostsLoadingFallback() {
  return (
    <div className="grid gap-6 md:grid-cols-2 animate-pulse">
      {/* Drafts */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
        <div className="h-5 w-32 bg-slate-200 rounded" />
        <div className="h-4 w-48 bg-slate-200 rounded" />
        <div className="h-16 w-full bg-slate-100 rounded" />
      </div>

      {/* Published */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 space-y-3">
        <div className="h-5 w-32 bg-emerald-200 rounded" />
        <div className="h-4 w-48 bg-emerald-200 rounded" />
        <div className="h-16 w-full bg-emerald-100 rounded" />
      </div>
    </div>
  );
}
