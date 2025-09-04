// components/QuillEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  maxChars?: number;
  className?: string;
};

const textLength = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim().length;

export default function QuillEditor({
  value,
  onChange,
  placeholder,
  maxChars,
  className,
}: Props) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [3, 4, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }], // OK in toolbar
        ["link"],
        [{ align: "" }, { align: "right" }],
        ["clean"],
      ],
      clipboard: { matchVisual: false },
    }),
    []
  );

  // ❗ No "bullet" here — only "list"
  const formats = useMemo(
    () => ["header", "bold", "italic", "underline", "list", "link", "align"],
    []
  );

  const handleChange = (html: string) => {
    if (maxChars && textLength(html) > maxChars) return;
    onChange(html);
  };

  return (
    <div className={className}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      {typeof maxChars === "number" && (
        <div className="mt-1 text-right text-xs text-gray-500">
          {textLength(value)}/{maxChars} characters
        </div>
      )}
    </div>
  );
}
