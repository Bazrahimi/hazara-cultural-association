import { Preview } from "@react-email/components";
import {
  Archive,
  Archived,
  Delete,
  Drafted,
  Edit,
  FeatureToHomepage,
  Publish,
  Published,
  RemoveFromHomepage,
} from "./transHelper";

export const ManagePostTrans = {
  heading: { en: "Manage this post", rtl: "مدیریت این مطلب" },
  note: {
    en: "Only you (author) or an admin can see this section.",
    rtl: "فقط شما (نویسنده) یا مدیر سایت این بخش را می‌بینید.",
  },
  StatusLabels: {
    Published: Published,
    Drafted: Drafted,
    archived: Archived,
  },
  action: {
    Edit: Edit,
    Preview: Preview,
    FeatureToHomepage: FeatureToHomepage,
    RemoveFromHomepage: RemoveFromHomepage,
    Archive: Archive,
    Publish: Publish,
    Delete: Delete,
  },
} as const;
