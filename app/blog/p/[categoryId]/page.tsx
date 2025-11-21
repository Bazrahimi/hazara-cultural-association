import { getCategoryMeta } from "../../lib/helper";
import { Suspense } from "react";
import PostCardSkeleton from "../ui/PostCardSkeleton";
import CategoryBlogPosts from "../ui/CategoryBlogPosts";
import NotFound from "@/app/not-found";

const BlogCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const {categoryId} = await params;
  const id = Number(categoryId);


  const meta = getCategoryMeta(id);
 if (!meta) return NotFound


  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <CategoryBlogPosts
        categoryId={meta.id}
        heading={meta.heading}
        description={meta.fullDesc}
      />
    </Suspense>
  );
};

export default BlogCategoryPage;
