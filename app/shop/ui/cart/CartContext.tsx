"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { CartState, Product } from "../../lib/definitions";

type Action =
  | { type: "HYDRATE"; payload: CartState }
  | { type: "ADD"; payload: Product; qty?: number }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; qty: number } }
  | { type: "CLEAR" };

const initial: CartState = { items: [] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ADD": {
      const qty = Math.max(1, action.qty ?? 1);
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], qty: items[idx].qty + qty };
        return { items };
      }
      return { items: [...state.items, { ...action.payload, qty }] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.payload.id) };

    case "UPDATE_QTY":
      return {
        items: state.items
          .map((i) =>
            i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
          )
          .filter((i) => i.qty > 0),
      };

    case "CLEAR":
      return initial;

    default:
      return state;
  }
}

type Ctx = CartState & {
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("hca_cart");
      if (raw)
        dispatch({ type: "HYDRATE", payload: JSON.parse(raw) as CartState });
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("hca_cart", JSON.stringify(state));
    } catch {}
  }, [state]);

  const value = useMemo<Ctx>(() => {
    const add = (p: Product, qty?: number) =>
      dispatch({ type: "ADD", payload: p, qty });
    const remove = (id: string) =>
      dispatch({ type: "REMOVE", payload: { id } });
    const updateQty = (id: string, qty: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
    const clear = () => dispatch({ type: "CLEAR" });

    const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce((s, i) => s + i.qty * i.price, 0);

    return { ...state, add, remove, updateQty, clear, totalItems, subtotal };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
