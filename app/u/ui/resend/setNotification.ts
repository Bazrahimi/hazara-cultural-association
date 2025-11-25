"use client";

import { NOTIFICATION_EVENT, NOTIFICATION_KEY} from "@/app/lib/helper";

export const setNotification = (message:string) => {
  if (typeof window === "undefined") return;
  const payload = {
    ok: true,
    message: message,
  };

  window.localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(NOTIFICATION_EVENT));
};
