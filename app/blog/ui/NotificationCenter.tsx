"use client";

import { useEffect, useState } from "react";
import { BLOG_TOAST_KEY } from "@/app/lib/helper";

type BlogToast = {
  message: string;
  ok: boolean;
  ts: number;
};

export function BlogNotificationCenter() {
  const [toast, setToast] = useState<BlogToast | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function loadFromStorage() {
      const raw = window.localStorage.getItem(BLOG_TOAST_KEY);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw) as BlogToast;
        setToast(parsed);
        // Clear it so it doesn't show again on next load
        window.localStorage.removeItem(BLOG_TOAST_KEY);
      } catch {
        // ignore parse errors
      }
    }

    // 1) On mount, check if something was left in storage
    loadFromStorage();

    // 2) Listen for custom event from PostActionsMenu
    function handleToastEvent() {
      loadFromStorage();
    }

    window.addEventListener("blog-toast", handleToastEvent);

    // Optional: react to cross-tab updates too
    function handleStorage(e: StorageEvent) {
      if (e.key === BLOG_TOAST_KEY) {
        loadFromStorage();
      }
    }
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("blog-toast", handleToastEvent);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Auto-hide after 3 seconds
  useEffect(() => {
    if (!toast) return;

    const id = window.setTimeout(() => {
      setToast(null);
    }, 10000);

    return () => window.clearTimeout(id);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <div className="rounded-lg bg-slate-900/90 px-4 py-2 text-sm shadow-lg">
        <span className={toast.ok ? "text-emerald-300" : "text-red-300"}>
          {toast.message}
        </span>
      </div>
    </div>
  );
}
