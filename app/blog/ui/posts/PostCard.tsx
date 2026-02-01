// app/blog/ui/BlogPostCard.tsx

import { cldCardHeroAuto } from "@/app/_lib/cloudinary";
import { cn } from "@/app/_lib/helper";
import { BlogRoutes } from "@/app/_lib/routes";
import { Button, Header, IMAGE_DEFAULT_BLUR, P } from "@/app/_ui";
import Image from "next/image";
import Link from "next/link";
import type { PostCardRow } from "../../post/_lib/definitions";
import { POST_CARD } from "../../post/_lib/helper";

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
      className={POST_CARD.link}
    >
      <article className={POST_CARD.article}>
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
            isRTL ? "after:right-0 after:left-auto after:origin-right" : "",
          )}
        >
          {post.title}
        </Header>

        {/* Bottom: media block */}
        <div className={POST_CARD.media}>
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
              <div className={POST_CARD.ctaOverlay}>
                <span className={POST_CARD.ctaText}>{ctaText}</span>
              </div>
            </>
          ) : (
            <div className="relative flex h-full flex-col justify-between bg-gray-50 px-4 py-3">
              <P
                size="sm"
                dir={isRTL ? "rtl" : "ltr"}
                className={cn(
                  "line-clamp-5 leading-relaxed text-gray-700",
                  isRTL ? "text-right" : "text-left",
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
