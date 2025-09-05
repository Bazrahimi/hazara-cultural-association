"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { CartAction, CartItem, CartState, Ctx } from "../../lib/definitions";

const initial: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ADD": {
      const qty = Math.max(1, action.payload.qty ?? 1);
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
    const add = (p: CartItem) => dispatch({ type: "ADD", payload: p });
    const remove = (id: number) =>
      dispatch({ type: "REMOVE", payload: { id } });
    const updateQty = (id: number, qty: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
    const clear = () => dispatch({ type: "CLEAR" });

    const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce(
      (s, i) => s + i.qty * (i.priceCents + i.postageCents),
      0
    );

    return { ...state, add, remove, updateQty, clear, totalItems, subtotal };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
