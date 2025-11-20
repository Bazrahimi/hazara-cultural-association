// app/blog/[slug]/ui/BlogPostDetail.tsx
import type { BlogPostDetail } from "@/app/blog/lib/data";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import { ManagePostControls } from "./ManagePostControls";

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
        {/* Author */}
        {post.authorName && (
          <span
            className={`flex items-center gap-1 ${
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
          </span>
        )}

        {/* Date – same format for RTL & LTR, always LTR for the date string */}
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

        {/* Category badge using numeric category_id */}
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-700">
          {getCategoryLabel(post.category_id, isRTL)}
        </span>
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
              className="object-cover"
              sizes="(min-width: 1024px) 800px, 100vw"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <section
        className={`prose prose-sm max-w-none sm:prose-base prose-img:rounded-lg ${
          isRTL ? "text-right" : ""
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div
          className="prose-headings:scroll-mt-24"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
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
