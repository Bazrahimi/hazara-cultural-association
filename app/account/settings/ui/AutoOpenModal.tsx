"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type Target = "none" | "profile" | "addressNew";

/**
 * Pushes to the modal route once per tab when target !== "none".
 * The modal will close via router.back() and won't auto-reopen.
 */
export default function AutoOpenModal({ target }: { target: Target }) {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (target === "none") return;

    // Gate: only auto-open once per tab
    if (sessionStorage.getItem("settings:prompted") === "1") return;
    sessionStorage.setItem("settings:prompted", "1");

    const href =
      target === "profile"
        ? "/account/settings/profile"
        : "/account/settings/addresses/new";

    router.push(href);
  }, [target, router]);

  return null;
}
