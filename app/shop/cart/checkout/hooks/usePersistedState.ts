// app/shop/hooks/usePersistedState.ts
"use client";
import { useEffect, useState } from "react";

export default function usePersistedState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        // shallow-merge if both are objects, else replace
        const next =
          parsed && typeof parsed === "object" && typeof initial === "object"
            ? { ...(initial as any), ...parsed }
            : (parsed as T);
        setState(next ?? initial);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState] as const;
}
