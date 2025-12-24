// app/blog/auth/ui/PostPanel.tsx

import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { POST_STATUS, type StatusCode } from "../../post/lib/definitions";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";
import type{ PostsListRow } from "../../post/lib/definitions";
import { PostListConfigTrans } from "@/app/lib/translation";


export default function PostsPanel({
  statusCode,
  posts,
}: {
  statusCode: StatusCode;
  posts: PostsListRow[];
}) {
  const cfg = PostListConfigTrans[statusCode];

  return (
    <section className={`rounded-xl border p-5 ${cfg.border} ${cfg.bg}`}>
      <PostHeader title={cfg.title.en} rtlTitle={cfg.title.rtl} description={cfg.description.en} rtlDescription={cfg.description.rtl} />

      {posts.length === 0 ? (
        <div>
          <P className="text-slate-500" size="sm">
            {cfg.empty.en}
          </P>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <article
              key={post.postId}
              className={`rounded-lg border px-3 py-3 text-sm ${cfg.articleBorder} ${cfg.articleBg}`}
            >
              <div className="flex items-start justify-between">
                <Header
                  as="h4"
                  size="xs"
                  className="font-semibold text-slate-900"
                >
                  {post.title}
                </Header>

                <PostActionsMenu
                  postId={post.postId}
                  slug={post.slug}
                  statusCode={post.statusCode}
                  isRTL={post.isRtl}
                  // only publish needs this
                  {...(statusCode === POST_STATUS.PUBLISHED
                    ? { isFeatured: post.isFeatured }
                    : {})}
                />
              </div>

              <P className="mt-1 text-slate-500" size="sm">
                Created at:{" "}
                <span className="inline-block" dir="ltr">
                  {post.createdAt}
                </span>
              </P>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
