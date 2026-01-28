import { cn } from "@/app/_lib/helper";
import { CreateEditPostTrans } from "@/app/_lib/translation";
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
        <div>
          <Header as="h2" size="md">
            {t[mode].heading[lang]}
          </Header>
        </div>

        {/* RTL Toggle */}
        <div
          className={cn("flex flex-col", isRTL ? "items-end" : "items-start")}
        >
          <fieldset
            className={cn(
              "flex gap-4 text-sm text-gray-700",
              isRTL ? "flex-row-reverse" : "",
            )}
          >
            {/* Hazargi / RTL */}
            <label className="inline-flex items-center gap-2 cursor-pointer ">
              <input
                type="radio"
                name="language"
                checked={isRTL === true}
                onChange={() => setIsRTL(true)}
              />
              <P className="font-extrabold">فارسی | هزارگی</P>
            </label>

            {/* English / LTR */}
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                checked={isRTL === false}
                onChange={() => setIsRTL(false)}
              />
              <span className="font-extrabold">English</span>
            </label>
          </fieldset>

          {/* Language warning / helper message */}
          <P className=" text-gray-500">
            <span className="font-semibold">
              {isRTL ? "قدم اول: " : "Step 1: "}
            </span>
            {t.toggle.helper[lang]}
          </P>
        </div>
      </div>
    </header>
  );
};

export default FormHeader;
