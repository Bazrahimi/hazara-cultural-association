export const CreateEditPostTrans = {
  PostForm: {
    Title: {
      en: "Title",
      rtl: "عنوان مطلب",
    },
    Placeholder: {
      en: "Enter a brief title for the post",
      rtl: "یک عنوان کوتاه برای مطلب خو نوشته کید",
    },
    HeroImage: {
      en: "Upload Image",
      rtl: "آپلود تصویر",
    },
  },
  FormHeader: {
    create: {
      heading: { en: "Create Post", rtl: "ایجاد یک مطلب جدید" },
      description: {
        en: "Share news, announcements, or advocacy events with the community.",
        rtl: "خبر، اعلان یا برنامه‌های دادخواهی را با جامعه هزاره شریک بسازید.",
      },
    },
    edit: {
      heading: { en: "Edit Post", rtl: "ویرایش مطلب" },
      description: {
        en: "Update your content and publish changes.",
        rtl: "مطلب خود را ویرایش کرده و تغییرات را نشر کنید.",
      },
    },
    toggle: {
      labelOn: { en: "Switch to English", rtl: "تبدیل به انگلیسی" },
      labelOff: {
        en: "Switch to فارسی / هزارگی",
        rtl: "تبدیل به فارسی / هزارگی",
      },
      helper: {
        en: "Choose your writing language before typing to ensure correct formatting and readability.",
        rtl: "برای خوانایی و قالب‌بندی درست، زبان نوشتاری را قبل از شروع انتخاب کنید.",
      },
    },
  },

  CategoryStatusFeaturedFields: {
    categoryLabel: { en: "Category", rtl: "دسته‌بندی" },
    statusLabel: { en: "Status", rtl: "وضعیت" },

    status: {
      draft: { en: "Draft", rtl: "پیش‌نویس" },
      published: { en: "Published", rtl: "منتشر شده" },
      archived: { en: "Archived", rtl: "آرشیو شده" },
    },
    featuredLabel: { en: "Featured on homepage", rtl: "نمایش در صفحه اصلی" },
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
      dateTime: {
        en: "Event date & time",
        rtl: "تاریخ و زمان برنامه",
      },
      location: {
        en: "Event location",
        rtl: "محل برگزاری",
      },
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
      button: { en: "Save Post", rtl: "ذخیره مطلب" },
      loading: { en: "Saving…", rtl: "در حال ذخیره…" },
    },
    edit: {
      helper: {
        en: "Your changes will update immediately.",
        rtl: "تغییرات شما فوراً به‌روز می‌شوند.",
      },
      button: { en: "Update Post", rtl: "به‌روزرسانی مطلب" },
      loading: { en: "Updating…", rtl: "در حال به‌روزرسانی…" },
    },
  },
} as const;
