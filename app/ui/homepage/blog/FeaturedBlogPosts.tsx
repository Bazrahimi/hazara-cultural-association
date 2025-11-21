// app/ui/global/FeaturedBlogPosts.tsx (or wherever you keep it)

import { getFeaturedPostsByCategory } from "@/app/blog/lib/data";
import { CATEGORY_MAP, getCategoryMeta } from "@/app/blog/lib/helper"; // adjust path if needed
import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../global/components";
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
          const categoryLink = `/blog/p/${categoryId}`;

          // Split into main cards (first 4) + extra posts (next 4)
          const mainPosts = posts.slice(0, 4);
          const extraPosts = posts.slice(4);

          return (
            <section key={categoryId}>
              {/* Section heading + short description + "More Posts" button */}
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {meta.heading}
                  </h3>
                  {meta.shortDesc && (
                    <p className="text-sm text-gray-600">{meta.shortDesc}</p>
                  )}
                </div>
                <Button
                  as="link"
                  href={categoryLink}
                  size="sm"
                  variant="outline"
                >
                  More Posts →
                </Button>
              </div>

              {/* Main cards (first row) */}
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {mainPosts.map((post) => {
                  const isRTL = post.is_rtl;

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                    >
                      {/* Top: image OR excerpt box */}
                      {post.hero_img_path ? (
                        <div className="relative h-44 w-full overflow-hidden">
                          <Image
                            src={cldCardHeroAuto(post.hero_img_path)}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL={IMAGE_DEFAULT_BLUR}
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative h-44 w-full bg-gray-900 p-4 overflow-hidden flex flex-col justify-between ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <P className="line-clamp-4 text-sm leading-relaxed text-gray-50">
                            {post.excerpt}
                          </P>

                          <span
                            className={`mt-2 font-bold text-gray-300 opacity-80 group-hover:text-blue-600 group-hover:opacity-100 transition ${
                              isRTL ? "self-start" : "self-end"
                            }`}
                          >
                            {isRTL ? "ادامه مطلب →" : "Read full article →"}
                          </span>
                        </div>
                      )}

                      {/* Bottom: category + date + title */}
                      <div className="p-4" dir={isRTL ? "rtl" : "ltr"}>
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                          {meta.heading}{" "}
                          {post.publishedAt && (
                            <span className="text-gray-400" dir="ltr">
                              • {post.publishedAt}
                            </span>
                          )}
                        </p>

                        <h3
                          className={`text-sm font-medium text-gray-900 line-clamp-2 transition group-hover:text-blue-600 ${
                            isRTL ? "text-right" : ""
                          }`}
                        >
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
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
                          {post.publishedAt && (
                            <span className="ml-2 shrink-0 text-xs text-gray-400">
                              {post.publishedAt}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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
