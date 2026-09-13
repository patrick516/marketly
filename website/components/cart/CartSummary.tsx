"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/api";

export default function CartSummary() {
  const { items, totalPrice, totalItems } = useCart();
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    getSettings().then((s) => setWhatsappNumber(s.whatsappNumber));
  }, []);

  function handleProceed() {
    if (items.length === 0 || !whatsappNumber) return;

    const lines = items.map(
      (item, index) =>
        `${index + 1}. ${item.name} x${item.quantity} - MK ${item.price.toLocaleString()} each = MK ${(item.price * item.quantity).toLocaleString()}`,
    );

    const message = [
      "Hello, I'd like to order the following:",
      "",
      ...lines,
      "",
      `Total items: ${totalItems}`,
      `Grand Total: MK ${totalPrice.toLocaleString()}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="border-t pt-4 mt-2">
      <div className="flex items-center justify-between mb-4">
        <span className="text-ink-muted">Subtotal ({totalItems} items)</span>
        <span className="text-lg font-bold text-ink">
          MK {totalPrice.toLocaleString()}
        </span>
      </div>

      <Button
        onClick={handleProceed}
        disabled={items.length === 0}
        className="w-full bg-coral-500 hover:bg-coral-600 text-white h-12 rounded-xl font-semibold"
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        Proceed via WhatsApp
      </Button>
    </div>
  );
}
