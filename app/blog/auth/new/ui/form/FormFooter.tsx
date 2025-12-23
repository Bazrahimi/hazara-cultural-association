import { ActionButton } from "@/app/ui/global/clientComponent";
import { ActionMode } from "../PostForm";

type Props = {
  mode: ActionMode;
  isRTL: boolean;
  isLoading: boolean;
  footerMessage: string;
};

const FormFooter = ({ mode, isRTL, isLoading, footerMessage }: Props) => {
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
        <p className="text-xs text-gray-500">
          {mode === "edit"
            ? isRTL
              ? "تغییرات شما فوراً به‌روز می‌شوند."
              : "Your changes will update immediately."
            : isRTL
              ? "بعداً می‌توانید نوشته‌ها را از پنل مدیریت ویرایش کنید."
              : "Posts can be edited later from the admin panel."}
        </p>

        <ActionButton
          type="submit"
          isLoading={isLoading}
          overlay
          loadingText={mode === "edit" ? "Updating…" : "Saving…"}
        >
          {mode === "edit"
            ? isRTL
              ? "به‌روزرسانی مطلب"
              : "Update Post"
            : isRTL
              ? "ذخیره مطلب"
              : "Save Post"}
        </ActionButton>
      </div>
    </>
  );
};

export default FormFooter;
