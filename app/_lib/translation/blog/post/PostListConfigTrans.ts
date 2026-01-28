// app/lib/translation/blog/post/PostListConfigTrans.ts
import { POST_STATUS } from "@/app/blog/post/lib/definitions";
import {
  Archived,
  Drafted,
  Edit,
  Preview,
  Published,
  UpdatedOn,
} from "./transHelper";

export const PostListConfigTrans = {
  [POST_STATUS.DRAFTED]: {
    title: Drafted,
    description: {
      en: "Posts that are not yet visible to the public.",
      rtl: "پست‌هایی که هنوز برای عموم قابل مشاهده نیستند.",
    },
    empty: {
      en: "You don't have any drafts yet.",
      rtl: "شما هیچ پیشنویسی ندارید.",
    },
    edit: Edit,
    preview: Preview,
    UpdatedOn: UpdatedOn,

    border: "border-slate-200",
    bg: "bg-white",
    articleBorder: "border-slate-100",
    articleBg: "bg-slate-50",
  },

  [POST_STATUS.PUBLISHED]: {
    title: Published,
    description: {
      en: "Posts currently live and visible on the website.",
      rtl: "پست‌هایی که اکنون به صورت عمومی در وب‌سایت قابل مشاهده هستند.",
    },
    empty: {
      en: "You haven't published any posts yet.",
      rtl: "شما هنوز هیچ پستی منتشر نکرده‌اید.",
    },
    view: { en: "View Live", rtl: "مشاهده" },
    edit: Edit,
    Preview: Preview,
    UpdatedOn: UpdatedOn,
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    articleBorder: "border-emerald-100",
    articleBg: "bg-white",
  },

  [POST_STATUS.ARCHIVED]: {
    title: Archived,

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
    UpdatedOn: UpdatedOn,
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
