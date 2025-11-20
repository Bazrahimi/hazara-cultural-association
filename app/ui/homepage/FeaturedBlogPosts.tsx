import { getFeaturedBlogPosts } from "@/app/blog/lib/data";
import { getCategoryLabel } from "@/app/blog/lib/helper";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import Link from "next/link";
import { P } from "../global/paragraph";

const FeaturedBlogPosts = async () => {
  const featuredPosts = await getFeaturedBlogPosts(20);
  if (featuredPosts.length === 0) return null;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      <Header as="h2" size="md" className="mb-6 text-center">
        Latest News & Community Updates
      </Header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPosts.map((post) => {
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
                    src={cldDetailHeroAuto(post.hero_img_path)}
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

              {/* Bottom: category + date + title (consistent) */}
              <div className="p-4" dir={isRTL ? "rtl" : "ltr"}>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {getCategoryLabel(post.category_id, isRTL)}{" "}
                  {post.publishedAt && (
                    <span className="text-gray-400" dir="ltr">
                      • {post.publishedAt}
                    </span>
                  )}
                </p>

                <h3
                  className={`text-base font-semibold text-gray-900 line-clamp-2 transition group-hover:text-blue-600 ${
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
    </section>
  );
};

export default FeaturedBlogPosts;
