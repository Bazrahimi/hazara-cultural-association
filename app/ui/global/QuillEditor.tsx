// components/QuillEditor.tsx
"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type Props = {
  id?: string;
  label: string;
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
  id,
  label,
  value,
  onChange,
  placeholder,
  maxChars,
  className,
}: Props) {
  const inputId = id;
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
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />

      <style jsx>{`
        :global(.ql-editor) {
          min-height: 200px;
          max-height: 400px;
          overflow-y: auto;
        }
      `}</style>
      {typeof maxChars === "number" && (
        <div className="mt-1 text-right text-xs text-gray-500">
          {textLength(value)}/{maxChars} characters
        </div>
      )}
    </div>
  );
}
