import { BlogRoutes } from "@/app/_lib/routes";
import { Button, Header } from "@/app/_ui";
import { Suspense } from "react";
import { POST_STATUS, StatusCode } from "../../post/_lib/definitions";
import PostsLoadingFallback from "./ui/PostsLoadingFallback";
import PostsWrapper from "./ui/PostsWrapper";

export default async function MyPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: StatusCode }>;
}) {
  const { tab } = await searchParams;

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header as="h1" size="md">
          My Blog Posts
        </Header>

        <Button
          size="sm"
          as="link"
          href={BlogRoutes.createNewPost()}
          variant="outline"
        >
          Create New Post
        </Button>
      </div>

      {/* Suspense boundary */}
      <Suspense fallback={<PostsLoadingFallback />}>
        <PostsWrapper tab={tab ?? POST_STATUS.PUBLISHED} />
      </Suspense>
    </div>
  );
}
