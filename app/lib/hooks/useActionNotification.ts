// app/lib/hooks/useActionNotification.ts
"use client";

import { useEffect, useMemo } from "react";

export type ActionNotificationState = {
  ok: boolean;
  message: string;
  ts: number;
};

type Options = {
  storageKey: string;
  eventName: string;

};

export const useNotification = <T extends ActionNotificationState>(
  states: Array<T | undefined>,
  { storageKey, eventName}: Options
) => {
  const lastState = useMemo(() => {
    const defined = states.filter((s): s is T => Boolean(s));
    if (defined.length === 0) return null;

    return defined.reduce((latest, current) =>
      current.ts > latest.ts ? current : latest
    );

    
  }, [states]);

  useEffect(() => {
    if (!lastState) return;
    if (typeof window === "undefined") return;

    const payload = {
      message: lastState.message,
      ok: lastState.ok,
      ts: lastState.ts,
    };

    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    window.dispatchEvent(new Event(eventName));

  
  }, [lastState, storageKey, eventName]);
};
