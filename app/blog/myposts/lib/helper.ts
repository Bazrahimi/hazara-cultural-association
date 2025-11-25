import type { PostActionState } from "./definitions";
export const BLOGGER_POST_LIST_CONFIG = {
  draft: {
    title: "Drafts",
    rtlTitle: "پیشنویس‌ها",

    description: "Posts that are not yet visible to the public.",
    rtlDescription: "پست‌هایی که هنوز برای عموم قابل مشاهده نیستند.",

    empty: "You don't have any drafts yet.",
    rtlEmpty: "شما هیچ پیشنویسی ندارید.",

    edit: "Edit Draft",
    rtlEdit: "ویرایش",

    preview: "Preview",
    rtlPreview: "پیش‌نمایش",

    border: "border-slate-200",
    bg: "bg-white",
    articleBorder: "border-slate-100",
    articleBg: "bg-slate-50",
  },

  published: {
    title: "Published",
    rtlTitle: "منتشر شده",

    description: "Posts currently live and visible on the website.",
    rtlDescription: "پست‌هایی که اکنون به صورت عمومی قابل مشاهده هستند.",

    empty: "You haven't published any posts yet.",
    rtlEmpty: "شما هیچ پست منتشرشده‌ای ندارید.",

    view: "View Live",
    rtlView: "مشاهده",

    edit: "Edit",
    rtlEdit: "ویرایش",

    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    articleBorder: "border-emerald-100",
    articleBg: "bg-white",
  },

  archived: {
    title: "Archived",
    rtlTitle: "ارشیف",

    description:
      "Posts that are hidden from the public but kept for your records.",
    rtlDescription:
      "پست‌هایی که از دید عموم پنهان شده اما برای سوابق شما نگهداری می‌شوند.",

    empty: "You don't have any archived posts.",
    rtlEmpty: "شما هیچ پست بایگانی‌شده‌ای ندارید.",

    restoreEdit: "Restore / Edit",
    rtlRestoreEdit: "بازگردانی / ویرایش",

    border: "border-red-200",
    bg: "bg-red-50/60",
    articleBorder: "border-red-100",
    articleBg: "bg-white",
  },
} as const;

export type PostListType = keyof typeof BLOGGER_POST_LIST_CONFIG;

export const parsePostId = (formData: FormData): number | null => {
  const rawId = formData.get("postId");
  if (!rawId) return null;

  const postId = Number(rawId);
  if (!Number.isInteger(postId) || postId <= 0) return null;

  return postId;
};

export const postFailure = (
  message: string,
  extra: Partial<Omit<PostActionState, "ok" | "message">> = {}
): PostActionState => {
  return { ok: false, message, ...extra };
};

export const postSuccess = (
  message: string,
  extra: Partial<Omit<PostActionState, "ok" | "message">> = {}
): PostActionState => {
  return { ok: true, message, ...extra };
};