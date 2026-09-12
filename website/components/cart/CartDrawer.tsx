"use client";

import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartDrawer() {
  const { items, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-ink">Your Cart</h2>
          <button
            onClick={closeCart}
            className="text-ink-muted hover:text-coral-500 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-ink-muted gap-2">
              <ShoppingBag className="h-10 w-10" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4">
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
}
