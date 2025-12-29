import { CATEGORY_MAP, getCategoryMeta } from "@/app/blog/post/lib/category";
import PostsSection from "@/app/blog/ui/posts/PostsSection";
import PostsSectionSkeleton from "@/app/blog/ui/posts/PostsSectionSkeleton";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import TricolorRule from "@/app/ui/global/TricolorRule";
import { Suspense } from "react";

const CATEGORY_IDS = Object.keys(CATEGORY_MAP)
  .map(Number)
  .sort()
  .sort((a, b) => a - b) as readonly number[];

const FeaturedBlogPosts = ({ limit }: { limit: number }) => {
  return (
    <section className="mx-auto">
      <Header as="h2" size="md" className="mb-8 text-center">
        Latest News, Stories &amp; Community Updates
      </Header>

      <div>
        {CATEGORY_IDS.map((categoryId) => {
          const meta = getCategoryMeta(categoryId);
          if (!meta) return null;

          return (
            <section key={categoryId}>
              <div className="mb-6">
                <Header as="h3" size="sm" className="text-hca-blue-dark mb-1">
                  {meta.heading}
                </Header>
                <P className="text-sm text-gray-600">{meta.shortDesc}</P>
              </div>

              <Suspense fallback={<PostsSectionSkeleton cardCount={limit} />}>
                <PostsSection
                  mode="featured"
                  limit={limit}
                  categoryId={categoryId}
                />
              </Suspense>
              <TricolorRule className="mt-5" />
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
