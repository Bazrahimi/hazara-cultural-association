import {
  Archived,
Category,
  CreateNewPost,
  Drafted,
  Edit,
  EventDateAndTime,
  EventLocation,
  FeatureToHomepage,
  Published,
  Save,
  Saving,
  Status,
  Title,
  Update,
  Updating,
  UploadImage,
} from "./transHelper";

export const CreateEditPostTrans = {
  PostForm: {
    Title: Title,
    Placeholder: {
      en: "Enter a brief title for the post",
      rtl: "یک عنوان کوتاه برای مطلب خو نوشته کید",
    },
    HeroImage: UploadImage,
  },
  FormHeader: {
    create: {
      heading: CreateNewPost,
     
    },
    edit: {
      heading: Edit,
      description: {
        en: "Update your content and publish changes.",
        rtl: "مطلب خود را ویرایش کرده و تغییرات را نشر کنید.",
      },
    },
    toggle: {
      labelOn: { en: "Switch to English", rtl: "تبدیل به انگلیسی" },
      labelOff: {
        en: "Switch Language to فارسی|هزارگی",
        rtl: "تبدیل به فارسی|هزارگی",
      },
      helper: {
        en: "Choose your writing language before typing to ensure correct formatting and readability.",
        rtl: "برای خوانایی و قالب‌بندی درست، زبان نوشتاری را قبل از شروع انتخاب کنید.",
      },
    },
  },

  CategoryStatusFeaturedFields: {
    categoryLabel: Category,
    statusLabel: Status,
    featuredLabel: FeatureToHomepage,

    status: {
      Published: Published,
      Drafted: Drafted,
      archived: Archived,
    },
  },

  EditorField: {
    label: {
      en: "Content (article body)",
      rtl: "متن مطلب (متن خبر یا اعلان)",
    },
    placeholder: {
      en: "Write the body of your post here…",
      rtl: "متن خبر یا اعلان خود را اینجا بنویسید…",
    },
  },

  AdvocacyEvent: {
    label: {
      dateTime: EventDateAndTime,
      location: EventLocation,
    },
    placeholder: {
      dateTime: {
        en: "Select event date & time",
        rtl: "تاریخ و زمان رویداد را انتخاب کنید",
      },
      location: {
        en: "Enter event location",
        rtl: "محل برگزاری رویداد را وارد کنید",
      },
    },
  },

  FormFooter: {
    create: {
      helper: {
        en: "Posts can be edited later from the admin panel.",
        rtl: "بعداً می‌توانید نوشته‌ها را از پنل مدیریت ویرایش کنید.",
      },
      button: Save,
      loading: Saving,
    },
    edit: {
      helper: {
        en: "Your changes will update immediately.",
        rtl: "تغییرات شما فوراً به‌روز می‌شوند.",
      },
      button: Update,
      loading: Updating,
    },
  },
} as const;
