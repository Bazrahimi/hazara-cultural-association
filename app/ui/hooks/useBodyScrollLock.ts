// app/ui/hooks/useBodyScrollLock.ts
"use client";
import { useEffect } from "react";

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const body = document.body;
    if (!locked) {
      // unlock
      body.style.overflow = "";
      body.classList.remove("overflow-hidden");
      return;
    }

    // lock
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    body.classList.add("overflow-hidden");

    return () => {
      body.style.overflow = prev || "";
      body.classList.remove("overflow-hidden");
    };
  }, [locked]);
}
