"use client";

import { destroySession } from "@/app/lib/session";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";

type Props = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

export default function AccountMenuClient({ isLoggedIn, isAdmin }: Props) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // close on outside click / ESC
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (boxRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center rounded-md border border-gray-100 px-3 py-1.5 font-medium text-gray-100 hover:bg-gray-50 hover:text-blue-500"
      >
        <CiUser className="text-lg" />
        <span className="sr-only">Account</span>
      </button>

      {open && (
        <div
          ref={boxRef}
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white/95 shadow-lg backdrop-blur"
        >
          {!isLoggedIn ? (
            <div className="py-1">
              <Link
                href="/u/login"
                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/u/sign-up"
                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Create account
              </Link>
            </div>
          ) : (
            <div className="py-1">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                >
                  Admin Console
                </Link>
              )}
              <Link
                href="/account"
                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/account/settings"
                className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                Account Setting
              </Link>

              {/* Logout via server action */}
              <form action={destroySession}>
                <button
                  type="submit"
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                  role="menuitem"
                >
                  Log out
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
