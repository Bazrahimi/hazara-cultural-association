export const CATEGORY_MAP = {
  1: {
    en: "news",
    rtl: "اخبار"
  },
  2: {
    en: "advocacy event", 
    rtl: "برنامه و گردهمایی"
  },
  3: {
    en: "hazaristan",
    rtl: "هزارستان"
  },
  4: {
    en: "hazara persecution",
    rtl: "آزار و آزیت هزاره"
  }
} as const;

export type CategoryId = keyof typeof CATEGORY_MAP; // 1 | 2 | 3 | 4

export function getCategoryLabel(categoryId: number, isRTL: boolean): string {
  const item = CATEGORY_MAP[categoryId as CategoryId];
  if (!item) return "";
  return isRTL ? item.rtl : item.en;
}
