// import { AddressRecord } from "./definitions";
import { AddressRecord } from "./definitions";
export const addressToLines = (a: AddressRecord) => {
  const line1 = a.address;
  const line2 = a.address2;
  const line3 = `${a.suburb} ${a.stateCode} ${a.postcode}`.trim();
  const line4 = a.country.toUpperCase();
  return [line1, line2, line3, line4].filter(Boolean) as string[];
};
