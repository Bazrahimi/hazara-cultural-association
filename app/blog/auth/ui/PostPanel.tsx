// app/blog/auth/ui/PostPanel.tsx

import { PostListConfigTrans } from "@/app/lib/translation";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { getCategoryLabel } from "../../lib/category";
import {
  POST_STATUS,
  type PostsListRow,
  type StatusCode,
} from "../../post/lib/definitions";
import PostActionsMenu from "./postActionMenu/PostActionsMenu";
import PostHeader from "./PostHeader";

type Props = {
  statusCode: StatusCode;
  posts: PostsListRow[];
};

const PANEL_STYLE: Record<
  StatusCode,
  {
    section: string;
    emptyText: string;
    article: string;
    meta: string;
  }
> = {
  [POST_STATUS.DRAFT]: {
    section: "rounded-xl border border-slate-200 bg-white p-5",
    emptyText: "text-slate-500",
    article: "rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 text-sm",
    meta: "text-slate-500",
  },
  [POST_STATUS.PUBLISHED]: {
    section: "rounded-xl border border-emerald-200 bg-emerald-50/60 p-5",
    emptyText: "text-emerald-800",
    article: "rounded-lg border border-emerald-100 bg-white px-3 py-3 text-sm",
    meta: "text-gray-400",
  },
  [POST_STATUS.ARCHIVED]: {
    section: "rounded-xl border border-red-200 bg-red-50/60 p-5",
    emptyText: "text-red-800",
    article: "rounded-lg border border-red-100 bg-white px-3 py-3 text-sm",
    meta: "text-gray-400",
  },
} as const;

// Which timestamp + which label key to use for each status
const DATE_META: Record<
  StatusCode,
  {
    key: "createdAt" | "updatedAt";
    labelKey: "draftedOn" | "publishedOn" | "updatedOn";
  }
> = {
  [POST_STATUS.DRAFT]: { key: "updatedAt", labelKey: "draftedOn" },
  [POST_STATUS.PUBLISHED]: { key: "createdAt", labelKey: "publishedOn" },
  [POST_STATUS.ARCHIVED]: { key: "updatedAt", labelKey: "updatedOn" },
} as const;

export default function PostPanel({ statusCode, posts }: Props) {
  const cfg = PostListConfigTrans[statusCode];
  const style = PANEL_STYLE[statusCode];
  const { key, labelKey } = DATE_META[statusCode];

  return (
    <section className={style.section}>
      <PostHeader
        title={cfg.title.en}
        rtlTitle={cfg.title.rtl}
        description={cfg.description.en}
        rtlDescription={cfg.description.rtl}
      />

      {posts.length === 0 ? (
        <div>
          <P className={`text-sm ${style.emptyText}`}>{cfg.empty.en}</P>
          <P className={`text-sm ${style.emptyText}`}>{cfg.empty.rtl}</P>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => {
            const isRTL = post.isRtl === true;

            const label = isRTL ? cfg[labelKey].rtl : cfg[labelKey].en;
            const value = post[key];

            return (
              <article
                key={post.postId}
                className={style.article}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className="flex items-start justify-between">
                  <Header
                    as="h4"
                    size="xs"
                    className={`font-semibold text-slate-900 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {post.title}
                  </Header>

                  <PostActionsMenu
                    isRTL={isRTL}
                    postId={post.postId}
                    slug={post.slug}
                    statusValue={statusCode}
                    isFeatured={
                      statusCode === POST_STATUS.PUBLISHED
                        ? post.isFeatured
                        : undefined
                    }
                  />
                </div>

                <P className="mt-0.5 text-xs uppercase tracking-wide text-gray-600">
                  {getCategoryLabel(post.categoryId, isRTL)}
                </P>

                <P className={`mt-1 ${style.meta}`} size="sm">
                  {label}
                  <span dir="ltr" className="inline-block">
                    {value}
                  </span>
                </P>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
