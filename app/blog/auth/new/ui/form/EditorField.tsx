// app/blog/new/ui/form/EditorField.tsx
"use client";

import QuillEditor from "@/app/ui/global/QuillEditor";

type Props = {
  isRTL: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string[]; // zod error array for content_html
};

const EditorField = ({ isRTL, value, onChange, error }: Props) => {
  const hasError = !!error && error.length > 0;

  return (
    <div className="space-y-1">
      {/* Label */}
      <label
        htmlFor="content"
        className={`text-sm font-medium ${
          isRTL ? "block text-right" : ""
        } ${hasError ? "text-red-600" : "text-gray-700"}`}
      >
        {isRTL ? "متن مطلب (متن خبر یا اعلان)" : "Content (article body)"}
      </label>

      {/* Editor container with red border on error */}
      <div
        className={`rounded-md border ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      >
        <QuillEditor
          id="content"
          value={value}
          onChange={onChange}
          placeholder={
            isRTL
              ? ""
              : "Write the body of your post here متن خبر یا اعلان خود را اینجا بنویسید"
          }
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
