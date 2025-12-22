export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 animate-pulse">
        {/* Header skeleton */}
        <div className="h-6 w-48 bg-slate-300/60 mx-auto rounded-md mb-6" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-64 bg-slate-200/70 mx-auto rounded" />
          <div className="h-4 w-52 bg-slate-200/70 mx-auto rounded" />
        </div>

        <div className="space-y-4">
          {/* New Password label */}
          <div className="h-4 w-28 bg-slate-300/60 rounded" />
          {/* New Password input */}
          <div className="h-11 w-full bg-slate-200/70 rounded-md" />

          {/* Confirm Password label */}
          <div className="h-4 w-36 bg-slate-300/60 rounded" />
          {/* Confirm Password input */}
          <div className="h-11 w-full bg-slate-200/70 rounded-md" />

          {/* Submit button */}
          <div className="h-11 w-full bg-slate-300/60 rounded-md mt-2" />
        </div>
      </div>
    </div>
  );
}
