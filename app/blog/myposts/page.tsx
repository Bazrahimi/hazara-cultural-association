// app/blog/myposts/page.tsx
import { requireUser } from "@/app/lib/session";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { getBlogPosts } from "./lib/data";
import DraftPosts from "./ui/DraftPosts";
import NullPost from "./ui/NullPost";
import PublishedPosts from "./ui/PublishedPosts";

export default async function MyPostsPage() {

  const { userId } = await requireUser();

  const posts = await getBlogPosts(userId);

  const drafts = posts.filter(
    (p) => p.status === "draft" || p.status === "scheduled"
  );
  const published = posts.filter((p) => p.status === "published");

  // If user has no posts at all
  if (posts.length === 0) {
    return <NullPost />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      {/* Header + "New post" button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header as="h1" size="md">
          My Blog Posts
        </Header>
        <Button size="sm" as="link" href="/blog/new" variant="outline">
          Create New Post
        </Button>
      </div>

      {/* Two columns: Drafts + Published */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Drafts */}
        <DraftPosts drafts={drafts} />

        {/* Published */}
        <PublishedPosts published={published} />
      </div>
    </div>
  );
}
