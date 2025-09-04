import { ParsedAuAddress } from "../cart/checkout/ui/AuAddressAutocomplete";
export type ProductRecord = {
  id: number;
  slug: string;
  title: string;
  descriptionHtml: string;
  priceCents: number;
  postageCents: number;
  category: string;
  origin?: string;
  mainImgPath: string;
  otherImgPath: string[];
  createdAt: string;
};

export type Product = Pick<
  ProductRecord,
  "id" | "slug" | "title" | "mainImgPath" | "priceCents" | "postageCents"
>;

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

export type Contact = { fullName: string; phone: string };
