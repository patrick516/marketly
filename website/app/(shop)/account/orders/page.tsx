"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClipboardList } from "lucide-react";

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          Order History
        </h1>

        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-ink-muted bg-white rounded-2xl border shadow-card">
          <ClipboardList className="h-10 w-10" />
          <p>
            No orders yet. Orders placed via WhatsApp aren&apos;t tracked here
            yet.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
