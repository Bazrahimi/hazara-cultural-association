// app/lib/translation/blog/post/PostTrans.ts

import { POST_STATUS, type StatusCode } from "@/app/blog/post/lib/definitions";

export const PostCommonTrans = {
  author: { en: "By:", rtl: "توسط" },

  actions: {
    edit: { en: "Edit", rtl: "ویرایش" },
    preview: { en: "Preview", rtl: "نمایش" },
  },

  labels: {
    statusLabel: { en: "Publish status", rtl: "وضعیت نشر" },
    updatedLabel: { en: "Last updated", rtl: "آخرین به‌روزرسانی" },

    draftedOn: { en: "Drafted On: ", rtl: "تاریخ پیش‌نویس: " },
    publishedOn: { en: "Published On: ", rtl: "تاریخ نشر: " },
    updatedOn: { en: "Updated on: ", rtl: "تاریخ به‌روزرسانی: " },
    archivedOn: { en: "Archived on: ", rtl: "آرشیو در: " }, // (fix)
  },

   


} as const;
