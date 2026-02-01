import { formatDateTimeAU } from "@/app/_lib/Date";
import { P } from "@/app/_ui";

type Props = {
  eventDate: string;
  eventLocation: string;
  isRTL: boolean;
};

const EventSection = ({ eventDate, eventLocation, isRTL }: Props) => {
  return (
    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4 text-sm text-blue-900 mt-5">
      <P className="font-semibold">
        {isRTL ? "جزییات برنامهٔ دادخواهی" : "Advocacy event details"}
      </P>

      <P>
        <span className="font-medium">
          {isRTL ? "تاریخ و زمان: " : "Date & time: "}
        </span>
        {formatDateTimeAU(eventDate)}
      </P>

      <P>
        <span className="font-medium">
          {isRTL ? "محل برگزاری: " : "Location: "}
        </span>
        {eventLocation}
      </P>
    </div>
  );
};

export default EventSection;
