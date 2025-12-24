import { getSession } from "@/app/lib/session";
import { notFound } from "next/navigation";
import { getPostCount, getPostsByStatusCode } from "../../post/lib/data";
import { POST_STATUS, StatusCode } from "../../post/lib/definitions";
import ArchivedPosts from "./ArchivedPosts";
import DraftPosts from "./DraftPosts";
import NullPost from "./NullPost";
import PublishedPosts from "./PublishedPosts";
import { count } from "console";

export default async function PostsWrapper({ tab }: { tab: StatusCode }) {
  const session = await getSession();
  if (!session?.roles.includes("blogger")) return notFound();

  const [count, posts] = await Promise.all([
    getPostCount(session.userId),
    getPostsByStatusCode({ statusCode: tab, userId: session.userId }),
  ]);

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
