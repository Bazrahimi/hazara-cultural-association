// app/blog/[slug]/ui/BlogPostDetail.tsx
import type { BlogPostDetail } from "@/app/blog/lib/data";
import { cldDetailHeroAuto } from "@/app/lib/cloudinary";
import { Header } from "@/app/ui/global/Header";
import { IMAGE_DEFAULT_BLUR } from "@/app/ui/global/ImageShimer";
import Image from "next/image";
import { ManagePostControls } from "./ManagePostControls";

type BlogPostDetailProps = {
  post: BlogPostDetail;
  canManage: boolean;
};

export default function BlogPostDetail({
  post,
  canManage,
}: BlogPostDetailProps) {
  const isEvent = post.category === "advocacy_event";

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      {/* Title */}
      <Header as="h1" size="md" className="mb-3">
        {post.title}
      </Header>

      {/* Author + date */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
        {post.authorName && (
          <span>
            By <span className="font-semibold">{post.authorName}</span>
          </span>
        )}

        {post.publishedAt && (
          <span className="text-gray-500">• Published {post.publishedAt}</span>
        )}

        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs uppercase tracking-wide text-gray-700">
          {post.category.replace("_", " ")}
        </span>
      </div>

      {/* Advocacy event meta */}
      {isEvent && (post.event_date || post.event_location) && (
        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900">
          <p className="font-semibold">Advocacy event details</p>

          {post.event_date && (
            <p>
              <span className="font-medium">Date & time: </span>
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
              <span className="font-medium">Location: </span>
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
      <section className="prose prose-sm max-w-none sm:prose-base">
        <div
          className="prose-headings:scroll-mt-24 prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </section>

      {/* Owner/Admin controls */}
      {canManage && (
        <ManagePostControls
          postId={post.id}
          status={post.status}
          isFeatured={post.is_featured}
        />
      )}
    </article>
  );
}
