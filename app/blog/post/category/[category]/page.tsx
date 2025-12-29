import PostsSection from "@/app/blog/ui/posts/PostsSection";
import PostsSectionSkeleton from "@/app/blog/ui/posts/PostsSectionSkeleton";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { Suspense } from "react";
import { getCategoryMeta } from "../../lib/category";
import TricolorRule from "@/app/ui/global/TricolorRule";

const BlogCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;

}) => {
  const { category } = await params;
  const parts = category.split("-");
  const categoryId = Number(parts.at(-1))

  const meta = getCategoryMeta(categoryId);

  const limit = 8;

  return (
    <section className="mx-auto">
      <div className="mb-6">
        <Header as="h3" size="sm" className="text-hca-blue-dark mb-1">
          {meta?.heading}
        </Header>
        <P className="text-sm text-gray-600">{meta?.fullDesc}</P>
      </div>

      <Suspense fallback={<PostsSectionSkeleton cardCount={limit} />}>
        <PostsSection mode="featured" limit={limit} categoryId={categoryId} />
      </Suspense>
      <TricolorRule className="mt-5" />
    </section>
  );
};

export default BlogCategoryPage;
