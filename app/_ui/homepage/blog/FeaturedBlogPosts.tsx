import { Header, P } from "@/app/_ui";
import TricolorRule from "@/app/_ui/TricolorRule";
import { CATEGORY_MAP, getCategoryMeta } from "@/app/blog/post/_lib/category";
import PostsSection from "@/app/blog/ui/posts/PostsSection";
import PostsSectionSkeleton from "@/app/blog/ui/posts/PostsSectionSkeleton";
import { Suspense } from "react";

const CATEGORY_IDS = Object.keys(CATEGORY_MAP)
  .map(Number)
  .sort()
  .sort((a, b) => a - b) as readonly number[];

const FeaturedBlogPosts = ({ limit }: { limit: number }) => {
  return (
    <section className="mx-auto">
      <Header as="h2" size="md" align="center" className="my-5 text-center">
        Latest News, Stories &amp; Community Updates
      </Header>

      <div>
        {CATEGORY_IDS.map((categoryId) => {
          const meta = getCategoryMeta(categoryId);
          if (!meta) return null;

          return (
            <section key={categoryId} className="pt-5">
              <div className="mb-6 px-3">
                <Header
                  as="h3"
                  align="center"
                  size="sm"
                  className="text-hca-blue-dark mb-1"
                >
                  {meta.heading}
                </Header>
                <P className="text-sm text-gray-600 text-center">
                  {meta.shortDesc}
                </P>
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
