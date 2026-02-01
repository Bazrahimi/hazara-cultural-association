// app/blog/new/ui/form/EditorField.tsx
"use client";

import { CreateEditPostTrans } from "@/app/_lib/translation";
import QuillEditor from "@/app/_ui/QuillEditor";

type Props = {
  isRTL: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string[]; // zod error array for content_html
};

const EditorField = ({ isRTL, value, onChange, error }: Props) => {
  const hasError = !!error && error.length > 0;

  const t = CreateEditPostTrans.EditorField;
  const lang = isRTL ? "rtl" : "en";

  return (
    <div className="space-y-1">
      {/* Label */}
      <label
        htmlFor="content"
        className={`text-sm font-medium ${
          isRTL ? "block text-right" : ""
        } ${hasError ? "text-red-600" : "text-gray-700"}`}
      >
        {isRTL ? t.label[lang] : t.label[lang]}
      </label>

      {/* Editor container with red border on error */}
      <div
        className={`rounded-md border ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      >
        <QuillEditor
          key={lang}
          id="content"
          value={value}
          onChange={onChange}
          placeholder={isRTL ? t.placeholder[lang] : t.placeholder[lang]}
          isRTL={isRTL}
        />
      </div>

      {/* Error message */}
      {hasError && (
        <p
          className={`text-xs text-red-600 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {error[0]}
        </p>
      )}
    </div>
  );
};

export default EditorField;
