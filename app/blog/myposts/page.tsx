// app/blog/myposts/page.tsx
import { sql } from "@/app/lib/db";
import { requireUser } from "@/app/lib/session";
import Link from "next/link";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";

type MyPostRow = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "scheduled" | "published" | "archived";
  category: "news" | "advocacy_event" | "announcement";
  created_at: string; // or Date, depending on your db client
  updated_at: string;
};

export default async function MyPostsPage() {
  const { userId } = await requireUser();

  const posts = await sql<MyPostRow[]>`
    SELECT
      id,
      title,
      slug,
      status,
      category,
      created_at,
      updated_at
    FROM blog_posts
    WHERE user_id = ${userId}
    ORDER BY created_at DESC;
  `;

  const drafts = posts.filter(
    (p) => p.status === "draft" || p.status === "scheduled"
  );
  const published = posts.filter((p) => p.status === "published");

  // If user has no posts at all
  if (posts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 py-8">
        <Header as="h1" size="md">
          My Blog Posts
        </Header>
        <P>
          You haven&apos;t created any blog posts yet. Start by creating your
          first article or advocacy event.
        </P>

        <Link
          href="/blog/new"
          className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Create your first post
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8">
      {/* Header + "New post" button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Header as="h1" size="md">
          My Blog Posts
        </Header>
        <Link
          href="/blog/new"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          New post
        </Link>
      </div>

      {/* Two columns: Drafts + Published */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Drafts */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3">
            <h2 className="text-base font-semibold text-slate-900">Drafts</h2>
            <p className="text-xs text-slate-500">
              Posts that are not yet visible to the public.
            </p>
          </div>

          {drafts.length === 0 ? (
            <p className="text-sm text-slate-500">
              You don&apos;t have any drafts yet.
            </p>
          ) : (
            <div className="space-y-3">
              {drafts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm"
                >
                  <h3 className="font-semibold text-slate-900">
                    {post.title}
                  </h3>
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-slate-500">
                    {post.category.replace("_", " ")} • Draft
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Last updated:{" "}
                    {new Date(post.updated_at).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {/* Adjust this route to your actual edit page */}
                    <Link
                      href={`/blog/edit/${post.id}`}
                      className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Edit draft
                    </Link>
                    {/* Optional: preview route – adjust if different */}
                    <Link
                      href={`/news/${post.slug}`}
                      className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Preview
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Published */}
        <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <div className="mb-3">
            <h2 className="text-base font-semibold text-emerald-900">
              Published
            </h2>
            <p className="text-xs text-emerald-700">
              Posts currently live and visible on the website.
            </p>
          </div>

          {published.length === 0 ? (
            <p className="text-sm text-emerald-800">
              You haven&apos;t published any posts yet.
            </p>
          ) : (
            <div className="space-y-3">
              {published.map((post) => (
                <article
                  key={post.id}
                  className="rounded-lg border border-emerald-100 bg-white px-3 py-3 text-sm"
                >
                  <h3 className="font-semibold text-emerald-900">
                    {post.title}
                  </h3>
                  <p className="mt-0.5 text-xs uppercase tracking-wide text-emerald-600">
                    {post.category.replace("_", " ")} • Published
                  </p>
                  <p className="mt-1 text-xs text-emerald-700">
                    Published on:{" "}
                    {new Date(post.created_at).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="mt-3 flex gap-2">
                    {/* Adjust routes as needed */}
                    <Link
                      href={`/news/${post.slug}`}
                      className="inline-flex items-center rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-500"
                    >
                      View live
                    </Link>
                    <Link
                      href={`/blog/edit/${post.id}`}
                      className="inline-flex items-center rounded-md border border-emerald-200 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                    >
                      Edit
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
