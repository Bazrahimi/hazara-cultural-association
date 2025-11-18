"use client";

import Link from "next/link";
import { HiCalendar, HiChevronDown } from "react-icons/hi";
import { BlogMenuProps } from "./BlogMenu";
import { useDropdownMenu } from "./useDropdownMenu";

type BlogMenuClientProps = BlogMenuProps & { isAllowed: boolean };

const baseItems = [
  {
    label: "Hazara Genocide Memorial",
    href: "/blog/hazara-genocide-memorial/133",
  },
  { label: "Blogs", href: "/blog" },
];

const manageItems = [
  { label: "Post  Blog (news, event, article)", href: "/blog/new" },
   { label: "My Posts", href: "/blog/myposts" },
];

export default function BlogMenuClient({
  navLinkBase,
  navIcon,
  label = "Blogs",
  isAllowed,
}: BlogMenuClientProps) {
  const totalItems = baseItems.length + (isAllowed ? manageItems.length : 0);

  const {
    open,
    setOpen,
    rootRef,
    btnRef,
    setItemRef,
    onButtonKeyDown,
    onMenuKeyDown,
  } = useDropdownMenu(totalItems);

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
                  const idx = baseItems.length + j;
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
