"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BillingAddressInput } from "./schema";

type Props = {
  label: string;
  placeholder: string;
  onSelect: (address: BillingAddressInput) => void;
};

type NominatimSuggestion = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;
    unit?: string;
    apartment?: string;
    flat?: string;
    level?: string;
    building?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    state_code?: string;
    postcode?: string;
    country?: string;
  };
  extratags?: Record<string, string>;
};

export default function AddressAutoComplete({ placeholder, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NominatimSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputId = useId();
  const listboxId = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (!query || query.trim().length < 3) {
      setItems([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const url =
          "https://nominatim.openstreetmap.org/search" +
          `?q=${encodeURIComponent(query)}` +
          "&format=jsonv2&addressdetails=1&extratags=1" +
          "&limit=8&countrycodes=au&accept-language=en-AU";

        const res = await fetch(url, {
          // Nominatim prefers a UA/Referer (from browser this may be ignored).
          headers: { "Accept-Language": "en-AU" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: NominatimSuggestion[] = await res.json();

        // postal-like only
        const postalOnly = data.filter(
          (d) => d.address?.road && d.address?.postcode
        );
        setItems(postalOnly);
        setOpen(postalOnly.length > 0);
        setActiveIndex(postalOnly.length ? 0 : -1);
      } catch (e) {
        console.error("Address lookup failed", e);
        setItems([]);
        setOpen(false);
        setActiveIndex(-1);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  console.log(items);

  // Map a NominatimSuggestion to your BillingAddressInput
  const toBilling = (s: NominatimSuggestion): BillingAddressInput => {
    const a = s.address ?? {};
    const suburb = a.suburb || a.city || a.town || a.village || "";
    const address2 = a.unit || a.apartment || a.flat || a.level || a.building;
    const addressLine = [a.house_number, a.road].filter(Boolean).join(" ");
    return {
      address: addressLine,
      address2,
      suburb,
      state: a.state || "",
      postcode: a.postcode || "",
      country: a.country || "",
    };
  };

  const handleChoose = (idx: number) => {
    const s = items[idx];
    if (!s) return;
    onSelect(toBilling(s));
    setOpen(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open || !items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + items.length) % items.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleChoose(activeIndex >= 0 ? activeIndex : 0);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className="mb-1 ml-3 text-sm font-medium text-gray-700"
      >
        Search location {/* 👀 what Chrome sees in the DOM */}
        <span className="sr-only">Addresses</span>{" "}
        {/* 👂 what screen readers announce */}
      </label>
      <input
        id={inputId}
        type="text"
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setQuery(String(e.target.value ?? ""))}
        value={query ?? ""}
        placeholder={placeholder}
        autoComplete="off" // 🔑 disables most browser autofill
        autoCorrect="off" // iOS Safari spellcheck/autocorrect off
        autoCapitalize="none" // iOS Safari won’t auto-capitalize
        spellCheck={false} // Chrome won’t underline words
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open && activeIndex >= 0
            ? `${listboxId}-opt-${activeIndex}`
            : undefined
        }
        onKeyDown={onKeyDown}
      />

      {open && items.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
        >
          {items.map((it, i) => {
            const a = it.address ?? {};
            const line1 = [a.house_number, a.road].filter(Boolean).join(" ");
            const suburb = a.suburb || a.city || a.town || a.village || "";
            const tail = [suburb.toUpperCase(), a.state, a.postcode, a.country]
              .filter(Boolean)
              .join(" ");
            const active = i === activeIndex;
            return (
              <li
                key={`${it.lat}-${it.lon}-${i}`}
                id={`${listboxId}-opt-${i}`}
                role="option"
                aria-selected={active}
                className={`cursor-pointer px-3 py-2 ${active ? "bg-blue-50" : ""} hover:bg-blue-50`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()} // prevent input blur before click
                onClick={() => handleChoose(i)}
              >
                <div className="text-sm text-gray-900">{line1}</div>
                <div className="text-xs text-gray-600">{tail}</div>
              </li>
            );
          })}
          {loading && (
            <li className="px-3 py-2 text-xs text-gray-500" aria-hidden>
              Searching…
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
