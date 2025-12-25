// app/blog/[slug]/ui/BlogPostDetail.tsx
import { Header } from "@/app/ui/global/Header";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import ContentSection from "./ContentSection";
import EventSection from "./EventSection";
import ManageControlGate from "./ManageControlGate";

import TricolorRule from "@/app/ui/global/TricolorRule";
import { getPostById } from "../../../lib/data";
import ClickableHeroImage from "./ClickableHeroImage";
import PostMetaEn from "./PostMeta";

type PostDetailProps = {
  postId: number;
  isRTL: boolean;
};

const PostBody = async ({ postId, isRTL }: PostDetailProps) => {
  const post = await getPostById(postId);
  console.log("post______", post)

  if (!post) notFound();

  const isEvent = post.categoryId === 2;

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      {/* Title */}
      <div className="space-py-10">
        <Header as="h1" size="md" align={isRTL ? "right" : "left"}>
          {post.title}
        </Header>
      </div>

      {/* Meta wrapper */}
      <div className="rounded-2xl border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-2xl">
        <PostMetaEn
          authorName={post.authorName}
          userId={post.userId}
          createdAt={post.createdAt}
          categoryId={post.categoryId}
          isRTL={post.isRtl}
        />
      </div>

      <TricolorRule />

      {/* Advocacy event meta */}
      {isEvent && (
        <div className="mt-6">
          <EventSection
            eventDate={post.eventDate!}
            eventLocation={post.eventLocation!}
            isRTL={isRTL}
          />
        </div>
      )}
      <div className="mt-6">
        <ContentSection
          isRTL={post.isRtl}
          content={post.contentHtml}
          isLink={post.categoryId === 99}
        />
      </div>

      {/* Content */}
      <div className="mt-6">
        <Suspense fallback={null}>
          <ClickableHeroImage src={post.heroImgPath} alt={post.title} />
        </Suspense>
      </div>

      <div className="mt-6">
        <Suspense fallback={null}>
          <ManageControlGate
          isRTL ={post.isRtl}
            postId={post.postId}
            statusCode={post.statusCode}
            isFeatured={post.isFeatured}
            slug={post.slug}
            updatedAt={post.updatedAt}
            createdAt={post.createdAt}
            userId={post.userId}
          />
        </Suspense>
      </div>
    </article>
  );
};

export default PostBody;
