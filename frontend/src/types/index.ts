export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  badge: string;
  features: string[];
  category: string;
  status: "Active" | "Inactive";
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  price: number;
  status: "Active" | "Inactive";
  image: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied";
  reply: string;
  repliedAt: string;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalServices: number;
  totalMessages: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  icon: string;
  badge: string;
  features: string[];
  category: string;
  status: "Active" | "Inactive";
}

export interface ServiceFormData {
  name: string;
  description: string;
  icon: string;
  category: string;
  price: number;
  status: "Active" | "Inactive";
}

export interface MessageFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ReplyFormData {
  reply: string;
}
