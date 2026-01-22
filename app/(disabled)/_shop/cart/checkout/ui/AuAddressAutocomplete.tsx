// app/checkout/ui/AuAddressAutocomplete.tsx
"use client";

import { P } from "@/app/ui/global/paragraph";
import { useEffect, useMemo, useRef, useState } from "react";

/** Nominatim response (subset) */
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
  };
  extratags?: Record<string, string>;
};

/** Parsed address we return to the parent */
export type ParsedAuAddress = {
  full: string;
  streetNumber: string;
  street: string;
  address: string;
  address2: string;
  suburb: string;
  state: string;
  stateCode: string;
  postcode: string;
};

const AU_STATE_NAME_TO_CODE: Record<string, string> = {
  "New South Wales": "NSW",
  Victoria: "VIC",
  Queensland: "QLD",
  "South Australia": "SA",
  "Western Australia": "WA",
  Tasmania: "TAS",
  "Australian Capital Territory": "ACT",
  "Northern Territory": "NT",
};

function getStateCode(
  a?: NominatimSuggestion["address"],
  extra?: NominatimSuggestion["extratags"]
) {
  if (a?.state_code) return a.state_code.toUpperCase();
  const iso = extra?.["ISO3166-2-lvl4"];
  if (iso?.startsWith("AU-")) return iso.slice(3).toUpperCase();
  if (a?.state && AU_STATE_NAME_TO_CODE[a.state])
    return AU_STATE_NAME_TO_CODE[a.state];
  return "";
}

function join(parts: (string | undefined)[], sep: string) {
  return parts.filter(Boolean).join(sep);
}

function parseSuggestion(s: NominatimSuggestion): ParsedAuAddress {
  const a = s.address ?? {};
  const streetNumber = a.house_number ?? "";
  const street = a.road ?? "";

  const unit = a.unit ?? a.apartment ?? a.flat ?? "";
  const level = a.level ? `Level ${a.level}` : "";
  const building = a.building ?? "";

  const address = (
    join([streetNumber, street], " ").trim() || s.display_name
  ).trim();
  const address2 = join([unit ? `Unit ${unit}` : "", level, building], ", ");

  const suburb = a.suburb || a.city || a.town || a.village || "";
  const state = a.state || "";
  const stateCode = getStateCode(a, s.extratags);
  const postcode = a.postcode || "";

  return {
    full: s.display_name,
    streetNumber,
    street,
    address,
    address2,
    suburb,
    state,
    stateCode,
    postcode,
  };
}

/** Build a postal label: "12 Smith Street, DOVETON VIC 3177" */
function postalLabel(p: ParsedAuAddress) {
  const suburb = p.suburb ? p.suburb.toUpperCase() : "";
  const state = p.stateCode || p.state;
  const tail = join([suburb, state, p.postcode], " ").trim();
  return tail ? `${p.address}, ${tail}` : p.address;
}

type Props = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onSelect: (addr: ParsedAuAddress) => void;
};

const AuAddressAutocomplete = ({
  label = "Search you address",
  placeholder = "Start typing your address (AU only)…",
  defaultValue = "",
  onSelect,
}: Props) => {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NominatimSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);

    if (!query || query.trim().length < 3) {
      setItems([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    setLoading(true);
    timer.current = window.setTimeout(async () => {
      try {
        const url =
          "https://nominatim.openstreetmap.org/search" +
          `?q=${encodeURIComponent(query)}` +
          "&format=jsonv2&addressdetails=1&extratags=1" +
          "&limit=8&countrycodes=au&accept-language=en-AU";

        const res = await fetch(url, {
          headers: { "Accept-Language": "en-AU" },
        });
        const data: NominatimSuggestion[] = await res.json();

        // keep only postal-like results (must have street/road and postcode)
        const postalOnly = data.filter(
          (d) => d.address?.road && d.address?.postcode
        );

        setItems(postalOnly);
        setOpen(!!postalOnly.length);
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
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  // close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const parsedItems = useMemo(
    () => items.map((s) => parseSuggestion(s)),
    [items]
  );
  const labels = useMemo(() => parsedItems.map(postalLabel), [parsedItems]);

  function chooseIndex(i: number) {
    const parsed = parsedItems[i];
    if (!parsed) return;
    const label = postalLabel(parsed);
    setQuery(label); // show postal-style label in the input
    setOpen(false);
    setActiveIndex(-1);
    onSelect(parsed); // parent gets structured fields
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || !parsedItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((idx) => (idx + 1) % parsedItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((idx) => (idx <= 0 ? parsedItems.length - 1 : idx - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) chooseIndex(activeIndex);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="street-address"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="au-address-listbox"
        role="combobox"
      />

      {open && parsedItems.length > 0 && (
        <ul
          id="au-address-listbox"
          role="listbox"
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded border border-gray-200 bg-white shadow"
        >
          {labels.map((label, i) => {
            const isActive = i === activeIndex;
            return (
              <li
                key={`${parsedItems[i].address}_${parsedItems[i].postcode}_${i}`}
                role="option"
                aria-selected={isActive}
                className={`cursor-pointer px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 ${
                  isActive ? "bg-gray-100" : ""
                }`}
                // use onMouseDown so input blur doesn’t cancel the click
                onMouseDown={(e) => {
                  e.preventDefault();
                  chooseIndex(i);
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}

      {loading && (
        <P className="mt-1 text-gray-500" size="sm">
          Searching addresses…
        </P>
      )}
    </div>
  );
};

export default AuAddressAutocomplete;
