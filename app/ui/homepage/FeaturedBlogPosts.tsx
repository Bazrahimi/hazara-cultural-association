import { getFeaturedBlogPosts } from "@/app/blog/lib/data";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import Link from "next/link";

const FeaturedBlogPosts = async () => {
  // For now, load up to 20 items
  const featuredPosts = await getFeaturedBlogPosts(20);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="mx-auto mt-16 max-w-6xl px-4">
      {/* Section Header */}
      <Header as="h2" size="md" className="mb-6 text-center">
        Latest News &amp; Community Updates
      </Header>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPosts.map((post) => {
          const isRTL = post.is_rtl;

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              dir={isRTL ? "rtl" : "ltr"}
              className={`group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {/* Image */}
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
                <div className="flex h-44 items-center justify-center bg-gray-50 text-gray-400">
                  {/* Default fallback */}
                  No image
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                <p
                  className={`mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {post.category.replace("_", " ")}{" "}
                  {post.publishedAt && (
                    <span className="text-gray-400">• {post.publishedAt}</span>
                  )}
                </p>

                <h3
                  className={`line-clamp-2 text-base font-semibold text-gray-900 transition group-hover:text-blue-600 ${
                    isRTL ? "text-right" : "text-left"
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
