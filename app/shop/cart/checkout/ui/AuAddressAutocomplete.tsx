// app/checkout/ui/AuAddressAutocomplete.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/** --- Types from Nominatim (subset) --- */
type NominatimSuggestion = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    house_number?: string;
    road?: string;

    unit?: string;          // sometimes present
    apartment?: string;     // sometimes present
    flat?: string;          // sometimes present
    level?: string;         // sometimes present
    building?: string;      // sometimes present

    suburb?: string;
    city?: string;
    town?: string;
    village?: string;

    state?: string;         // e.g. "Victoria"
    state_code?: string;    // sometimes present e.g. "VIC"
    postcode?: string;
  };
  extratags?: Record<string, string>; // may contain ISO3166-2-lvl4: "AU-VIC"
};

/** --- What you want back --- */
export type ParsedAuAddress = {
  full: string;

  streetNumber: string;   // e.g. "12"
  street: string;         // e.g. "Smith Street"
  line1: string;          // "12 Smith Street"
  line2: string;          // "Unit 4, Level 2, Building ABC" (optional, can be "")

  suburb: string;         // e.g. "Melbourne"
  state: string;          // e.g. "Victoria"
  stateCode: string;      // e.g. "VIC"
  postcode: string;       // e.g. "3000"
};

/** --- Helpers --- */
const AU_STATE_NAME_TO_CODE: Record<string, string> = {
  "New South Wales": "NSW",
  "Victoria": "VIC",
  "Queensland": "QLD",
  "South Australia": "SA",
  "Western Australia": "WA",
  "Tasmania": "TAS",
  "Australian Capital Territory": "ACT",
  "Northern Territory": "NT",
};

function getStateCode(a?: NominatimSuggestion["address"], extra?: NominatimSuggestion["extratags"]) {
  // 1) direct from address.state_code
  if (a?.state_code) return a.state_code.toUpperCase();

  // 2) from extratags ISO3166-2-lvl4 (e.g. "AU-VIC")
  const iso = extra?.["ISO3166-2-lvl4"];
  if (iso && iso.startsWith("AU-")) return iso.slice(3).toUpperCase();

  // 3) map full state name
  if (a?.state && AU_STATE_NAME_TO_CODE[a.state]) {
    return AU_STATE_NAME_TO_CODE[a.state];
  }

  return "";
}

function joinNonEmpty(parts: (string | undefined)[], sep: string) {
  return parts.filter(Boolean).join(sep);
}

function parseSuggestion(s: NominatimSuggestion): ParsedAuAddress {
  const a = s.address ?? {};

  const streetNumber = a.house_number ?? "";
  const street = a.road ?? "";

  const unit = a.unit ?? a.apartment ?? a.flat ?? "";
  const level = a.level ? `Level ${a.level}` : "";
  const building = a.building ?? "";

  // AU forms usually want unit/level/building as Line 2
  const line1 = joinNonEmpty([streetNumber, street], " ").trim() || s.display_name;
  const line2 = joinNonEmpty(
    [
      unit ? `Unit ${unit}` : "",
      level,
      building,
    ],
    ", "
  );

  const suburb = a.suburb || a.city || a.town || a.village || "";
  const state = a.state || "";
  const stateCode = getStateCode(a, s.extratags);
  const postcode = a.postcode || "";

  return {
    full: s.display_name,
    streetNumber,
    street,
    line1,
    line2,
    suburb,
    state,
    stateCode,
    postcode,
  };
}

/** --- Component --- */
type Props = {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onSelect: (addr: ParsedAuAddress) => void;
};

export default function AuAddressAutocomplete({
  label = "Address",
  placeholder = "Start typing your address (AU only)…",
  defaultValue = "",
  onSelect,
}: Props) {
  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NominatimSuggestion[]>([]);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    if (!query || query.trim().length < 3) {
      setItems([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    timer.current = window.setTimeout(async () => {
      try {
        const url =
          "https://nominatim.openstreetmap.org/search" +
          `?q=${encodeURIComponent(query)}` +
          "&format=jsonv2&addressdetails=1&extratags=1" +   // ← add extratags
          "&limit=8&countrycodes=au&accept-language=en-AU";
        const res = await fetch(url, {
          headers: { "Accept-Language": "en-AU" },
        });
        const data: NominatimSuggestion[] = await res.json();
        setItems(data);
        setOpen(true);
      } catch (e) {
        console.error("Address lookup failed", e);
        setItems([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [query]);

  const choose = (s: NominatimSuggestion) => {
    const parsed = parseSuggestion(s);
    setQuery(parsed.line1);   // show a clean street line in the field
    setOpen(false);
    onSelect(parsed);
  };

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="street-address"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="au-address-listbox"
      />
      {open && items.length > 0 && (
        <ul
          id="au-address-listbox"
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded border border-gray-200 bg-white shadow"
          role="listbox"
        >
          {items.map((s, i) => (
            <li
              key={`${s.lat}_${s.lon}_${i}`}
              role="option"
              className="cursor-pointer px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
              onClick={() => choose(s)}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
      {loading && <p className="mt-1 text-xs text-gray-500">Searching addresses…</p>}
    </div>
  );
}
