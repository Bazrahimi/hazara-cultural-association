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
    href: `/blog/p/${id}`,
    label: capitalizeCat(value.en),
  }));

export const catItems = getCategoryLinks;

type CategoryKey = keyof typeof CATEGORY_MAP;

// Shape of each description entry
type CategoryDescription = {
  fullDesc: string;
  shortDesc: string;
};

// ✅ This is your second object, type-linked to CATEGORY_MAP
export const CATEGORY_DESCRIPTIONS = {
  1: {
    fullDesc:
      "Latest news, statements, and updates from the Hazara community and Hazaristan—covering current affairs, advocacy, culture, and the ongoing struggle for safety and equal rights after generations of persecution under successive Afghan states.",
    shortDesc: "",
  },
  2: {
    fullDesc:
      "Rallies, vigils, and advocacy events for Hazara justice and human rights.",
    shortDesc: "",
  },
  3: {
    fullDesc:
      "Hazaristan is the ancestral homeland of the Hazara people. Before the late 19th century, it functioned with its own autonomy and local leadership. British travellers and ethnographers described a Hazara country stretching from the vicinity of Kandahar towards Herat, Balkh, and Ghazni, with Hazaras controlling the valleys, waters, and rivers of these highlands—until conquest, displacement, and the settlement of Afghan nomadic groups forced many Hazaras from their lands.",
    shortDesc: "",
  },
  4: {
    fullDesc:
      "This section documents the long history of Hazara persecution under successive Afghan rulers since the creation of the modern Afghan state. From Abdur Rahman and Habibullah to Amanullah and later governments, many Hazaras were killed, displaced, or pushed into a scattered diaspora. Even during the eras of Karzai and Ghani—despite substantial international funding—Hazara communities continued to face marginalisation and attacks. Regimes and faces change, but the Afghan-centric exclusion of Hazaras, which began with the founding families of the state, has too often remained, and many Hazara activists describe the violence as an ongoing genocide.",
    shortDesc: "",
  },
  5: {
    fullDesc:
      "Despite generations of exclusion, the last two decades have seen Hazaras rise through education, community organising, and global advocacy. A significant Hazara diaspora has emerged around the world, building media, art, scholarship, and activism that finally brought Hazara voices to international attention. This category highlights stories of resilience, hope, and the ongoing struggle for freedom, dignity, and a future where Hazara lives are fully protected and valued.",
    shortDesc: "",
  },
  99: {
    fullDesc:
      "This category features external articles, historical documents, book excerpts,research papers, and third-party publications related to Hazara history,culture, politics, and global issues. These are curated references that help our community stay informed through broader sources beyond our own publications. All external links are credited to their original authors and publishers.",
    shortDesc: "",
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
    heading: capitalizeCat(base.en),
    fullDesc: desc.fullDesc,
  };
}
