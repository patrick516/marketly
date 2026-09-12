import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { heroImage } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-ink leading-[1.15]">
              Find something{" "}
              <span className="text-coral-500">you’ll love.</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed">
              Discover curated products from trusted sellers.
              <br className="hidden sm:block" />
              Quality, style, and value — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-coral-500 hover:bg-coral-600 text-white rounded-full px-8 h-12 text-base font-semibold shadow-soft"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Trust stats */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6">
              <div>
                <p className="text-xl md:text-2xl font-bold text-ink">10k+</p>
                <p className="text-xs md:text-sm text-ink-muted">
                  Happy customers
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-ink">500+</p>
                <p className="text-xs md:text-sm text-ink-muted">
                  Trusted sellers
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-ink">4.8★</p>
                <p className="text-xs md:text-sm text-ink-muted">
                  Average rating
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg">
              <img
                src={heroImage}
                alt="Featured handbag"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
