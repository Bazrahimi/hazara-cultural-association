"use client";

import { Button } from "@/app/ui/global/components";
import { PostStatus } from "../../lib/definitions";
import { toggleFeatured, updateStatus } from "../lib/action";

type Props = {
  postId: number;
  status: PostStatus;
  isFeatured: boolean;
  isRTL?: boolean;
};

export function ManagePostControls({
  postId,
  status,
  isFeatured,
  isRTL = false,
}: Props) {
  const nextStatus = status === "archived" ? "published" : "archived";

  const t = {
    heading: isRTL ? "مدیریت این مطلب" : "Manage this post",
    statusLabel:
      status === "published"
        ? isRTL
          ? "منتشر شده"
          : "Published"
        : status === "draft"
          ? isRTL
            ? "پیش‌نویس"
            : "Draft"
          : isRTL
            ? "آرشیو شده"
            : "Archived",
    edit: isRTL ? "ویرایش مطلب" : "Edit post",
    feature: isRTL ? "نمایش در صفحهٔ اصلی" : "Feature on homepage",
    unfeature: isRTL ? "حذف از صفحهٔ اصلی" : "Remove from homepage",
    publish: isRTL ? "انتشار مطلب" : "Publish post",
    archive: isRTL ? "انتقال به آرشیو" : "Archive post",
    note: isRTL
      ? "فقط شما (نویسنده) یا مدیر سایت این بخش را می‌بینید."
      : "Only you (author) or an admin can see this section.",
  };

  return (
    <section
      className={`
        mt-10 rounded-xl border border-dashed border-gray-300 
        bg-gray-50 px-4 py-4 shadow-sm
        ${isRTL ? "text-right" : "text-left"}
      `}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header row: title + status chip */}
      <div
        className={`mb-3 flex items-center justify-between gap-3 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          {t.heading}
        </p>

        <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-700">
          {t.statusLabel}
        </span>
      </div>

      {/* Buttons row */}
      <div
        className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Edit */}
        <Button as="link" href={`/blog/myposts/edit/${postId}`} size="xs">
          {t.edit}
        </Button>

        {/* Feature / Unfeature */}
        <form action={toggleFeatured}>
          <input type="hidden" name="postId" value={postId} />
          <input
            type="hidden"
            name="feature"
            value={(!isFeatured).toString()}
          />
          <Button
            type="submit"
            size="xs"
            variant={isFeatured ? "danger" : "outline"}
          >
            {isFeatured ? t.unfeature : t.feature}
          </Button>
        </form>

        {/* Publish / Archive */}
        <form action={updateStatus}>
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="status" value={nextStatus} />
          <Button type="submit" size="xs" variant="outline">
            {status === "archived" ? t.publish : t.archive}
          </Button>
        </form>
      </div>

      {/* Small note */}
      <p className="mt-3 w-full text-[11px] text-gray-500 italic">{t.note}</p>
    </section>
  );
}
