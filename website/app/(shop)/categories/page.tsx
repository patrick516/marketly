import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          All Categories
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex flex-col items-center gap-2 rounded-2xl border bg-white p-6 text-center shadow-card hover:shadow-soft transition"
            >
              <span className="text-sm font-medium text-ink">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
