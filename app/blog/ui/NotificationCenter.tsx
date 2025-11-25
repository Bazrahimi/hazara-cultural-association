"use client";

import { NOTIFICATION_EVENT, NOTIFICATION_KEY } from "@/app/lib/helper";
import { useEffect, useState } from "react";

export function NotificationCenter() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function loadFromStorage() {
      const raw = window.localStorage.getItem(NOTIFICATION_KEY);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw) as { message: string };
        setMessage(parsed.message);
        window.localStorage.removeItem(NOTIFICATION_KEY);
      } catch {
        /* ignore errors */
      }
    }

    // On mount
    loadFromStorage();

    const handleToastEvent = () => loadFromStorage();
    const handleStorage = (e: StorageEvent) => {
      if (e.key === NOTIFICATION_KEY) loadFromStorage();
    };

    window.addEventListener(NOTIFICATION_EVENT, handleToastEvent);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(NOTIFICATION_EVENT, handleToastEvent);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Auto-hide
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(id);
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed top-16 right-4 z-[9999]">
      <div className="rounded-lg bg-slate-900/90 px-4 py-2 text-sm shadow-lg text-emerald-300">
        {message}
      </div>
    </div>
  );
}
