const PostCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">
      <article className="flex h-full flex-col">
        {/* Title (above image) */}
        <div className="px-4 pt-4 space-y-2">
          <div className="h-4 w-11/12 rounded bg-gray-200" />
          <div className="h-4 w-8/12 rounded bg-gray-200" />
        </div>

        {/* Image */}
        <div className="relative mt-3 h-44 w-full bg-gray-200" />
      </article>
    </div>
  );
};

export default PostCardSkeleton;
