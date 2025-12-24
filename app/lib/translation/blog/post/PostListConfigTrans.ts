// app/lib/translation/blog/post/PostListConfigTrans.ts
import { POST_STATUS } from "@/app/blog/post/lib/definitions";
import { PostCommonTrans } from "./PostCommonTrans";

export const PostListConfigTrans = {
  [POST_STATUS.DRAFT]: {
    title: { en: "Drafts", rtl: "پیشنویس‌ها" },
    description: {
      en: "Posts that are not yet visible to the public.",
      rtl: "پست‌هایی که هنوز برای عموم قابل مشاهده نیستند.",
    },
    empty: {
      en: "You don't have any drafts yet.",
      rtl: "شما هیچ پیشنویسی ندارید.",
    },
    edit: { en: "Edit Draft", rtl: "ویرایش پیش‌نویس" }, // or keep rtl: "ویرایش"
    preview: PostCommonTrans.actions.preview,
    draftedOn: PostCommonTrans.labels.draftedOn,

    border: "border-slate-200",
    bg: "bg-white",
    articleBorder: "border-slate-100",
    articleBg: "bg-slate-50",
  },

  [POST_STATUS.PUBLISHED]: {
    title: { en: "Published", rtl: "منتشر شده" },
    description: {
      en: "Posts currently live and visible on the website.",
      rtl: "پست‌هایی که اکنون به صورت عمومی در وب‌سایت قابل مشاهده هستند.",
    },
    empty: {
      en: "You haven't published any posts yet.",
      rtl: "شما هنوز هیچ پستی منتشر نکرده‌اید.",
    },
    view: { en: "View Live", rtl: "مشاهده" },
    edit: PostCommonTrans.actions.edit,
    publishedOn: PostCommonTrans.labels.publishedOn,
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    articleBorder: "border-emerald-100",
    articleBg: "bg-white",
  },

  [POST_STATUS.ARCHIVED]: {
    title: { en: "Archived", rtl: "آرشیو" },

    description: {
      en: "Posts that are hidden from the public but kept for your records.",
      rtl: "پست‌هایی که از دید عموم پنهان شده اما برای سوابق شما نگهداری می‌شوند.",
    },
    empty: {
      en: "You don't have any archived posts.",
      rtl: "شما هیچ پست بایگانی‌شده‌ای ندارید.",
    },
    restoreEdit: { en: "Restore / Edit", rtl: "بازگردانی / ویرایش" },
    // Rename key if this is truly "updated":
    updatedOn: PostCommonTrans.labels.archivedOn,
    border: "border-red-200",
    bg: "bg-red-50/60",
    articleBorder: "border-red-100",
    articleBg: "bg-white",
  },
} as const;

// border: "border-red-200",
//   bg: "bg-red-50/60",
//   articleBorder: "border-red-100",
//   articleBg: "bg-white",

export type PostListType = keyof typeof PostListConfigTrans;
