import { getBlogPosts } from "../lib/data";
import ArchivedPosts from "./ArchivedPosts";
import DraftPosts from "./DraftPosts";
import NullPost from "./NullPost";
import PublishedPosts from "./PublishedPosts";

export default async function PostsWrapper({ userId }: { userId: number }) {
  const posts = await getBlogPosts(userId);

  if (posts.length === 0) return <NullPost />;

  const drafts = posts.filter(
    (p) => p.status === "draft" || p.status === "scheduled"
  );

  const published = posts.filter((p) => p.status === "published");

  const archived = posts.filter((p) => p.status === "archived");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <DraftPosts drafts={drafts} />
      <PublishedPosts published={published} />
      <ArchivedPosts archived={archived} />
    </div>
  );
}
