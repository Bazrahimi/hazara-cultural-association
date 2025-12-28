import NotFound from "@/app/not-found";
import { Suspense } from "react";
import { getCategoryMeta } from "../../lib/category";
import CategoryBlogPosts from "../ui/CategoryBlogPosts";
import PostCardSkeleton from "../ui/PostCardSkeleton";

const BlogCategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: { categoryId: string };
}) => {
  const { category } = await params;
  const id = Number(searchParams.categoryId);

  const meta = getCategoryMeta(id);
  if (!meta) return NotFound();

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
