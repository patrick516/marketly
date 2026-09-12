"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-ink-muted">
            <ShoppingBag className="h-12 w-12" />
            <p>Your cart is empty</p>
            <Link
              href="/"
              className="text-brand-700 font-medium hover:underline"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border shadow-card p-4 md:p-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <CartSummary />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
