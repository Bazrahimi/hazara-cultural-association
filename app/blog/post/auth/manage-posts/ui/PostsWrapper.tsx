import { cn } from "@/app/_lib/helper";
import { BlogRoutes } from "@/app/_lib/routes";
import { getSession } from "@/app/_lib";
import { ManagePostTrans } from "@/app/_lib/translation";
import { Header, P } from "@/app/_ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostCount, getPostsByStatusCode } from "../../../../post/_lib/data";
import {
  POST_STATUS,
  type StatusCode,
} from "../../../../post/_lib/definitions";
import PostPanel from "./PostPanel";

type Tab = { key: StatusCode; label: string };

const hrefFor = (tab: StatusCode) => BlogRoutes.managePosts({ tab });

function getTabs(lang: "en" | "rtl" = "en"): readonly Tab[] {
  const labels = ManagePostTrans.Label;
  return [
    { key: POST_STATUS.PUBLISHED, label: labels.Published[lang] },
    { key: POST_STATUS.DRAFTED, label: labels.Drafted[lang] },
    { key: POST_STATUS.ARCHIVED, label: labels.Archived[lang] },
  ] as const;
}

export default async function PostsWrapper({ tab }: { tab: StatusCode }) {
  const session = await getSession();
  if (!session?.roles.includes("blogger")) return notFound();

  // If you later store language in session/cookies:
  // const lang: "en" | "rtl" = session.isRtl ? "rtl" : "en";
  const lang: "en" | "rtl" = "en";
  const TABS = getTabs(lang);

  const [counts, posts] = await Promise.all([
    getPostCount(session.userId),
    getPostsByStatusCode({ statusCode: tab, userId: session.userId }),
  ]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="rounded-2xl border border-slate-200 bg-white p-4">
        <Header
          as="h4"
          size="sm"
          className="mb-3 uppercase tracker-wider text-slate-500"
        >
          Status
        </Header>

        <nav className="space-y-1">
          {TABS.map((t) => {
            const active = t.key === Number(tab);

            return (
              <Link
                key={t.key}
                href={hrefFor(t.key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-hca-blue-dark text-white"
                    : "text-slate-700 hover:bg-slate-50",
                )}
              >
                <P>{t.label}</P>

                <P
                  className={cn(
                    "min-w-[2.25rem] rounded-full px-2 py-0.5 text-center text-xs font-semibold",
                    active
                      ? "bg-hca-yellow-dark text-white"
                      : "bg-slate-100 text-slate-700",
                  )}
                >
                  {counts[t.key]}
                </P>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
          Default view is <P size="sm">Published</P>.
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0">
        <PostPanel statusCode={tab} posts={posts} />
      </main>
    </div>
  );
}
