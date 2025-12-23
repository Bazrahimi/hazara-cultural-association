type Props = {
  categoryId?: number;
  isRTL: boolean;
  eventDate?: string;
  eventLocation?: string;
};

import { POST_FIELDS } from "@/app/blog/post/lib/helper";
import { CreateEditPostTrans } from "@/app/lib/translation";

const AdvocacyEvent = ({ isRTL, eventDate, eventLocation }: Props) => {
  const t = CreateEditPostTrans.AdvocacyEvent;
  const lang = isRTL ? "rtl" : "en";
  const f = POST_FIELDS;

  return (
    <div className="grid gap-4 md:grid-cols-2" dir={isRTL ? "rtl" : "ltr"}>
      {/* Date + Time */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          {isRTL ? t.label.dateTime[lang] : t.label.dateTime[lang]}
        </label>

        <input
          type="datetime-local"
          name={f.eventDate}
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
          {isRTL ? t.label.location[lang] : t.label.location[lang]}
        </label>

        <input
          name={f.eventLocation}
          defaultValue={eventLocation ?? ""}
          placeholder={
            isRTL ? t.placeholder.location[lang] : t.placeholder.location[lang]
          }
          className={`mt-1 w-full rounded-md border border-gray-300 px-3 py-2 ${
            isRTL ? "text-right" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default AdvocacyEvent;
