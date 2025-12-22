// app/blog/[slug]/ui/BlogPostDetail.tsx
import { Header } from "@/app/ui/global/Header";
import HeroImage from "./HeroImage";

import { getPostById } from "@/app/blog/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ContentSection from "./ContentSection";
import EventSection from "./EventSection";
import ManageControlGate from "./ManageControlGate";

import TricolorRule from "@/app/ui/global/TricolorRule";
import PostMetaEn from "./PostMetaEn";
import PostMetaRTL from "./PostMetaRTL";

type PostDetailProps = {
  postId: number;
  isRTL: boolean;
};

const PostBody = async ({ postId, isRTL }: PostDetailProps) => {
  const post = await getPostById(postId);
  if (!post) notFound();

  const isEvent = post.categoryId === 2;

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 text-left">
    
      {/* Title */}
      <Header
        as="h1"
        size="md"
        className="mb-3"
        align={isRTL ? "right" : "left"}
      >
        {post.title}
      </Header>

      {isRTL ? (
        <PostMetaRTL
          authorName={post.authorName}
          userId={post.userId}
          publishedAt={post.publishedAt}
          categoryId={post.categoryId}
        />
      ) : (
        <PostMetaEn
          authorName={post.authorName}
          userId={post.userId}
          publishedAt={post.publishedAt}
          categoryId={post.categoryId}
        />
      )}

      <TricolorRule />

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
