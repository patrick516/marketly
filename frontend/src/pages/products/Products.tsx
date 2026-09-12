import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductTable from "@/features/products/ProductTable";
import ProductForm from "@/features/products/ProductForm";
import type { ProductFormValues } from "@/features/products/ProductForm";
import StockAdjustDialog from "@/features/products/StockAdjustDialog";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { Product, Category } from "@/lib/api";
import { getCategories } from "@/lib/api";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Products() {
  const { products, loading, addProduct, editProduct, removeProduct } =
    useProducts();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(
    null,
  );

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  function openAddForm() {
    setEditingProduct(null);
    setFormOpen(true);
  }

  function openEditForm(product: Product) {
    setEditingProduct(product);
    setFormOpen(true);
  }

  function handleSubmit(values: ProductFormValues) {
    if (editingProduct) {
      editProduct(editingProduct.id, values);
    } else {
      addProduct({
        ...values,
        slug: slugify(values.name),
        rating: 0,
        reviewCount: 0,
      });
    }
    setFormOpen(false);
  }

  function handleDelete(product: Product) {
    if (confirm(`Delete "${product.name}"? This can't be undone.`)) {
      removeProduct(product.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Products</h1>
          <p className="text-ink-muted text-sm mt-1">
            Manage what's listed on your store.
          </p>
        </div>
        <Button
          className="rounded-xl bg-coral-500 hover:bg-coral-600 text-white gap-1.5"
          onClick={openAddForm}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-ink-muted">Loading products…</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={openEditForm}
          onDelete={handleDelete}
          onAdjustStock={setAdjustingProduct}
        />
      )}

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit product" : "Add product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            categories={categories}
            initialValues={editingProduct ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <StockAdjustDialog
        product={adjustingProduct}
        onClose={() => setAdjustingProduct(null)}
        onConfirm={(id, newStock) => {
          editProduct(id, { stock: newStock });
          setAdjustingProduct(null);
        }}
      />
    </div>
  );
}
