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
  onConfirm: (productId: string, newStock: number) => void;
}

export default function StockAdjustDialog({
  product,
  onClose,
  onConfirm,
}: StockAdjustDialogProps) {
  const [quantitySold, setQuantitySold] = useState(1);

  if (!product) return null;

  const newStock = Math.max(0, product.stock - quantitySold);

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Record a sale</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-ink-muted">
          {product.name} — currently <strong>{product.stock}</strong> in stock.
          Enter how many were sold, based on your WhatsApp chat with the buyer.
        </p>

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

        <DialogFooter>
          <Button variant="outline" className="rounded-xl" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-coral-500 hover:bg-coral-600 text-white"
            onClick={() => onConfirm(product.id, newStock)}
          >
            Update stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
