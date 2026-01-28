import { cn } from "@/app/_lib/helper";
import { Header } from "@/app/ui/global/Header";
import TricolorRule from "@/app/ui/global/TricolorRule";

type Props = {
  isRTL: boolean;
  categoryId: number;
  title: string;
  categoryLabel: string;
};

const PostShell = ({ isRTL, categoryId, title, categoryLabel }: Props) => {
  const isEvent = categoryId === 2;

  return (
    <article
      className="mx-auto max-w-4xl px-4 py-10"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Title (real text is fine; it's already known from slug) */}
      <div className="space-py-10">
        <Header
          as="h1"
          size="md"
          className="mb-3"
          align={isRTL ? "right" : "left"}
        >
          {title}
        </Header>
      </div>

      {/* PostMeta skeleton (aligned to PostMetaEn/RTL) */}
      <div className="rounded-2xl border-slate-200 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-2xl">
        <div className="mb-6 w-full border-b border-gray-100 pb-4 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            {/* Author block */}
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div className="h-12 w-12 rounded-full bg-gray-200" />

              {/* Name + date */}
              <div
                className={cn(
                  "flex flex-col leading-tight",
                  isRTL ? "items-end" : "items-start",
                )}
              >
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-32 rounded bg-gray-100" />
              </div>
            </div>

            {/* Category pill (we already know label) */}
            <div className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs">
              {categoryLabel}
            </div>
          </div>
        </div>
      </div>

      <TricolorRule />

      {/* EventSection skeleton (only for category 2) */}
      {isEvent && (
        <div className="mt-5 mb-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
          <div className="h-4 w-48 rounded bg-blue-100" />
          <div className="mt-3 space-y-2">
            <div className="h-3 w-72 rounded bg-blue-100/80" />
            <div className="h-3 w-80 rounded bg-blue-100/80" />
          </div>
        </div>
      )}

      {/* Content skeleton */}
      <div className="mt-6 space-y-3">
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-11/12 rounded bg-gray-100" />
        <div className="h-4 w-10/12 rounded bg-gray-100" />
        <div className="h-4 w-9/12 rounded bg-gray-100" />
        <div className="h-4 w-11/12 rounded bg-gray-100" />
        <div className="h-4 w-8/12 rounded bg-gray-100" />
      </div>

      {/* Hero image placeholder */}
      <div className="mt-10 h-64 w-full rounded-xl bg-gray-100" />
    </article>
  );
};

export default PostShell;
