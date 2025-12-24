import { POST_STATUS, type StatusCode } from "@/app/blog/post/lib/definitions";
import { edit, preview } from "./transHelper";

export const ManagePostTrans = {
  heading: { en: "Manage this post", rtl: "مدیریت این مطلب" },
  note: {
    en: "Only you (author) or an admin can see this section.",
    rtl: "فقط شما (نویسنده) یا مدیر سایت این بخش را می‌بینید.",
  },
  statusLabels: {
    [POST_STATUS.PUBLISHED]: { en: "Published", rtl: "منتشر شده" },
    [POST_STATUS.DRAFTED]: { en: "Draft", rtl: "پیش‌نویس شده" },
    [POST_STATUS.ARCHIVED]: { en: "Archived", rtl: "آرشیو شده" },
  } satisfies Record<StatusCode, { en: string; rtl: string }>,
} as const;

export const PostActionTrans = {
  edit,
  preview,


} as const;