export const CATEGORY_MAP = {
  1: {
    label: {
      en: "News",
      rtl: "اخبار",
    },
    homepage:
      "Latest news, statements, and community updates from Hazaristan and the global Hazara diaspora.",
    full: "Latest news, statements, and updates from the Hazara community and Hazaristan—covering current affairs, advocacy, culture, and the ongoing struggle for safety and equal rights after generations of persecution under successive Afghan states.",
  },

  2: {
    label: {
      en: "Advocacy Event",
      rtl: "برنامه و گردهمایی",
    },
    homepage:
      "Vigils, rallies, community actions, and advocacy efforts for Hazara justice and human rights.",
    full: "Rallies, vigils, and advocacy events for Hazara justice and human rights—amplifying the community’s voice around the world.",
  },

  3: {
    label: {
      en: "Hazaristan",
      rtl: "هزارستان",
    },
    homepage:
      "History, homeland, culture, and identity of Hazaristan—the ancestral land of the Hazara people.",
    full: "Hazaristan is the ancestral homeland of the Hazara people. Before the late 19th century, it functioned with its own autonomy and local leadership. British travellers and ethnographers described a Hazara country stretching from the vicinity of Kandahar towards Herat, Balkh, and Ghazni, with Hazaras controlling the valleys, waters, and rivers of these highlands—until conquest, displacement, and the settlement of Afghan nomadic groups forced many Hazaras from their lands.",
  },

  4: {
    label: {
      en: "Hazara Persecution",
      rtl: "آزار و آزیت هزاره",
    },
    homepage:
      "Historical and ongoing persecution of the Hazara people documented through research, evidence, and testimonies.",
    full: "This section documents the long history of Hazara persecution under successive Afghan rulers since the creation of the modern Afghan state. From Abdur Rahman and Habibullah to Amanullah and later governments, many Hazaras were killed, displaced, or pushed into a scattered diaspora. Even during the eras of Karzai and Ghani—despite substantial international funding—Hazara communities continued to face marginalisation and attacks. Regimes and faces change, but the Afghan-centric exclusion of Hazaras, which began with the founding families of the state, has too often remained. Many Hazara scholars and activists describe the violence as an ongoing genocide.",
  },

  5: {
    label: {
      en: "Hope & Freedom",
      rtl: "امید و آزادی",
    },
    homepage:
      "Stories of resilience, identity, youth, education, culture, and the global Hazara movement for dignity and freedom.",
    full: "Despite generations of exclusion, the last two decades have seen Hazaras rise through education, community organising, and global advocacy. A significant Hazara diaspora has emerged around the world, building media, art, scholarship, and activism that finally brought Hazara voices to international attention. This category highlights stories of resilience, hope, and the ongoing struggle for freedom, dignity, and a future where Hazara lives are fully protected and valued.",
  },
} as const;

export type CategoryId = keyof typeof CATEGORY_MAP; // 1 | 2 | 3 | 4

export function getCategoryLabel(categoryId: number, isRTL: boolean): string {
  const item = CATEGORY_MAP[categoryId as CategoryId];
  if (!item) return "";
  return isRTL ? item.rtl : item.en;
}
