// app/blog/(pages)/u/[userId]/page.tsx
import { Suspense } from "react";
import PostCardSkeleton from "../../post/category/ui/PostCardSkeleton";
import AuthorBlogPosts from "./ui/AuthorBlogPosts";

const AuthorPublicPostsPage = async ({
  params,
}: {
  params: Promise<{ namePlusId: string }>;
}) => {
  const { namePlusId } = await params;

  const parts = namePlusId.split("-");

  const authorId = Number(parts[parts.length - 1]);

  return (
    <Suspense fallback={<PostCardSkeleton />}>
      <AuthorBlogPosts authorId={authorId} />;
    </Suspense>
  );
};

export default AuthorPublicPostsPage;
