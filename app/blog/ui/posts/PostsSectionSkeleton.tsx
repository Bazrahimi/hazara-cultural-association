import { POSTS_SECTION_GRID_CLASS } from "../../post/lib/helper";
import PostCardSkeleton from "./PostCardSkeleton";

const PostsSectionSkeleton = ({ cardCount }: { cardCount: number }) => {
  return (
    <div className={POSTS_SECTION_GRID_CLASS}>
      {Array.from({ length: cardCount }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default PostsSectionSkeleton;
