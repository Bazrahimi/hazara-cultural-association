export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center px-4 justify-center">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white/90 shadow-xl backdrop-blur-sm p-6 animate-pulse">
        {/* Title skeleton */}
        <div className="h-6 w-48 bg-slate-300/60 mx-auto rounded-md mb-6" />

        {/* Subtitle skeleton */}
        <div className="h-4 w-64 bg-slate-200/70 mx-auto rounded mb-6" />

        <div className="space-y-4">
          {/* Email label */}
          <div className="h-4 w-28 bg-slate-300/60 rounded" />

          {/* Email field */}
          <div className="h-11 w-full bg-slate-200/70 rounded-md" />

          {/* Button */}
          <div className="h-11 w-full bg-slate-300/60 rounded-md mt-2" />
        </div>
      </div>
    </div>
  );
}
