"use client";

import { NOTIFICATION_EVENT, NOTIFICATION_KEY } from "@/app/lib/helper";

export const setNotification = () => {
  if (typeof window === "undefined") return;
  const payload = {
    ok: true,
    message: "Successfully logged out.",
  };

  window.localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(payload));
  window.dispatchEvent(new Event(NOTIFICATION_EVENT));
};
