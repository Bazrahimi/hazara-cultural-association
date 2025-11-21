const PostCardSkeleton = () => {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 animate-pulse">
      {/* Heading placeholder */}
      <div className="mx-auto mb-6 h-6 w-48 rounded bg-gray-200" />

      {/* 4 cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            {/* Top image skeleton */}
            <div className="h-44 w-full bg-gray-200" />

            {/* Bottom text */}
            <div className="p-4 space-y-3">
              {/* Category + date */}
              <div className="h-3 w-32 rounded bg-gray-200" />

              {/* Title lines */}
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostCardSkeleton;
