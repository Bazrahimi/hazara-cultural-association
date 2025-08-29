export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
};

export type CartItem = Product & { qty: number };