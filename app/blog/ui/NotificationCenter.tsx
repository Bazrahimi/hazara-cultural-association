// app/ui/NotificationCenter.tsx (for example)
"use client";

import { NOTIFICATION_EVENT, NOTIFICATION_KEY } from "@/app/lib/helper";
import type { ActionNotificationState } from "@/app/lib/hooks/useActionNotification";
import { useEffect, useState } from "react";

type NotificationPayload = ActionNotificationState;

export function NotificationCenter() {
  const [toast, setToast] = useState<NotificationPayload | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function loadFromStorage() {
      const raw = window.localStorage.getItem(NOTIFICATION_KEY);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw) as NotificationPayload;
        setToast(parsed);
        // Clear it so it doesn't show again on next load
        window.localStorage.removeItem(NOTIFICATION_KEY);
      } catch {
        // ignore parse errors
      }
    }

    // On mount
    loadFromStorage();

    function handleToastEvent() {
      loadFromStorage();
    }

    window.addEventListener(NOTIFICATION_EVENT, handleToastEvent);

    function handleStorage(e: StorageEvent) {
      if (e.key === NOTIFICATION_KEY) {
        loadFromStorage();
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(NOTIFICATION_EVENT, handleToastEvent);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Auto-hide after 10s
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
