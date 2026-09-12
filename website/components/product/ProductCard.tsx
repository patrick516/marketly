"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { useCart } from "@/store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, quantity);
    setQuantity(1);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-card hover:shadow-soft transition-all duration-300">
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-2 left-2 z-10 rounded-full bg-coral-500 px-2 py-0.5 text-[10px] md:text-xs font-bold text-white">
          -{product.discount}%
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink-muted hover:text-coral-500 transition opacity-0 group-hover:opacity-100">
        <Heart className="h-3.5 w-3.5" />
      </button>

      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-surface-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 md:p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm md:text-base font-medium text-ink line-clamp-1 hover:text-brand-700 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1 text-xs md:text-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="font-medium text-ink">{product.rating}</span>
          <span className="text-ink-muted">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="text-base md:text-lg font-bold text-coral-500">
            MK {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-ink-muted line-through">
              MK {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quantity + Add to Cart */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center rounded-lg border shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuantity((q) => Math.max(1, q - 1));
              }}
              className="flex h-9 w-7 items-center justify-center text-ink-muted hover:text-brand-700"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-xs md:text-sm font-medium w-5 text-center">
              {quantity}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setQuantity((q) => q + 1);
              }}
              className="flex h-9 w-7 items-center justify-center text-ink-muted hover:text-brand-700"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-coral-500 hover:bg-coral-600 text-white rounded-lg h-9 text-xs md:text-sm font-medium"
            size="sm"
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
