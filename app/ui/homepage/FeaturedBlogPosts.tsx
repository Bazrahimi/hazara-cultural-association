import Image from "next/image";
import Link from "next/link";
import { getFeaturedBlogPosts } from "@/app/blog/lib/data";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { Header } from "@/app/ui/global/Header";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { P } from "../global/paragraph";

function extractExcerpt(html: string, maxChars: number = 220) {
  // Grab the first <p> block
  const match = html.match(/<p[^>]*>(.*?)<\/p>/i);
  let text = match ? match[1] : html;

  // Strip remaining HTML
  text = text.replace(/<[^>]+>/g, "").trim();

  if (text.length > maxChars) text = text.slice(0, maxChars) + "…";
  return text;
}

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
          const excerpt =
            !post.hero_img_path && post.content_html
              ? extractExcerpt(post.content_html)
              : null;

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden transition hover:shadow-md"
            >
              {/* Image OR Excerpt Box */}
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
                  className={`h-44 w-full p-4 overflow-hidden bg-gray-900 flex items-center ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  dir={isRTL ? "rtl" : "ltr"}
                >
                  <P className="text-gray-50">
                    {excerpt}
                  </P>
                </div>
              )}

              {/* Bottom Section — CONSISTENT design */}
              <div className="p-4" dir={isRTL ? "rtl" : "ltr"}>
                <p className="text-xs uppercase font-medium text-gray-500 tracking-wide mb-1">
                  {post.category.replace("_", " ")}{" "}
                  {post.publishedAt && (
                    <span className="text-gray-400">• {post.publishedAt}</span>
                  )}
                </p>

                <h3
                  className={`text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition ${
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
