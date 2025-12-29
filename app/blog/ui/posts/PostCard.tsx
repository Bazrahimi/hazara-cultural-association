// app/blog/ui/BlogPostCard.tsx

import { cldCardHeroAuto } from "@/app/lib/cloudinary";
import { cn } from "@/app/lib/helper";
import { BlogRoutes } from "@/app/lib/routes";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import { P } from "@/app/ui/global/paragraph";
import Image from "next/image";
import Link from "next/link";
import type { PostCardRow } from "../../post/lib/definitions";

type PostCardProps = {
  post: PostCardRow;
};

// ----- Card component -----

const PostCard = ({ post }: PostCardProps) => {
  const isRTL = post.isRtl;
  const ctaText = isRTL ? "ادامه مطلب" : "View Details";

  return (
    <Link
      href={`${BlogRoutes.post(post.slug)}?catId=${post.categoryId}&rtl=${isRTL ? 1 : 0}&id=${post.postId}`}
      className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <article className="flex h-full flex-col">
        {/* Top: title*/}

        <Header
          as="h4"
          size="sm"
          align={isRTL ? "right" : "left"}
          className={cn(
            "relative inline-block leading-snug text-gray-800",
            "wrap-break-word",

            // underline hover animation
            "after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full",
            "after:origin-left after:scale-x-0 after:bg-hca-yellow-dark",
            "after:transition-transform after:duration-300",
            "group-hover:after:scale-x-100",

            // RTL underline correction
            isRTL ? "after:right-0 after:left-auto after:origin-right" : ""
          )}
        >
          {post.title}
        </Header>

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
              {/* CTA overlay */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-hca-yellow-dark/80 group-hover:bg-hca-yellow-main px-3 py-2 backdrop-blur-sm">
                <span className="text-xs font-semibold text-white text-center">
                  {ctaText}
                </span>
              </div>
            </>
          ) : (
            <div className="relative flex h-full flex-col justify-between bg-gray-50 px-4 py-3">
              <P
                size="sm"
                dir={isRTL ? "rtl" : "ltr"}
                className={cn(
                  "line-clamp-5 leading-relaxed text-gray-700",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                {post.excerpt || "No preview available."}
              </P>

              <Button
                size="xs"
                variant="outline"
                className="
                  flex items-center justify-center
                  transition
                  hover:bg-hca-yellow-main hover:text-white hover:border-hca-yellow-dark
                  group-hover:bg-hca-yellow-main
                  group-hover:text-white
                  group-hover:border-hca-yellow-dark
                "
              >
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
