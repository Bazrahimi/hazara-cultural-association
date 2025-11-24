import { getBlogPosts } from "../lib/data";
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
  const posts = await getBlogPosts({ userId, isAdmin });

  if (posts.length === 0) return <NullPost />;

  const drafts = posts.filter((p) => p.status === "draft");
  const published = posts.filter((p) => p.status === "published");
  const archived = posts.filter((p) => p.status === "archived");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <DraftPosts drafts={drafts} />
      <PublishedPosts published={published} />
      <ArchivedPosts archived={archived} />
    </div>
  );
}
