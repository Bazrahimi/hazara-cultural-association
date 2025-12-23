type Props = {
  categoryId?: number;
  isRTL: boolean;
  eventDate?: string;
  eventLocation?: string;
};

import { CreateEditPostTrans } from "@/app/lib/translation";

const AdvocacyEvent = ({ isRTL, eventDate, eventLocation }: Props) => {
  const t = CreateEditPostTrans.AdvocacyEvent;
  const lang = isRTL ? "rtl" : "en";

  const placeholderDate = isRTL
    ? "تاریخ و زمان رویداد را انتخاب کنید"
    : "Select event date & time";

  const placeholderLocation = isRTL
    ? "محل برگزاری رویداد را وارد کنید"
    : "Enter event location";

  return (
    <div className="grid gap-4 md:grid-cols-2" dir={isRTL ? "rtl" : "ltr"}>
      {/* Date + Time */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          {isRTL ? t.label.dateTime[lang] : t.label.dateTime[lang]}
        </label>

        <input
          type="datetime-local"
          name="eventDate"
          defaultValue={eventDate ?? ""}
          placeholder={t.placeholder.dateTime[lang]}
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
            isRTL ? "text-right" : ""
          }`}
        />
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          {isRTL ? "محل برگزاری" : "Event location"}
        </label>

        <input
          name="eventLocation"
          defaultValue={eventLocation ?? ""}
          placeholder={placeholderLocation}
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
            isRTL ? "text-right" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default AdvocacyEvent;
