// app/blog/[slug]/ui/BlogPostDetail.tsx
import { Header } from "@/app/ui/global/Header";
import Link from "next/link";
import HeroImage from "./HeroImage";

import { getPostById } from "@/app/blog/lib/data";
import { BlogRoutes } from "@/app/lib/routes";
import { slugify } from "@/app/shop/lib/helper";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCategoryLabel } from "../../../../lib/category";
import ContentSection from "./ContentSection";
import EventSection from "./EventSection";
import ManageControlGate from "./ManageControlGate";

type PostDetailProps = {
  postId: number;
  isRTL: boolean;
};

const PostBody = async ({ postId, isRTL }: PostDetailProps) => {
  const post = await getPostById(postId);
  if (!post) notFound();

  const isEvent = post.categoryId === 2;

  return (
    <article
      dir={isRTL ? "rtl" : "ltr"}
      className={`mx-auto max-w-4xl px-4 py-10 ${
        isRTL ? "text-right" : "text-left"
      }`}
    >
      {/* Title */}
      <Header
        as="h1"
        size="md"
        className="mb-3"
        align={isRTL ? "right" : "left"}
      >
        {post.title}
      </Header>

      {/* Author + date + category */}
      <div
        className={`mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600 ${
          isRTL ? "justify-end" : ""
        }`}
      >
        {/* Author – clickable, filtered by author + category */}
        {post.authorName && post.userId && (
          <Link
            href={`/blog/p/u/${slugify(post.authorName ?? "")}-${post.userId}`}
            className={`flex items-center gap-1 underline-offset-2 hover:underline ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {isRTL ? (
              <>
                <span className="font-semibold">{post.authorName}</span>
                <span>نوشته</span>
              </>
            ) : (
              <>
                <span>By</span>
                <span className="font-semibold">{post.authorName}</span>
              </>
            )}
          </Link>
        )}

        {/* Date – same format, always LTR for the date string */}
        {post.publishedAt && (
          <span className="text-gray-500">
            {isRTL ? (
              <>
                • منتشر شده در{" "}
                <span dir="ltr" className="inline-block">
                  {post.publishedAt}
                </span>
              </>
            ) : (
              <>
                • Published{" "}
                <span dir="ltr" className="inline-block">
                  {post.publishedAt}
                </span>
              </>
            )}
          </span>
        )}

        {/* Category badge – clickable, goes to /blog/[categoryId] */}
        <Link
          href={BlogRoutes.categoryById(post.categoryId)}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-200 transition"
        >
          {getCategoryLabel(post.categoryId, isRTL)}
        </Link>
      </div>

      {/* Advocacy event meta */}
      {isEvent && (
        <EventSection
          eventDate={post.eventDate!}
          eventLocation={post.eventLocation!}
          isRTL={isRTL}
        />
      )}

      <ContentSection
        isRTL={post.isRtl}
        content={post.contentHtml}
        isLink={post.categoryId === 99}
      />

      {/* Content */}
      <Suspense fallback={null}>
        <HeroImage
          src={post.heroImgPath}
          alt={post.title}
          categoryId={post.categoryId}
        />
      </Suspense>

      <Suspense fallback={null}>
        <ManageControlGate
          postId={post.id}
          status={post.status}
          isFeatured={post.isFeatured}
          slug={post.slug}
          updatedAt={post.updatedAt}
        />
      </Suspense>
    </article>
  );
};

export default PostBody;
