import { POST_STATUS } from "@/app/blog/post/lib/definitions";

import {
  Archive,
  Archived,
  archivedOn,
  DeletePermanently,
  Drafted,
  draftedOn,
  Edit,
  FeaturedOnHomePage,
  FeatureToHomepage,
  Preview,
  Publish,
  Published,
  PublishedOn,
  RemoveFromHomepage,
  Status,
  UpdatedOn,
} from "./transHelper";
import { updatePost } from "@/app/blog/post/lib/action";

export const ManagePostTrans = {
  heading: { en: "Manage this post", rtl: "مدیریت این مطلب" },
  note: {
    en: "Only you (author) or an admin can see this section.",
    rtl: "فقط شما (نویسنده) یا مدیر سایت این بخش را می‌بینید.",
  },
  Status: {
    [POST_STATUS.PUBLISHED]: Published,
    [POST_STATUS.DRAFTED]: Drafted,
    [POST_STATUS.ARCHIVED]: Archived,
  },
  Label: {
    Status: Status,
    UpdatedOn: UpdatedOn,
    Published: Published,
    Drafted: Drafted,
    Archived: Archived,
    FeaturedOnHomePage: FeaturedOnHomePage,
  },
  actionedOn: {
    [POST_STATUS.DRAFTED]: draftedOn,
    [POST_STATUS.PUBLISHED]: UpdatedOn,
    [POST_STATUS.ARCHIVED]: UpdatedOn,
  },
  action: {
    Edit: Edit,
    Preview: Preview,
    FeatureToHomepage: FeatureToHomepage,
    RemoveFromHomepage: RemoveFromHomepage,
    Archive: Archive,
    Publish: Publish,
    Delete: DeletePermanently,
  },
} as const;
