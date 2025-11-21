// app/blog/ui/BlogPostCard.tsx

import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";
import Link from "next/link";

type BlogPostCardProps = {
  post: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    hero_img_path: string | null;
    is_rtl: boolean;
  };
  categoryLabel: string;
};

const BlogPostCard = ({ post, categoryLabel }: BlogPostCardProps) => {
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
          className={`relative h-44 w-full bg-gray-900 p-4 flex flex-col justify-between overflow-hidden ${
            isRTL ? "text-right" : "text-left"
          }`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <P className="line-clamp-4 text-sm leading-relaxed text-gray-50">
            {post.excerpt}
          </P>

          <span
            className={`mt-2 font-bold text-gray-300 opacity-80 transition group-hover:text-blue-600 group-hover:opacity-100 ${
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
          {categoryLabel}{" "}
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
};

export default BlogPostCard;
