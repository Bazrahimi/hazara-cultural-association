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
export const emptyContact: Contact = { firstName: "", lastName: "", phone: "" };

export const isNonEmpty = (s?: string) => !!s && s.trim().length > 0;
export const isPostcode = (s?: string) => !!s && /^\d{4}$/.test(s);
export const postalLabelFromFull = (a: FullAddress) => {
  const suburb = a.suburb?.toUpperCase() || "";
  const state = a.stateCode || a.state || "";
  const tail = [suburb, state, a.postcode].filter(Boolean).join(" ").trim();
  return a.address && tail ? `${a.address}, ${tail}` : a.address || "";
};
