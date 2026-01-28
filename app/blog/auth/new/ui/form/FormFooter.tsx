import { CreateEditPostTrans } from "@/app/_lib/translation";
import { ActionButton } from "@/app/ui/global/clientComponent";
import { ActionMode } from "../PostForm";

type Props = {
  mode: ActionMode;
  isRTL: boolean;
  isLoading: boolean;
  footerMessage: string;
};

const FormFooter = ({ mode, isRTL, isLoading, footerMessage }: Props) => {
  const t = CreateEditPostTrans.FormFooter;
  const lang = isRTL ? "rtl" : "en";
  return (
    <>
      {/* State message (error or informational) */}
      {footerMessage && (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            isRTL ? "text-right" : ""
          } bg-red-50 text-red-700`}
        >
          {footerMessage}
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{t[mode].helper[lang]}</p>

        <ActionButton
          type="submit"
          isLoading={isLoading}
          overlay
          loadingText={t[mode].loading[lang]}
        >
          {t[mode].button[lang]}
        </ActionButton>
      </div>
    </>
  );
};

export default FormFooter;
