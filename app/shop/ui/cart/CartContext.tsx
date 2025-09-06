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

export function CartProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: number;
}) {
  const [state, dispatch] = useReducer(reducer, initial);

  // Pick a storage key based on auth state
  const STORAGE_KEY = userId ? `hca_cart_u_${userId}` : "hca_cart_guest";

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw)
        dispatch({ type: "HYDRATE", payload: JSON.parse(raw) as CartState });
    } catch {}
  }, [STORAGE_KEY]);

  // merge guest → user on first login in this tab
  useEffect(() => {
    if (!userId) return;
    try {
      const mergeFlag = sessionStorage.getItem("hca_merged_cart") === "1";
      if (mergeFlag) return;

      const guestRaw = localStorage.getItem("hca_cart_guest");
      if (!guestRaw) return;

      const guest = JSON.parse(guestRaw) as CartState;
      if (!guest?.items?.length) return;

      const currentRaw = localStorage.getItem(STORAGE_KEY);
      const current = currentRaw
        ? (JSON.parse(currentRaw) as CartState)
        : initial;

      const merged = { items: mergeItems(current.items, guest.items) };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      localStorage.removeItem("hca_cart_guest");
      sessionStorage.setItem("hca_merged_cart", "1");
      dispatch({ type: "HYDRATE", payload: merged });
    } catch {}
  }, [userId, STORAGE_KEY]);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, STORAGE_KEY]);

  const value = useMemo<Ctx>(() => {
    const add = (p: CartItem) => dispatch({ type: "ADD", payload: p });
    const remove = (id: number) =>
      dispatch({ type: "REMOVE", payload: { id } });
    const updateQty = (id: number, qty: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
    const clear = () => dispatch({ type: "CLEAR" });

    const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce(
      (s, i) => s + (i.qty * i.priceCents) / 100,
      0
    );

    const postageTotal = state.items.reduce(
      (p, i) => p + (i.qty * i.postageCents) / 100,
      0
    );

    return {
      ...state,
      add,
      remove,
      updateQty,
      clear,
      totalItems,
      subtotal,
      postageTotal,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function mergeItems(a: CartItem[], b: CartItem[]) {
  // if your id is string, change Map<number,...> → Map<string,...>
  const map = new Map<number, CartItem>();
  for (const it of [...a, ...b]) {
    const prev = map.get(it.id as number);
    if (prev) {
      map.set(it.id as number, { ...prev, qty: prev.qty + it.qty });
    } else {
      map.set(it.id as number, { ...it });
    }
  }
  return [...map.values()];
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
