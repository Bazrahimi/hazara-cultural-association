// app/blog/post/category/ui/PostCardSkeleton.tsx (or your path)

import { POST_CARD } from "../../post/lib/helper";

const PostCardSkeleton = () => {
  return (
    <div className={POST_CARD.link + " animate-pulse"}>
      <article className={POST_CARD.article}>
        {/* Title */}
        <div className="p-1">
          <div className="space-y-2">
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-8/12 rounded bg-gray-200" />
          </div>
        </div>

        {/* Media block */}
        <div className={POST_CARD.media}>
          {/* Image placeholder */}
          <div className="absolute inset-0 bg-gray-200" />

          {/* Static CTA overlay (like real card) */}
          <div
            className={
              POST_CARD.ctaOverlay + " group-hover:bg-hca-yellow-dark/80"
            }
          >
            <span className={POST_CARD.ctaText}>View Details</span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostCardSkeleton;
