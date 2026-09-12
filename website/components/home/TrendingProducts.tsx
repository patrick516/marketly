import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { trendingProducts } from "@/lib/data";

export default function TrendingProducts() {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-5 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-ink">
            Trending Products
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-brand-700 hover:text-coral-500 transition"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
