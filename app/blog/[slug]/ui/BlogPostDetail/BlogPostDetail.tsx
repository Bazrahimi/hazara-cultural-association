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
  // categoryId: 2 = advocacy event
  const isEvent = post.categoryId === 2;
  const isRTL = post.isRtl === true;

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
          href={`/blog/p/${post.categoryId}`}
          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-200 transition"
        >
          {getCategoryLabel(post.categoryId, isRTL)}
        </Link>
      </div>

      {/* Advocacy event meta */}
      {isEvent && (post.eventDate || post.eventLocation) && (
        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900">
          <p className="font-semibold">
            {isRTL ? "جزییات برنامهٔ دادخواهی" : "Advocacy event details"}
          </p>

          {post.eventDate && (
            <p>
              <span className="font-medium">
                {isRTL ? "تاریخ و زمان: " : "Date & time: "}
              </span>
              {new Date(post.eventDate).toLocaleString("en-AU", {
                timeZone: "Australia/Melbourne",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}

          {post.eventLocation && (
            <p>
              <span className="font-medium">
                {isRTL ? "محل برگزاری: " : "Location: "}
              </span>
              {post.eventLocation}
            </p>
          )}
        </div>
      )}

      {/* Hero Image */}
      <HeroImage
        src={post.heroImgPath}
        alt={post.title}
        categoryId={post.categoryId}
      />

      {/* Content */}
      <ContentSection
        isRTL={post.isRtl}
        content={post.contentHtml}
        isLink={post.categoryId === 99}
      />

      {/* Owner/Admin controls */}
      {canManage && (
        <ManagePostControls
          postId={post.id}
          status={post.status}
          isFeatured={post.isFeatured}
          isRTL={post.isRtl}
          slug={post.slug}
          updatedAt={post.updatedAt}
        />
      )}
    </article>
  );
}
