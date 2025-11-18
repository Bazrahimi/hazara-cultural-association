// app/blog/myposts/ui/PostsWrapper.tsx

import { getBlogPosts } from "../lib/data";
import DraftPosts from "./DraftPosts";
import PublishedPosts from "./PublishedPosts";
import NullPost from "./NullPost";

export default async function PostsWrapper({ userId }: { userId: number }) {
  const posts = await getBlogPosts(userId);

  if (posts.length === 0) return <NullPost />;

  const drafts = posts.filter(
    (p) => p.status === "draft" || p.status === "scheduled"
  );

  const published = posts.filter((p) => p.status === "published");

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <DraftPosts drafts={drafts} />
      <PublishedPosts published={published} />
    </div>
  );
}
