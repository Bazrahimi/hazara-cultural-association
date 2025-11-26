import type { Contact, FullAddress } from "./definitions";
export const ADDRESS_KEY = "hca_shipping_address";
export const CONTACT_KEY = "hca_shipping_contact";

export const emptyAddress: FullAddress = {
  full: "",
  address: "",
  address2: "",
  suburb: "",
  state: "",
  stateCode: "",
  postcode: "",
};
export const emptyContact: Contact = { fullName: "", phone: "" };

export const isNonEmpty = (s?: string) => !!s && s.trim().length > 0;
export const isPostcode = (s?: string) => !!s && /^\d{4}$/.test(s);
export const postalLabelFromFull = (a: FullAddress) => {
  const suburb = a.suburb?.toUpperCase() || "";
  const state = a.stateCode || a.state || "";
  const tail = [suburb, state, a.postcode].filter(Boolean).join(" ").trim();
  return a.address && tail ? `${a.address}, ${tail}` : a.address || "";
};

export function isAddressComplete(a: FullAddress) {
  const stateLike = (a.stateCode || a.state || "").trim();
  return (
    isNonEmpty(a.address) &&
    isNonEmpty(a.suburb) &&
    isNonEmpty(stateLike) &&
    isPostcode(a.postcode)
  );
}


// Convert a string into a URL-friendly slug.
// - Convert all characters to lowercase.
// - Remove all non-word characters exception whitespace and hyphens.
// - replace one or more whitespaces characters with a single hyphen.
// export const slugify = (str: string) =>
//   str
//     .normalize("NFKD") // split accents from letters
//     .replace(/[\u0300-\u036f]/g, "") // remove the accents
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "") // keep letters, numbers, spaces, hyphens
//     .trim() // remove leading/trailing spaces
//     .replace(/\s+/g, "-") // spaces -> single dash
//     .replace(/-+/g, "-") // collapse multiple dashes
//     .replace(/^-|-$/g, ""); // trim leading/trailing dashes

export const unSlugify = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());


export const slugify = (str: string) =>
  str
    .normalize("NFKD")
    // Keep English letters, Persian letters, numbers, and spaces
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
