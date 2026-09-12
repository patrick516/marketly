"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export default function AddressesPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-ink">My Addresses</h1>
          <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-xl gap-1.5">
            <Plus className="h-4 w-4" />
            Add Address
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-ink-muted bg-white rounded-2xl border shadow-card">
          <MapPin className="h-10 w-10" />
          <p>You haven&apos;t added any addresses yet.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
