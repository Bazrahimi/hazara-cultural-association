// app/blog/(pages)/u/[userId]/page.tsx
import { Suspense } from "react";
import PostCardSkeleton from "../../blog/post/category/ui/PostCardSkeleton";
import AuthorBlogPosts from "./ui/AuthorBlogPosts";

const AuthorPublicPostsPage = async ({
  params,
}: {
  params: Promise<{ profile: string }>;
}) => {
  const { profile } = await params;

  const parts = profile.split("-");

  const authorId = Number(parts[parts.length - 1]);

  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <AuthorBlogPosts authorId={authorId} />;
    </Suspense>
  );
};

export default AuthorPublicPostsPage;
