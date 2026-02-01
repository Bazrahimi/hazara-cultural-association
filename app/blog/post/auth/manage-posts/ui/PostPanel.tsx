// app/blog/auth/ui/PostPanel.tsx

import { formatDateTimeAU } from "@/app/_lib/Date";
import { cn } from "@/app/_lib/helper";
import { PostListConfigTrans } from "@/app/_lib/translation";
import { Header, P } from "@/app/_ui";
import type { PostsListRow } from "../../../../post/_lib/definitions";
import { POST_STATUS, type StatusCode } from "../../../../post/_lib/definitions";
import ChangeCategoryMenu from "./ChangeCategoryMenu";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";

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
      <PostHeader
        title={cfg.title.en}
        rtlTitle={cfg.title.rtl}
        description={cfg.description.en}
        rtlDescription={cfg.description.rtl}
      />

      {posts.length === 0 ? (
        <div>
          <P className="text-slate-500" size="sm">
            {cfg.empty.en}
          </P>
          <P dir="rtl">{cfg.empty.rtl}</P>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <article
              key={post.postId}
              className={cn(
                "rounded-lg border px-3 py-3 text-sm",
                cfg.articleBorder,
                cfg.articleBg,
              )}
            >
              <div
                className="flex items-start justify-between gap-3"
                dir={post.isRtl ? "rtl" : "ltr"}
              >
                <Header
                  as="h4"
                  size="xs"
                  className="min-w-0 font-semibold text-slate-900"
                >
                  {post.title}
                </Header>

                <div className="shrink-0">
                  <PostActionsMenu
                    categoryId={post.categoryId}
                    postId={post.postId}
                    slug={post.slug}
                    statusCode={post.statusCode}
                    isRTL={post.isRtl}
                    {...(post.statusCode === POST_STATUS.PUBLISHED
                      ? { isFeatured: post.isFeatured }
                      : {})}
                  />
                </div>
              </div>

              <div
                dir={post.isRtl ? "rtl" : "ltr"}
                className="mt-2 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <P className="text-gray-400" size="sm">
                    {post.isRtl ? cfg.UpdatedOn.rtl : cfg.UpdatedOn.en}
                  </P>
                  <P className="text-gray-500" dir="ltr" size="sm">
                    {formatDateTimeAU(post.updatedAt)}
                  </P>
                </div>

                <div className="shrink-0">
                  <ChangeCategoryMenu
                    isRTL={post.isRtl}
                    postId={post.postId}
                    categoryId={post.categoryId}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
