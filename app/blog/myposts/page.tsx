import { requireUser } from "@/app/lib/session";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { Suspense } from "react";
import PostsLoadingFallback from "./ui/PostsLoadingFallback";
import PostsWrapper from "./ui/PostsWrapper";

export default async function MyPostsPage() {
  const { userId, roles } = await requireUser();

  const isAdmin = roles.includes("admin");

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header as="h1" size="md">
          My Blog Posts
        </Header>

        <Button size="sm" as="link" href="/blog/new" variant="outline">
          Create New Post
        </Button>
      </div>

      {/* Suspense boundary */}
      <Suspense fallback={<PostsLoadingFallback />}>
        <PostsWrapper userId={userId} isAdmin={isAdmin} />
      </Suspense>
    </div>
  );
}
