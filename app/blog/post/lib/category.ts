import { BlogRoutes } from "@/app/_lib/routes";

export const CATEGORY_MAP = {
  1: {
    en: "News and Update",
    rtl: "اخبار و روز رسانی‌ها",
  },
  2: {
    en: "Community Events",
    rtl: "برنامه و گردهمایی",
  },

  99: {
    en: "External Resources & References",
    rtl: "منابع و مطالب بیرونی",
  },
} as const;

export type CategoryId = keyof typeof CATEGORY_MAP; // 1 | 2 | 3 | 4

export function getCategoryLabel(
  categoryId: number,
  isRTL: boolean = false,
): string {
  const item = CATEGORY_MAP[categoryId as CategoryId];
  if (!item) return "";
  return isRTL ? item.rtl : item.en;
}

/** Build links returning BOTH labels */
const buildPostCategoryLinks = () => {
  return (
    Object.entries(CATEGORY_MAP) as Array<
      [`${CategoryId}`, (typeof CATEGORY_MAP)[CategoryId]]
    >
  ).map(([id, cat]) => {
    const categoryId = Number(id) as CategoryId;

    return {
      categoryId,
      href: BlogRoutes.categoryById(categoryId),
      label: {
        en: cat.en,
        rtl: cat.rtl,
      },
    };
  });
};

/** Convenience: build links but return a single label for current direction */
export const buildPostCategoryQuickLinks = (isRTL: boolean) => {
  return buildPostCategoryLinks().map((x) => ({
    href: x.href,
    label: isRTL ? x.label.rtl : x.label.en,
  }));
};

type CategoryKey = keyof typeof CATEGORY_MAP;

// Shape of each description entry
type CategoryDescription = {
  fullDesc: string;
  shortDesc: string;
};

export const CATEGORY_DESCRIPTIONS = {
  1: {
    fullDesc:
      "Latest news, statements, and updates from the Hazara community in Australia and Hazaristan—covering current affairs, advocacy, cultural life, and the ongoing struggle for safety and equal rights. Over the last two decades, thousands of Hazaras have made Australia their home, contributing to a stronger, more diverse society. This section highlights stories that promote dignity, recognition, and genuine social cohesion within our multicultural nation.",
    shortDesc:
      "News and updates from Hazara communities in Australia and Hazaristan, promoting dignity and cohesion.",
  },
  2: {
    fullDesc:
      "Announcements and coverage of advocacy events, rallies, vigils, and community gatherings organised in Australia and around the world in support of Hazara justice and human rights. Posts may include event invitations, logistical details, speaker profiles, photo essays, post-event summaries, personal reflections, and media coverage. These events not only raise awareness about global injustices but also strengthen social cohesion by uniting diverse communities around dignity, shared humanity, and recognition.",
    shortDesc:
      "Invitations, reports, and reflections on rallies and advocacy events that build awareness and social cohesion.",
  },

  99: {
    fullDesc:
      "This category features external articles, historical documents, book excerpts, research papers, and third-party publications related to Hazara history, culture, politics, and broader regional issues. Many of these works connect to the lived experiences of Hazara communities in Australia, their journey of rebuilding, and the national conversation around belonging, multiculturalism, and social cohesion. All sources are credited to their original authors.",
    shortDesc:
      "Curated external articles and research related to Hazara history, identity, and Australian social cohesion.",
  },
} satisfies {
  [K in CategoryKey]: CategoryDescription;
};

// ✅ Helper used by the page
export function getCategoryMeta(categoryId: number) {
  if (!(categoryId in CATEGORY_MAP)) return null;

  const key = categoryId as CategoryId;

  const base = CATEGORY_MAP[key];
  const desc = CATEGORY_DESCRIPTIONS[key];

  return {
    id: categoryId,
    heading: base.en,
    rtlHeading: base.rtl,
    fullDesc: desc.fullDesc,
    shortDesc: desc.shortDesc,
  };
}
