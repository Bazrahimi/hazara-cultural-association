// app/blog/auth/ui/PostPanel.tsx

import { cn } from "@/app/lib/helper";
import { BlogRoutes } from "@/app/lib/routes";
import { PostListConfigTrans } from "@/app/lib/translation";
import { Preview } from "@/app/lib/translation/blog/post/transHelper";
import { Button } from "@/app/ui/global/components";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import type { PostsListRow } from "../../post/lib/definitions";
import { POST_STATUS, type StatusCode } from "../../post/lib/definitions";
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
                cfg.articleBg
              )}
            >
              <div
                className="flex items-start justify-between gap-3"
                dir={post.isRtl ? "rtl" : "ltr"}
              >
                <Header
                  as="h4"
                  size="xs"
                  className="min-w-0 truncate font-semibold text-slate-900"
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
                    {post.updatedAt}
                  </P>
                </div>

                {post.statusCode === POST_STATUS.PUBLISHED && (
                  <Button
                    size="xs"
                    as="link"
                    href={`${BlogRoutes.post(post.slug)}?catId=${post.categoryId}&rtl=${post.isRtl ? 1 : 0}&id=${post.postId}`}
                    className="shrink-0"
                  >
                    {post.isRtl ? Preview.rtl : Preview.en}
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
