import { BlogRoutes } from "@/app/_lib/routes";
import { requireUser } from "@/app/_lib/session/session";
import { Button, Header } from "@/app/_ui";
import PostsLoadingFallback from "@/app/blog/post/auth/manage-posts/ui/PostsLoadingFallback";
import PostsWrapper from "@/app/blog/post/auth/manage-posts/ui/PostsWrapper";
import { POST_STATUS } from "@/app/blog/post/_lib/definitions";
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

        <Button
          size="sm"
          as="link"
          href={BlogRoutes.createNewPost()}
          variant="outline"
        >
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
