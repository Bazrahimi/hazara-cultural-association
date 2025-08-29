export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
};

type CartItem = Product & { qty: number };
export type CartState = { items: CartItem[] };

export type Ctx = CartState & {
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};
