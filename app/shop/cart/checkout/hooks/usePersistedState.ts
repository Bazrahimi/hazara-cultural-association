// app/shop/hooks/usePersistedState.ts
"use client";

import { useEffect, useState } from "react";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default function usePersistedState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(key) : null;
      if (raw == null) return;

      const parsed: unknown = JSON.parse(raw);

      if (isRecord(parsed) && isRecord(initial)) {
        // shallow-merge objects
        const next = {
          ...(initial as Record<string, unknown>),
          ...parsed,
        } as T;
        setState(next);
      } else {
        // replace for primitives/arrays
        setState(parsed as T);
      }
    } catch {
      // ignore malformed JSON or storage errors
    }
  }, [key, initial]);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore quota or private mode errors
    }
  }, [key, state]);

  return [state, setState] as const;
}
