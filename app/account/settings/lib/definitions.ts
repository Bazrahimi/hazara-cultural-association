export type ProfileRecord = {
  firstName: string | null;
  lastName: string | null;
  contactNumber: string | null;

}

export type AddressRecord = {
  id: number;
  label: string | null;
  type: "shipping" | "billing";
  is_default: boolean;
  address: string;
  address2: string | null;
  suburb: string;
  stateCode: string;
  postcode: string;
  country: string;
};