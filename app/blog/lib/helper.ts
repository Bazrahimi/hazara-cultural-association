export const CATEGORY_MAP = {
  1: {
    en: "news",
    rtl: "اخبار",
  },
  2: {
    en: "advocacy event",
    rtl: "برنامه و گردهمایی",
  },
  3: {
    en: "hazaristan",
    rtl: "هزارستان",
  },
  4: {
    en: "hazara persecution",
    rtl: "آزار و آزیت هزاره",
  },
  5: {
    en: "hope & freedom",
    rtl: "امید و آزادی",
  },
  99: {
    en: "other (articles, books, 3rd-party links)",
    rtl: "سایر (مقالات، کتاب‌ها، لینک‌های خارجی)",
  },
} as const;

export type CategoryId = keyof typeof CATEGORY_MAP; // 1 | 2 | 3 | 4

export function getCategoryLabel(categoryId: number, isRTL: boolean): string {
  const item = CATEGORY_MAP[categoryId as CategoryId];
  if (!item) return "";
  return isRTL ? item.rtl : item.en;
}

const capitalizeCat = (label: string) => {
  return label
    .split(" ")
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
};

export const getCategoryLinks = Object.entries(CATEGORY_MAP)
  .sort(([a], [b]) => Number(a) - Number(b))
  .map(([id, value]) => ({
    id: Number(id),
    href: `/blog/${id}`,
    label: capitalizeCat(value.en),
  }));

export const catItems = getCategoryLinks;
