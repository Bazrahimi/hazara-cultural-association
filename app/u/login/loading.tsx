export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-8 animate-pulse">
        <div className="h-7 w-40 bg-slate-300/60 rounded-md mx-auto mb-8" />

        <div className="space-y-5">
          {/* Email skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-slate-300/60 rounded" />
            <div className="h-11 w-full bg-slate-200/70 rounded-md" />
          </div>

          {/* Password skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-20 bg-slate-300/60 rounded" />
            <div className="h-11 w-full bg-slate-200/70 rounded-md" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="mt-8 h-11 bg-slate-300/60 w-full rounded-md" />

        <div className="mt-4 h-4 w-24 bg-slate-200/80 rounded mx-auto" />

        <div className="mt-6 h-11 w-full bg-slate-200/80 rounded-md" />
      </div>
    </div>
  );
}
