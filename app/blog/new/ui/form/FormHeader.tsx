import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { ActionMode } from "../../lib/definitions";

type Props = {
  mode: ActionMode;
  isRTL: boolean;
  setIsRTL: (value: boolean) => void;
};

const FormHeader = ({ mode, isRTL, setIsRTL }: Props) => {
  return (
    <header className="mt-10 md:mt-5" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className={isRTL ? "text-right" : "text-left"}>
          <Header as="h1" size="md">
            {mode === "create"
              ? isRTL
                ? "ایجاد یک مطلب جدید"
                : "Create Post"
              : isRTL
                ? "ویرایش مطلب"
                : "Edit Post"}
          </Header>

          <P>
            {mode === "create"
              ? isRTL
                ? "خبر، اعلان یا برنامه‌های دادخواهی را با جامعه هزاره شریک بسازید."
                : "Share news, announcements, or advocacy events with the community."
              : isRTL
                ? "مطلب خود را ویرایش کرده و تغییرات را نشر کنید."
                : "Update your content and publish changes."}
          </P>
        </div>

        {/* RTL Toggle */}
        <div className={`flex flex-col ${isRTL ? "items-end" : "items-start"}`}>
          <label
            className={`inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isRTL}
              onChange={(e) => setIsRTL(e.target.checked)}
            />
            <span className="font-extrabold flex items-center gap-1">
              {isRTL ? (
                <span>Switch to English</span>
              ) : (
                <span>تبدیل به فارسی / هزارگی</span>
              )}
            </span>
          </label>

          {/* Language warning / helper message */}
          <p className="mt-1 text-xs text-gray-500">
            {isRTL
              ? "برای خوانایی و قالب‌بندی درست، زبان نوشتاری را قبل از شروع انتخاب کنید."
              : "Choose your writing language before typing to ensure correct formatting and readability."}
          </p>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;
