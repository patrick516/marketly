"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { useCart } from "@/store/cart";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    addItem(product, quantity);
    setQuantity(1);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-xl border h-12">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-full w-10 items-center justify-center text-ink-muted hover:text-brand-700"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="flex h-full w-10 items-center justify-center text-ink-muted hover:text-brand-700"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <Button
        onClick={handleAdd}
        size="lg"
        className="flex-1 bg-coral-500 hover:bg-coral-600 text-white h-12 rounded-xl font-semibold"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}
