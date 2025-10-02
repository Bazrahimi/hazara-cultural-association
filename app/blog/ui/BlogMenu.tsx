"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HiCalendar, HiChevronDown } from "react-icons/hi";

type Props = {
  navLinkBase: string;
  navIcon: string;
  label?: string;
};

const items = [
  { label: "Hazara Genocide Memorial", href: "/hazara-genocide-memorial" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
];

export default function BlogMenu({
  navLinkBase,
  navIcon,
  label = "Blogs",
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Focus first item when opened with keyboard
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        itemRefs.current[0]?.focus();
      });
    }
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
      const next = (idx + 1) % items.length;
      itemRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx + items.length - 1) % items.length;
      itemRefs.current[prev]?.focus();
    }
  };

  // IMPORTANT: callback ref must return void
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
            {items.map((it, i) => (
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
          </ul>
        </div>
      )}
    </div>
  );
}
