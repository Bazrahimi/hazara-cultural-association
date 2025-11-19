"use client";

import { Button } from "@/app/ui/global/components";
import { toggleFeatured, updateStatus } from "../lib/action";

type Props = {
  postId: number;
  status: "draft" | "archived" | "published";
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
    edit: isRTL ? "ویرایش مطلب" : "Edit post",
    feature: isRTL ? "نمایش در صفحه اصلی" : "Feature on homepage",
    unfeature: isRTL ? "حذف از صفحه اصلی" : "Remove from homepage",
    publish: isRTL ? "انتشار مطلب" : "Publish post",
    archive: isRTL ? "آرشیو کردن" : "Archive post",
    note: isRTL
      ? "فقط شما (نویسنده) یا مدیر می‌توانید این گزینه‌ها را ببینید."
      : "Only you (author) or an admin can see these controls.",
  };

  return (
    <div
      className={`mt-8 border-t border-gray-100 pt-4 flex flex-wrap gap-3 ${
        isRTL ? "flex-row-reverse text-right" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Edit */}
      <Button as="link" href={`/blog/myposts/edit/${postId}`} size="xs">
        {t.edit}
      </Button>

      {/* Feature / Unfeature */}
      <form action={toggleFeatured}>
        <input type="hidden" name="postId" value={postId} />
        <input type="hidden" name="feature" value={(!isFeatured).toString()} />
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

      <p className="text-xs text-gray-500 w-full">{t.note}</p>
    </div>
  );
}
