import { ParsedAuAddress } from "../cart/checkout/ui/AuAddressAutocomplete";
export type ProductRecord = {
  id: number;
  userId: number;
  slug: string;
  title: string;
  descriptionHtml: string;
  priceCents: number;
  postageCents: number;
  category: string;
  origin?: string;
  mainImgPath: string;
  otherImgPaths: string[];
  createdAt: string;
};

export type ProductHead = Pick<
  ProductRecord,
  "id" | "slug" | "title" | "mainImgPath" | "priceCents" | "postageCents"
>;
export type ProductDetailsData = ProductRecord & { sellerFullName: string };
export type CartItem = ProductHead & { qty: number };
export type CartState = { items: CartItem[] };

export type CartAction =
  | { type: "HYDRATE"; payload: CartState }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: number } }
  | { type: "UPDATE_QTY"; payload: { id: number; qty: number } }
  | { type: "CLEAR" };

export type Ctx = CartState & {
  add: (p: CartItem) => void;
  remove: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
  postageTotal: number;
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
