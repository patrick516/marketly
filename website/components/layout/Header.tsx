"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white font-bold text-sm">
              M
            </div>
            <span className="text-xl font-bold text-brand-700 tracking-tight">
              Marketly
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ink">
            <Link
              href="/categories"
              className="hover:text-brand-700 transition"
            >
              Categories
            </Link>
            <Link
              href="/products?filter=deals"
              className="hover:text-brand-700 transition"
            >
              Deals
            </Link>
            <Link
              href="/products?filter=new"
              className="hover:text-brand-700 transition"
            >
              New Arrivals
            </Link>
            <Link
              href="/products?filter=brands"
              className="hover:text-brand-700 transition"
            >
              Brands
            </Link>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <Input
                placeholder="Search for products, brands and more..."
                className="pl-10 bg-surface-muted border-0 focus-visible:ring-brand-700"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2 border-brand-200 text-brand-700 hover:bg-brand-50"
            >
              <User className="h-4 w-4" />
              Login
            </Button>
          </div>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
