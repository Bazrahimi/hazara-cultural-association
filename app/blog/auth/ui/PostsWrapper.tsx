import { getAllPosts } from "../../post/lib/data";
import { POST_STATUS } from "../../post/lib/definitions";
import ArchivedPosts from "./ArchivedPosts";
import DraftPosts from "./DraftPosts";
import NullPost from "./NullPost";
import PublishedPosts from "./PublishedPosts";

export default async function PostsWrapper({
  userId,
  isAdmin,
}: {
  userId: number;
  isAdmin: boolean;
}) {
  const posts = await getAllPosts({ userId, isAdmin });

  if (posts.length === 0) return <NullPost />;

  const drafts = posts.filter((p) => p.statusCode === POST_STATUS.DRAFT);
  const published = posts.filter((p) => p.statusCode === POST_STATUS.PUBLISHED);
  const archived = posts.filter((p) => p.statusCode === POST_STATUS.ARCHIVED);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <DraftPosts drafts={drafts} />
      <PublishedPosts published={published} />
      <ArchivedPosts archived={archived} />
    </div>
  );
}
