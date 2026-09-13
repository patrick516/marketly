import axios from "axios";

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

export interface StoreSettings {
  whatsappNumber: string;
  storeName: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
  customerName: string;
  customerPhone?: string;
  createdAt: string;
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

export async function getSettings(): Promise<StoreSettings> {
  const { data } = await client.get<StoreSettings>("/settings");
  return data;
}

export async function updateSettings(
  changes: Partial<StoreSettings>,
): Promise<StoreSettings> {
  const { data } = await client.patch<StoreSettings>("/settings", changes);
  return data;
}

export async function getOrders(): Promise<Order[]> {
  const { data } = await client.get<Order[]>("/orders");
  return data;
}

export async function createOrder(
  order: Omit<Order, "id" | "createdAt">,
): Promise<Order> {
  const { data } = await client.post<Order>("/orders", order);
  return data;
}
