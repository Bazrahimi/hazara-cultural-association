"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

type Props = {
  isRTL: boolean;
  postId: nubmer;

  slug: string;
};

export default function PostActionsMenu({
  isRTL,
  postId,

  slug,
}: Props) {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 rounded hover:bg-slate-200 transition"
      >
        <IoEllipsisVertical className="w-5 h-5 text-slate-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`
            absolute z-30 w-36 rounded-lg border bg-white shadow-lg
            ${isRTL ? "left-0" : "right-0"}
          `}
        >
          <ul className="py-1 text-sm text-slate-700">
            <li>
              <Link
                href={`/blog/myposts/edit/${postId}`}
                className="block px-3 py-2 hover:bg-slate-100"
              >
                {isRTL ? "ویرایش" : "Edit Draft"}
              </Link>
            </li>

            <li>
              <Link
                href={`/blog/${slug}`}
                className="block px-3 py-2 hover:bg-slate-100"
              >
                {isRTL ? "پیش‌نمایش" : "Preview"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
