// app/blog/[slug]/ui/BlogPostDetail.tsx
import type { PostDetailRow } from "@/app/blog/lib/definitions";
import { Header } from "@/app/ui/global/Header";
import Link from "next/link";
import { ManagePostControls } from "../ManagePostControls";
import HeroImage from "./HeroImage";

import { slugify } from "@/app/shop/lib/helper";
import { getCategoryLabel } from "../../../lib/helper";
import ContentSection from "./ContentSection";

type BlogPostDetailProps = {
  post: PostDetailRow;
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
          href={`/blog/p/${post.category_id}`}
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
      <HeroImage
        src={post.hero_img_path}
        alt={post.title}
        categoryId={post.category_id}
      />

      {/* Content */}
      <ContentSection
        isRTL={post.is_rtl}
        content={post.content_html}
        isLink={post.category_id === 99}
      />

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
