// ManagePostControls.tsx
"use client";

import type { PostStatus } from "../../../lib/definitions";
import PostActionsMenu from "../../../myposts/ui/postActionMenu/PostActionsMenu";

export type PostActionMenuProps = {
  postId: number;
  slug: string;
  status: PostStatus;
  isFeatured: boolean;
  isRTL?: boolean;
  updatedAt: string; // formatted e.g. "22 NOV 2025"
};

export function ManagePostControls({
  postId,
  slug,
  status,
  isFeatured,
  isRTL = false,
  updatedAt,
}: PostActionMenuProps) {
  const t = {
    heading: isRTL ? "مدیریت این مطلب" : "Manage this post",
    note: isRTL
      ? "فقط شما (نویسنده) یا مدیر سایت این بخش را می‌بینید."
      : "Only you (author) or an admin can see this section.",

    // label translations
    statusLabel: isRTL ? "وضعیت نشر" : "Publish status",
    updatedLabel: isRTL ? "آخرین به‌روزرسانی" : "Last updated",
  };

  // Colored chip per status
  const statusStyles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-yellow-100 text-yellow-700",
    archived: "bg-gray-200 text-gray-700",
  }[status];

  const statusText = {
    published: isRTL ? "منتشر شده" : "Published",
    draft: isRTL ? "پیش‌نویس" : "Draft",
    archived: isRTL ? "آرشیو شده" : "Archived",
  }[status];

  return (
    <section
      className={`
        mt-10 rounded-xl border border-dashed border-gray-300 
        bg-gray-50 px-4 py-4 shadow-sm
        ${isRTL ? "text-right" : "text-left"}
      `}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Top row: Heading + Actions menu */}
      <div
        className={`mb-4 flex items-center justify-between ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          {t.heading}
        </p>

        <PostActionsMenu
          isRTL={isRTL}
          postId={postId}
          slug={slug}
          status={status}
          isFeatured={isFeatured}
        />
      </div>

      {/* Status & Last Updated Panel */}
      <div
        className={`
          mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between 
          gap-2 border rounded-lg bg-white px-3 py-2
        `}
      >
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {t.statusLabel}:
          </span>
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles}`}
          >
            {statusText}
          </span>
        </div>

        {/* Last updated */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">
            {t.updatedLabel}:
          </span>
          <span className="text-xs font-semibold text-gray-700">
            {updatedAt}
          </span>
        </div>
      </div>

      {/* Author-only note */}
      <p className="mt-1 w-full text-[11px] text-gray-500 italic">{t.note}</p>
    </section>
  );
}
