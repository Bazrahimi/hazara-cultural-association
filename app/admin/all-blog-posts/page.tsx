import PostsLoadingFallback from "@/app/blog/auth/ui/PostsLoadingFallback";
import PostsWrapper from "@/app/blog/auth/ui/PostsWrapper";
import { POST_STATUS } from "@/app/blog/post/lib/definitions";
import { BlogRoutes } from "@/app/lib/routes";
import { requireUser } from "@/app/lib/session";
import { Header } from "@/app/ui/global/Header";
import { Button } from "@/app/ui/global/components";
import { Suspense } from "react";

const AdminAllBlockPostsPage = async () => {
  const session = await requireUser();
  const { roles } = session;

  const isAdmin = roles.includes("admin");

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header as="h1" size="md">
          {isAdmin ? "All Blog Posts" : "My Blog Posts"}
        </Header>

        <Button size="sm" as="link" href={BlogRoutes.new()} variant="outline">
          Create New Post
        </Button>
      </div>

      <Suspense fallback={<PostsLoadingFallback />}>
        <PostsWrapper tab={POST_STATUS.PUBLISHED} />
      </Suspense>
    </div>
  );
};

export default AdminAllBlockPostsPage;
