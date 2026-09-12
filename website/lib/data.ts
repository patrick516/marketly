export type Product = {
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
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
};

export const categories: Category[] = [
  {
    id: "1",
    name: "Perfumes",
    slug: "perfumes",
    icon: "Sparkles",
  },
  {
    id: "2",
    name: "Men's Underwear",
    slug: "mens-underwear",
    icon: "Shirt",
  },
  {
    id: "3",
    name: "Women's Underwear",
    slug: "womens-underwear",
    icon: "Heart",
  },
  {
    id: "4",
    name: "Perfume Oils",
    slug: "perfume-oils",
    icon: "Droplets",
  },
  {
    id: "5",
    name: "Gift Sets",
    slug: "gift-sets",
    icon: "Gift",
  },
];

export const trendingProducts: Product[] = [
  {
    id: "1",
    name: "Premium Classic Perfume",
    slug: "premium-classic-perfume",
    price: 45900,
    originalPrice: 54900,
    rating: 4.8,
    reviewCount: 128,
    image:
      "https://images.pexels.com/photos/9202849/pexels-photo-9202849.jpeg?cs=srgb&dl=pexels-isidor-bobinec-94539949-9202849.jpg&fm=jpg",
    discount: 15,
    category: "Perfumes",
  },
  {
    id: "2",
    name: "Luxury Men's Fragrance",
    slug: "luxury-mens-fragrance",
    price: 68500,
    originalPrice: 85000,
    rating: 4.7,
    reviewCount: 96,
    image:
      "https://images.pexels.com/photos/11920479/pexels-photo-11920479.jpeg?cs=srgb&dl=pexels-perfect-lens-11920479.jpg&fm=jpg",
    discount: 20,
    category: "Perfumes",
  },
  {
    id: "3",
    name: "Premium Women's Underwear Set",
    slug: "premium-womens-underwear-set",
    price: 32500,
    originalPrice: 38900,
    rating: 4.6,
    reviewCount: 210,
    image:
      "https://images.pexels.com/photos/11010388/pexels-photo-11010388.jpeg?cs=srgb&dl=pexels-penki-ir-168235916-11010388.jpg&fm=jpg",
    discount: 10,
    category: "Women's Underwear",
  },
  {
    id: "4",
    name: "Everyday Comfort Underwear",
    slug: "everyday-comfort-underwear",
    price: 28900,
    originalPrice: 37500,
    rating: 4.8,
    reviewCount: 74,
    image:
      "https://images.pexels.com/photos/11010389/pexels-photo-11010389.jpeg?cs=srgb&dl=pexels-penki-ir-168235916-11010389.jpg&fm=jpg",
    discount: 25,
    category: "Women's Underwear",
  },
];

export const heroImage =
  "https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?cs=srgb&dl=pexels-bolarinwa-olasunkanmi-114406689-11705153.jpg&fm=jpg";
