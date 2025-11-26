// app/blog/ui/BlogPostCard.tsx

import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import Link from "next/link";
import type { PostCardRow } from "../lib/definitions";
import { cardImgPlaceholder, CategoryId } from "../lib/helper";

type BlogPostCardProps = {
  post: PostCardRow;
};

// ----- Card component -----

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const isRTL = post.isRtl;

  const byLabel = isRTL ? "منتشر شده توسط" : "Published by";
  const fallbackAuthor = "Unknown";
  const ctaText = isRTL ? "مطلب و مقاله را کامل بخوانید" : "Read Full Article";

  const placeholderSrc = cardImgPlaceholder(
    post.categoryId as CategoryId,

    isRTL
  );

  return (
    <Link
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

        {/* Bottom: media block */}
        <div className="relative mt-auto h-44 w-full overflow-hidden">
          {post.heroImgPath ? (
            <>
              <Image
                src={cldCardHeroAuto(post.heroImgPath)}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={IMAGE_DEFAULT_BLUR}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/40 px-3 py-2 backdrop-blur-sm">
                <span className="text-xs font-semibold text-white text-center">
                  {ctaText}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Category-based SVG poster */}
              <Image
                src={placeholderSrc}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/35 px-3 py-2 backdrop-blur-sm">
                <span className="text-xs font-semibold text-white text-center">
                  {ctaText}
                </span>
              </div>
            </>
          )}
        </div>
      </article>
    </Link>
  );
};

export default BlogPostCard;
