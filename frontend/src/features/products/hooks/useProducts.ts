import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/api";
import type { Product } from "@/lib/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setProducts(await getProducts());
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addProduct(product: Omit<Product, "id">) {
    try {
      const created = await createProduct(product);
      setProducts((prev) => [...prev, created]);
      toast.success("Product added");
    } catch {
      toast.error("Failed to add product");
    }
  }

  async function editProduct(id: string, changes: Partial<Product>) {
    try {
      const updated = await updateProduct(id, changes);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      toast.success("Product updated");
    } catch {
      toast.error("Failed to update product");
    }
  }

  async function removeProduct(id: string) {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  }

  return { products, loading, addProduct, editProduct, removeProduct };
}
