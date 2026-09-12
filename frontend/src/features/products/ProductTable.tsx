import { Pencil, Trash2, MinusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
}

function stockBadge(stock: number) {
  const safeStock = stock ?? 0;
  if (safeStock === 0) return "bg-status-rejected text-status-rejected-text";
  if (safeStock <= 5) return "bg-status-pending text-status-pending-text";
  return "bg-status-approved text-status-approved-text";
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onAdjustStock,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-ink-muted">
        <p>No products yet. Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <span className="font-medium text-ink">{product.name}</span>
                </div>
              </TableCell>
              <TableCell className="capitalize text-ink-muted">
                {product.category}
              </TableCell>
              <TableCell className="font-semibold text-coral-500">
                MK {product.price.toLocaleString()}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${stockBadge(
                    product.stock ?? 0,
                  )}`}
                >
                  {(product.stock ?? 0) === 0
                    ? "Out of stock"
                    : `${product.stock ?? 0} left`}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-xl h-8 w-8"
                    onClick={() => onAdjustStock(product)}
                    title="Record a sale"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-xl h-8 w-8"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-xl h-8 w-8 text-coral-600 hover:text-coral-700"
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
