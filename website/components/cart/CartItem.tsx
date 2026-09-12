"use client";

import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/store/cart";
import type { CartItem as CartItemType } from "@/store/cart";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-3 py-3 border-b last:border-0">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-ink line-clamp-2">
            {item.name}
          </p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-ink-muted hover:text-coral-500 transition shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2 rounded-lg border">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center text-ink-muted hover:text-brand-700"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-sm font-medium w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center text-ink-muted hover:text-brand-700"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <span className="text-sm font-bold text-coral-500">
            MK {(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
