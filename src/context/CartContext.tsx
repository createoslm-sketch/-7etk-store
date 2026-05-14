import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  total: number;
  isOpen: boolean;
  promoCode: string;
  discount: number;
  applyPromoCode: (code: string) => boolean;
  clearPromoCode: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const PROMO_CODE = "!7etk?";
export const PROMO_DISCOUNT = 0.1;

const STORAGE_KEY = "7etk-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      const p = localStorage.getItem(STORAGE_KEY + ":promo");
      if (p) setPromoCode(p);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    localStorage.setItem(STORAGE_KEY + ":promo", promoCode);
  }, [items, promoCode, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);
    const isValidPromo = promoCode === PROMO_CODE;
    const discount = isValidPromo ? +(subtotal * PROMO_DISCOUNT).toFixed(2) : 0;
    const total = +(subtotal - discount).toFixed(2);
    return {
      items,
      count,
      subtotal,
      total,
      isOpen,
      promoCode: isValidPromo ? promoCode : "",
      discount,
      applyPromoCode: (code: string) => {
        if (code.trim() === PROMO_CODE) {
          setPromoCode(PROMO_CODE);
          return true;
        }
        setPromoCode("");
        return false;
      },
      clearPromoCode: () => setPromoCode(""),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((o) => !o),
      addItem: (product) =>
        setItems((prev) => {
          const existing = prev.find((i) => i.product.id === product.id);
          if (existing) {
            return prev.map((i) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
            );
          }
          return [...prev, { product, quantity: 1 }];
        }),
      removeItem: (productId) =>
        setItems((prev) => prev.filter((i) => i.product.id !== productId)),
      updateQuantity: (productId, quantity) =>
        setItems((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.product.id !== productId)
            : prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
        ),
      clearCart: () => {
        setItems([]);
        setPromoCode("");
      },
    };
  }, [items, isOpen, promoCode]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
