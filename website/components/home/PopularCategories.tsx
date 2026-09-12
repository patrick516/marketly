import Link from "next/link";
import { Shirt, Headphones, Sofa, Sparkles, Watch } from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Shirt: <Shirt className="h-5 w-5" />,
  Headphones: <Headphones className="h-5 w-5" />,
  Sofa: <Sofa className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Watch: <Watch className="h-5 w-5" />,
};

export default function PopularCategories() {
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-ink">
            Popular Categories
          </h2>
        </div>

        {/* Horizontal scroll on mobile + normal grid on desktop */}
        <div className="flex md:grid md:grid-cols-5 gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex-shrink-0 w-[110px] md:w-auto flex flex-col items-center justify-center gap-2 rounded-xl border bg-white p-4 shadow-card hover:shadow-soft hover:border-brand-200 transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 group-hover:bg-brand-100 transition">
                {iconMap[cat.icon]}
              </div>
              <span className="text-xs font-medium text-ink group-hover:text-brand-700 text-center leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
