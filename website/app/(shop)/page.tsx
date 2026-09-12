import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import PopularCategories from "@/components/home/PopularCategories";
import TrendingProducts from "@/components/home/TrendingProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PopularCategories />
        <TrendingProducts />
      </main>
      <Footer />
    </div>
  );
}
