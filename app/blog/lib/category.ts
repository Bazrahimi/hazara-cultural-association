export const CATEGORY_MAP = {
  1: {
    en: "news",
    rtl: "اخبار و روز رسانی‌ها",
    theme: {
      icon: "📰",
      label: "News",
      from: "#1d4ed8",
      to: "#0ea5e9",
    },
  },
  2: {
    en: "Community Events",
    rtl: "برنامه و گردهمایی",
    theme: {
      icon: "📣",
      label: "Events",
      from: "#7c2d12",
      to: "#f97316",
    },
  },
  3: {
    en: "hazaristan",
    rtl: "هزارستان",
    theme: {
      icon: "⛰️",
      label: "Hazaristan",
      from: "#047857",
      to: "#22c55e",
    },
  },
  4: {
    en: "hazara persecution",
    rtl: "آزار و آزیت هزاره",
    theme: {
      icon: "🕯️",
      label: "Persecution",
      from: "#111827",
      to: "#4b5563",
    },
  },
  5: {
    en: "hope & freedom",
    rtl: "امید و آزادی",
    theme: {
      icon: "🌅",
      label: "Hope & Freedom",
      from: "#7c3aed",
      to: "#ec4899",
    },
  },
  99: {
    en: "external resources & references",
    rtl: "منابع و مطالب بیرونی",
    theme: {
      icon: "📚",
      from: "#334155",
      to: "#0f172a",
    },
  },
} as const;

export type CategoryId = keyof typeof CATEGORY_MAP; // 1 | 2 | 3 | 4

export function getCategoryLabel(categoryId: number, isRTL: boolean = false): string {
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
  3: {
    fullDesc:
      "Hazaristan is the ancestral homeland of the Hazara people. Before the late 19th century, it held its own local governance and cultural autonomy. Historical accounts describe a Hazara land stretching across the central highlands, rich with valleys, rivers, and mountain life—until conquest, displacement, and forced migrations changed the region forever. This section preserves stories, memory, and heritage for both local and diaspora communities, including those now living in Australia.",
    shortDesc:
      "History and heritage of Hazaristan, preserved for Hazara communities in Australia and worldwide.",
  },
  4: {
    fullDesc:
      "This section documents the long history of Hazara persecution—from Abdur Rahman’s reign to modern genocidal attacks—leading to displacement, diaspora, and generations of trauma. It examines structural discrimination, massacres, and targeted violence. For communities now rebuilding in Australia, remembering this history is essential for healing, recognition, and ensuring that these injustices are never ignored again.",
    shortDesc:
      "Documentation of historic and modern persecution of Hazaras, with focus on memory and recognition.",
  },
  5: {
    fullDesc:
      "Despite generations of exclusion, Hazaras have risen through education, community organising, and global advocacy. In Australia, a vibrant Hazara community has grown over the last two decades, contributing to culture, academia, business, and civic life. This category highlights stories of resilience, hope, social contribution, and the continued pursuit of dignity, equality, and freedom—values at the heart of true social cohesion.",
    shortDesc:
      "Stories of resilience and contribution from Hazaras in Australia and worldwide, building a dignified future.",
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
    heading: capitalizeCat(base.en),
    rtlHeading: base.rtl,
    fullDesc: desc.fullDesc,
    shortDesc: desc.shortDesc,
  };
}
