// app/blog/[slug]/loading.tsx

export default function LoadingBlogPost() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 w-3/4 rounded bg-gray-200 mb-6" />

      {/* Meta skeleton */}
      <div className="flex gap-4 mb-4">
        <div className="h-4 w-24 rounded bg-gray-200" />
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>

      {/* Image skeleton */}
      <div className="h-64 w-full rounded-xl bg-gray-200 mb-8" />

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
      </div>
    </div>
  );
}
