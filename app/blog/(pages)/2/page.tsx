import { Suspense } from "react";
import CategoryBlogPosts from "../ui/CategoryBlogPosts";
import PostCardSkeleton from "../ui/PostCardSkeleton";

export default function AdvocacyCategoryPage() {
  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <CategoryBlogPosts
        categoryId={2}
        heading="Advocacy Events"
        description="Rallies, vigils, and advocacy events for Hazara justice and human rights."
      />
    </Suspense>
  );
}
