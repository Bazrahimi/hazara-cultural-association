// app/blog/[slug]/ui/BlogPostDetail.tsx
import type { BlogPostDetail } from "@/app/blog/lib/data";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import Link from "next/link";
import { ManagePostControls } from "./ManagePostControls";

import { slugify } from "@/app/shop/lib/helper";
import { getCategoryLabel } from "../../lib/helper";

type BlogPostDetailProps = {
  post: BlogPostDetail;
  canManage: boolean;
};

export default function BlogPostDetail({
  post,
  canManage,
}: BlogPostDetailProps) {
  // category_id: 2 = advocacy event
  const isEvent = post.category_id === 2;
  const isRTL = post.is_rtl === true;

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
        {post.authorName && post.authorId && (
          <Link
            href={`/blog/p/u/${slugify(post.authorName ?? "")}-${post.authorId}`}
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
          href={`/blog/${post.category_id}`}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-200 transition"
        >
          {getCategoryLabel(post.category_id, isRTL)}
        </Link>
      </div>

      {/* Advocacy event meta */}
      {isEvent && (post.event_date || post.event_location) && (
        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900">
          <p className="font-semibold">
            {isRTL ? "جزییات برنامهٔ دادخواهی" : "Advocacy event details"}
          </p>

          {post.event_date && (
            <p>
              <span className="font-medium">
                {isRTL ? "تاریخ و زمان: " : "Date & time: "}
              </span>
              {new Date(post.event_date).toLocaleString("en-AU", {
                timeZone: "Australia/Melbourne",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}

          {post.event_location && (
            <p>
              <span className="font-medium">
                {isRTL ? "محل برگزاری: " : "Location: "}
              </span>
              {post.event_location}
            </p>
          )}
        </div>
      )}

      {/* Hero Image */}
      {post.hero_img_path && (
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src={cldDetailHeroAuto(post.hero_img_path)}
              alt={post.title}
              fill
              placeholder="blur"
              blurDataURL={IMAGE_DEFAULT_BLUR}
              className="object-contain" // ⬅️ was object-cover
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section
        className={`
          mt-6
          rounded-xl bg-white/90 px-4 py-5 shadow-sm ring-1 ring-gray-100
        `}
      >
        <div
          className={`
            prose prose-sm sm:prose-base max-w-none prose-img:rounded-lg
            prose-headings:font-semibold prose-headings:text-gray-900
            prose-p:text-gray-800 prose-p:leading-relaxed
            prose-li:marker:text-gray-400

            /* 🔗 Link styling */
            prose-a:text-blue-700
            prose-a:font-semibold
            prose-a:no-underline
            hover:prose-a:underline
            prose-a:underline-offset-2
            prose-a:transition-colors
            hover:prose-a:text-blue-800

            ${isRTL ? "text-right prose-headings:text-right" : "prose-headings:text-left"}
          `}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div
            className="prose-headings:scroll-mt-24"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </div>
      </section>

      {/* Owner/Admin controls */}
      {canManage && (
        <ManagePostControls
          postId={post.id}
          status={post.status}
          isFeatured={post.is_featured}
          isRTL={post.is_rtl}
        />
      )}
    </article>
  );
}
