// app/ui/nav/BlogMenuClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiCalendar, HiChevronDown } from "react-icons/hi";
import { BlogMenuProps } from "./BlogMenu";

type BlogMenuClientProps = BlogMenuProps & { isAllowed: boolean };

const baseItems = [
  { label: "Hazara Genocide Memorial", href: "/hazara-genocide-memorial/133" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
];

const manageItems = [
  { label: "Add New Event", href: "/events/add" },
  { label: "Add New News", href: "/news/add" },
];

export default function BlogMenuClient({
  navLinkBase,
  navIcon,
  label = "Blogs",
  isAllowed,
}: BlogMenuClientProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Build the full, focusable list (order matters for keyboard nav)
  const totalItems = baseItems.length + (isAllowed ? manageItems.length : 0);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Focus first item when opening
  useEffect(() => {
    if (open) requestAnimationFrame(() => itemRefs.current[0]?.focus());
  }, [open]);

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    const idx = itemRefs.current.findIndex(
      (el) => el === document.activeElement
    );
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % totalItems;
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx + totalItems - 1) % totalItems;
      itemRefs.current[prev]?.focus();
    }
  };

  // Callback ref must return void
  const setItemRef = (i: number) => (el: HTMLAnchorElement | null) => {
    itemRefs.current[i] = el;
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
        className={`${navLinkBase} inline-flex items-center gap-1`}
      >
        <HiCalendar className={navIcon} />
        <span className="hidden sm:inline">{label}</span>
        <HiChevronDown className="ml-0.5 h-4 w-4 opacity-80" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Blogs submenu"
          onKeyDown={onMenuKeyDown}
          className="absolute left-0 z-40 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5"
        >
          <ul className="py-1">
            {baseItems.map((it, i) => (
              <li key={it.href}>
                <Link
                  ref={setItemRef(i)}
                  href={it.href}
                  role="menuitem"
                  className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  onClick={() => setOpen(false)}
                >
                  {it.label}
                </Link>
              </li>
            ))}

            {isAllowed && (
              <>
                <li
                  role="separator"
                  aria-hidden="true"
                  className="my-1 border-t border-gray-100"
                />
                <li className="px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Manage
                </li>
                {manageItems.map((it, j) => {
                  const idx = baseItems.length + j; // offset after base items
                  return (
                    <li key={it.href}>
                      <Link
                        ref={setItemRef(idx)}
                        href={it.href}
                        role="menuitem"
                        className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        onClick={() => setOpen(false)}
                      >
                        {it.label}
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
