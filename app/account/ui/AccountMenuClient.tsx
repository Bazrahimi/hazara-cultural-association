// app/ui/nav/AccountMenuClient.tsx
"use client";

import { destroySession } from "@/app/lib/session";
import Link from "next/link";
import { HiChevronDown, HiUser } from "react-icons/hi";
import { useDropdownMenu } from "../../blog/ui/useDropdownMenu";
import { AccountMenuProps } from "./AccountMenu";
import AvatarInitials from "./AvatarInitials";

type AccountMenuClientProps = AccountMenuProps & {
  isAllowed: boolean;
  isLoggedIn: boolean;
  initials: string | null;
};

const baseItems = [
  { label: "Account Dashboard", href: "/account" },
  { label: "Settings", href: "/account/settings" },
];

const adminItems = [{ label: "Admin Console", href: "/admin" }];

export default function AccountMenuClient({
  navLinkBase,
  navIcon,
  isAllowed,
  isLoggedIn,
  initials,
}: AccountMenuClientProps) {
  const totalItems = isLoggedIn
    ? baseItems.length + (isAllowed ? adminItems.length : 0)
    : 2; // Login + Signup when logged out

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
        <HiUser className={navIcon} />
        <div className="hidden sm:inline">{<AvatarInitials initials={initials} />}</div>
        <HiChevronDown className="ml-0.5 h-4 w-4 opacity-80" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account submenu"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5"
        >
          <ul className="py-1">
            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    ref={setItemRef(0)}
                    href="/u/login"
                    className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                    role="menuitem"
                  >
                    Log in
                  </Link>
                </li>

                <li>
                  <Link
                    ref={setItemRef(1)}
                    href="/u/sign-up"
                    className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                    role="menuitem"
                  >
                    Create account
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                {isAllowed && (
                  <li>
                    <Link
                      ref={setItemRef(0)}
                      href="/admin"
                      className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                      role="menuitem"
                    >
                      Admin Console
                    </Link>
                  </li>
                )}

                {baseItems.map((it, i) => {
                  const idx = isAllowed ? i + 1 : i;
                  return (
                    <li key={it.href}>
                      <Link
                        ref={setItemRef(idx)}
                        href={it.href}
                        className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                        role="menuitem"
                      >
                        {it.label}
                      </Link>
                    </li>
                  );
                })}

                <li className="border-t border-gray-100 my-1" />

                <li>
                  <form action={destroySession}>
                    <button
                      ref={setItemRef(totalItems - 1)}
                      type="submit"
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      role="menuitem"
                    >
                      Log out
                    </button>
                  </form>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
