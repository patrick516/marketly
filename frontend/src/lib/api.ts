import axios from "axios";

// TODO: swap this for the real backend URL once it exists — nothing else changes
const API_URL = "http://localhost:4000";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  category: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

const client = axios.create({ baseURL: API_URL });

export async function getProducts(): Promise<Product[]> {
  const { data } = await client.get<Product[]>("/products");
  return data;
}

export async function createProduct(
  product: Omit<Product, "id">,
): Promise<Product> {
  const { data } = await client.post<Product>("/products", product);
  return data;
}

export async function updateProduct(
  id: string,
  product: Partial<Product>,
): Promise<Product> {
  const { data } = await client.patch<Product>(`/products/${id}`, product);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  await client.delete(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await client.get<Category[]>("/categories");
  return data;
}

export async function createCategory(
  category: Omit<Category, "id">,
): Promise<Category> {
  const { data } = await client.post<Category>("/categories", category);
  return data;
}
