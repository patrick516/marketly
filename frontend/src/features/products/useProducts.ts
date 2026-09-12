import { useState, useEffect } from "react";
import api from "../../lib/api";
import type { Product } from "../../types";
import toast from "react-hot-toast";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: any) => {
    try {
      const { data } = await api.post("/products", productData);
      toast.success("Product created successfully");
      await fetchProducts();
      return data;
    } catch (error) {
      toast.error("Failed to create product");
      throw error;
    }
  };

  const updateProduct = async (id: string, productData: any) => {
    try {
      const { data } = await api.put(`/products/${id}`, productData);
      toast.success("Product updated successfully");
      await fetchProducts();
      return data;
    } catch (error) {
      toast.error("Failed to update product");
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      await fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      throw error;
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products: filteredProducts,
    allProducts: products, // Expose all products for autocomplete
    loading,
    searchTerm,
    setSearchTerm,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts,
  };
};
