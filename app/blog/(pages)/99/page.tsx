import { Suspense } from "react";
import CategoryBlogPosts from "../ui/CategoryBlogPosts";
import PostCardSkeleton from "../ui/PostCardSkeleton";

export default function OtherCategoryPage() {
  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <CategoryBlogPosts
        categoryId={99}
        heading="Other Articles / Books / External Links"
        description="
          This category features external articles, historical documents, book excerpts,
          research papers, and third-party publications related to Hazara history,
          culture, politics, and global issues. These are curated references that help
          our community stay informed through broader sources beyond our own
          publications. All external links are credited to their original authors and
          publishers."
      />
    </Suspense>
  );
}
