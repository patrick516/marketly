import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AddToCartButton from "@/components/product/AddToCartButton";
import { trendingProducts } from "@/lib/data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = trendingProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-white border shadow-card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm text-ink-muted">{product.category}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-ink mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-ink-muted">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-coral-500">
                MK {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-ink-muted line-through">
                  MK {product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="bg-coral-100 text-coral-700 text-sm font-medium px-2 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>
            <p className="text-ink-muted mb-8 leading-relaxed">
              High-quality product from trusted sellers. Carefully selected for
              style, durability and value. Perfect addition to your collection.
            </p>

            {/* Actions */}

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <AddToCartButton product={product} />

              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-brand-200"
              >
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
