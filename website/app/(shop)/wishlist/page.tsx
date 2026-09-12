"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          My Wishlist
        </h1>

        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-ink-muted bg-white rounded-2xl border shadow-card">
          <Heart className="h-10 w-10" />
          <p>Your wishlist is empty.</p>
          <Link href="/" className="text-brand-700 font-medium hover:underline">
            Start browsing
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
