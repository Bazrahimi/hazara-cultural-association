export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 animate-pulse">
        {/* Heading skeleton */}
        <div className="h-6 w-52 bg-slate-300/70 mx-auto rounded-md mb-8" />

        <div className="space-y-5">
          {/* Email field skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-28 bg-slate-300/60 rounded" />
            <div className="h-11 w-full bg-slate-200/80 rounded-md" />
          </div>

          {/* Password field skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-300/60 rounded" />
            <div className="h-11 w-full bg-slate-200/80 rounded-md" />
          </div>

          {/* Submit button skeleton */}
          <div className="h-11 w-full bg-slate-300/70 rounded-md mt-3" />

          {/* Message / text skeleton */}
          <div className="h-4 w-56 bg-slate-200/80 rounded mx-auto mt-2" />
        </div>

        {/* Terms / login link skeleton */}
        <div className="mt-6 space-y-3">
          <div className="h-3 w-64 bg-slate-200/70 mx-auto rounded" />
          <div className="h-11 w-full bg-slate-200/80 rounded-md" />
        </div>
      </div>
    </div>
  );
}
