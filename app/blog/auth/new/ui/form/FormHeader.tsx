import { CreateEditPostTrans } from "@/app/lib/translation";
import { Header } from "@/app/ui/global/Header";
import { P } from "@/app/ui/global/paragraph";
import { ActionMode } from "../PostForm";

type Props = {
  mode: ActionMode;
  isRTL: boolean;
  setIsRTL: (value: boolean) => void;
};

const FormHeader = ({ mode, isRTL, setIsRTL }: Props) => {
  const t = CreateEditPostTrans.FormHeader;
  const lang = isRTL ? "rtl" : "en";
  return (
    <header className="mt-10 md:mt-5" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className={isRTL ? "text-right" : "text-left"}>
          <Header as="h1" size="md">
            {t[mode].heading[lang]}
          </Header>

          <P>{t[mode].description[lang]}</P>
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
              {isRTL ? t.toggle.labelOn[lang] : t.toggle.labelOff[lang]}
            </span>
          </label>

          {/* Language warning / helper message */}
          <p className="mt-1 text-xs text-gray-500">
            {isRTL ? t.toggle.helper[lang] : t.toggle.helper[lang]}
         
          </p>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;
