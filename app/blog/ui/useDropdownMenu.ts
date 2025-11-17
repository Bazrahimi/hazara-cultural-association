"use client";

import { KeyboardEvent, RefObject, useEffect, useRef, useState } from "react";

type UseDropdownMenuReturn = {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  rootRef: RefObject<HTMLDivElement | null>;
  btnRef: RefObject<HTMLButtonElement | null>;
  setItemRef: (index: number) => (el: HTMLElement | null) => void;
  onButtonKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  onMenuKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
};

/**
 * Reuseable dropdown menu hook with:
 * - open/close state
 * - click-outside to close
 * - keyboard support (Enter/space/arrows/Escape)
 * - focus management for menu items
 */

export const useDropdownMenu = (itemCount: number): UseDropdownMenuReturn => {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // close Menu when clicking
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      //if click is outside the root container -> close menu
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);

    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Focus the first menu item menu opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        itemRefs.current[0]?.focus();
      });
    }
  }, [open]);

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // Down arrow, Enter, or Space → open dropdown
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // Find index of currently focused menu item
    const idx = itemRefs.current.findIndex(
      (el) => el === document.activeElement
    );

    // Determine number of items
    const total =
      itemCount && itemCount > 0 ? itemCount : itemRefs.current.length;

    // ----- ESC → Close menu -----
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      btnRef.current?.focus(); // Return focus to button
    }

    // ----- ArrowDown → Move to next item -----
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1 + total) % total; // Loop to first after last
      itemRefs.current[next]?.focus();
    }

    // ----- ArrowUp → Move to previous item -----
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + total) % total; // Loop to last after first
      itemRefs.current[prev]?.focus();
    }
  };

  // ---------------------------------------------------
  // Assign ref for each item using callback ref pattern
  // ---------------------------------------------------
  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el; // Store element at given index
  };

  // Return everything the parent component needs
  return {
    open,
    setOpen,
    rootRef,
    btnRef,
    setItemRef,
    onButtonKeyDown,
    onMenuKeyDown,
  };
};
