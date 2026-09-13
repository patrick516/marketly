import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/lib/api";

interface StockAdjustDialogProps {
  product: Product | null;
  onClose: () => void;
  onConfirm: (data: {
    productId: string;
    newStock: number;
    quantitySold: number;
    customerName: string;
    customerPhone: string;
  }) => void;
}

export default function StockAdjustDialog({
  product,
  onClose,
  onConfirm,
}: StockAdjustDialogProps) {
  const [quantitySold, setQuantitySold] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  if (!product) return null;

  const newStock = Math.max(0, product.stock - quantitySold);

  function handleConfirm() {
    if (!product) return;
    onConfirm({
      productId: product.id,
      newStock,
      quantitySold,
      customerName: customerName.trim() || "Unknown customer",
      customerPhone: customerPhone.trim(),
    });
    setQuantitySold(1);
    setCustomerName("");
    setCustomerPhone("");
  }

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Record a sale</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-ink-muted">
          {product.name} — currently <strong>{product.stock}</strong> in stock.
          Enter the sale details from your WhatsApp chat with the buyer.
        </p>

        <div className="space-y-3">
          <div>
            <Label htmlFor="quantitySold">Quantity sold</Label>
            <Input
              id="quantitySold"
              type="number"
              min={1}
              max={product.stock}
              className="rounded-xl mt-1"
              value={quantitySold}
              onChange={(e) => setQuantitySold(Number(e.target.value))}
            />
            <p className="text-xs text-ink-muted mt-1">
              Stock will become {newStock} after this update.
            </p>
          </div>

          <div>
            <Label htmlFor="customerName">Customer name</Label>
            <Input
              id="customerName"
              className="rounded-xl mt-1"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Chisomo Banda"
            />
          </div>

          <div>
            <Label htmlFor="customerPhone">Customer phone (optional)</Label>
            <Input
              id="customerPhone"
              className="rounded-xl mt-1"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 0888123456"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-coral-500 hover:bg-coral-600 text-white"
            onClick={handleConfirm}
          >
            Update stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
