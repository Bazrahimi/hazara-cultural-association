import { ParsedAuAddress } from "../cart/checkout/ui/AuAddressAutocomplete";

export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
};

export type CartItem = Product & { qty: number };
export type CartState = { items: CartItem[] };

export type Ctx = CartState & {
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

export type FullAddress = Pick<
  ParsedAuAddress,
  | "full"
  | "address"
  | "address2"
  | "suburb"
  | "state"
  | "stateCode"
  | "postcode"
>;

export type Contact = { firstName: string; lastName: string; phone: string };
