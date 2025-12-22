// app/ui/global/FeaturedBlogPosts.tsx

import { getFeaturedPostsByCategory } from "@/app/blog/lib/data";
import { CATEGORY_MAP, getCategoryMeta } from "@/app/blog/lib/category";
import BlogPostCard from "@/app/blog/ui/PostCard";
import { Header } from "@/app/ui/global/Header";
import Link from "next/link";
import { P } from "../../global/paragraph";

// Dynamically derive category IDs from CATEGORY_MAP (sorted 1..5,99)
const CATEGORY_IDS = Object.keys(CATEGORY_MAP)
  .map(Number)
  .sort((a, b) => a - b) as readonly number[];

const FeaturedBlogPosts = async () => {
  // Fetch up to 8 featured posts per category in parallel
  const results = await Promise.all(
    CATEGORY_IDS.map((categoryId) => getFeaturedPostsByCategory(categoryId, 8))
  );

  const sections = CATEGORY_IDS.map((categoryId, index) => ({
    categoryId,
    posts: results[index],
  }));

  // If no category has any featured posts, don't render anything
  const hasAnyPosts = sections.some((section) => section.posts.length > 0);
  if (!hasAnyPosts) return null;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      {/* Overall heading for the whole block */}
      <Header as="h2" size="md" className="mb-8 text-center">
        Latest News, Stories &amp; Community Updates
      </Header>

      <div className="space-y-10">
        {sections.map(({ categoryId, posts }) => {
          if (posts.length === 0) return null;

          const meta = getCategoryMeta(categoryId);
          if (!meta) return null;

          // Category listing page link (your dynamic category route)
          // const categoryLink = `/blog/p/${categoryId}`;

          // Split into main cards (first 4) + extra posts (next 4)
          const mainPosts = posts.slice(0, 4);
          const extraPosts = posts.slice(4);

          return (
            <section key={categoryId}>
              {/* Section heading + short description + "More Posts" button */}
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    {/* English heading (left side) */}
                    <Header as="h3" size="sm" className="text-blue-900">
                      {meta.heading}
                    </Header>

                    <Header
                      as="h3"
                      size="sm"
                      className="text-blue-900"
                      dir="rtl"
                    >
                      {meta.rtlHeading}
                    </Header>
                  </div>
                  {meta.shortDesc && (
                    <P className="text-sm text-gray-600">{meta.shortDesc}</P>
                  )}
                </div>
              </div>

              {/* Main cards (first row) */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {mainPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Extra posts (compact list underneath, optional) */}
              {extraPosts.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    More from {meta.heading}
                  </h4>
                  <ul className="space-y-1">
                    {extraPosts.map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-baseline justify-between text-sm text-blue-700 hover:text-blue-900"
                        >
                          <span className="line-clamp-1">{post.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* <Button as="link" href={categoryLink} size="sm" variant="outline">
                More Posts →
              </Button> */}

              {/* Divider between categories (works whether or not extra posts exist) */}
              {categoryId !== CATEGORY_IDS[CATEGORY_IDS.length - 1] && (
                <div className="my-10 border-t border-gray-200" />
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
