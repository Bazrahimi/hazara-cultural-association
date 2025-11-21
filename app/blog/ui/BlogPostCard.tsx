// app/blog/ui/BlogPostCard.tsx

import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import Link from "next/link";

type BlogPostCardProps = {
  post: {
    id: number;
    slug: string;
    title: string;
    hero_img_path: string | null;
    is_rtl: boolean;
    authorName: string;
  };
};

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const isRTL = post.is_rtl;

  const byLabel = isRTL ? "منتشر شده توسط" : "Published by";
  const fallbackAuthor = "Unknown";

  const ctaText = isRTL
    ? "برای خواندن کامل مقاله کلیک یا تپ کنید"
    : "Read full article";

  return (
    <Link
      key={post.id}
      href={`/blog/${post.slug}`}
      className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <article className="flex h-full flex-col">
        {/* Top: title + author */}
        <div className="p-4" dir={isRTL ? "rtl" : "ltr"}>
          <Header
            as="h3"
            size="sm"
            className={`text-gray-700 ${isRTL ? "text-right" : ""}`}
          >
            {post.title}
          </Header>

          <p className="mt-1 text-xs text-gray-500">
            {byLabel}{" "}
            <span className="font-semibold">
              {post.authorName || fallbackAuthor}
            </span>
          </p>
        </div>

        {/* Bottom: image or placeholder + CTA */}
        <div className="relative h-44 w-full overflow-hidden">
          {post.hero_img_path ? (
            <>
              <Image
                src={cldCardHeroAuto(post.hero_img_path)}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={IMAGE_DEFAULT_BLUR}
              />
              {/* Darker overlay with centered CTA */}
              <div className="absolute inset-x-0 bottom-0 bg-black/40 px-3 py-2 flex items-center justify-center">
                <span className="text-xs font-semibold text-white text-center">
                  {ctaText}
                </span>
              </div>
            </>
          ) : (
            // Grey placeholder with centered CTA
            <div className="flex h-full w-full items-center justify-center bg-gray-300 px-3">
              <span className="text-xs font-semibold text-gray-700 text-center">
                {ctaText}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogPostCard;
