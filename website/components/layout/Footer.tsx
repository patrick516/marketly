import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-12 md:mt-16">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Brand */}
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white font-bold text-sm">
                M
              </div>
              <span className="text-xl font-bold text-brand-700">Marketly</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Discover great products from trusted sellers. Quality, style and
              value in one place.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-ink mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <Link href="/products" className="hover:text-brand-700">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-brand-700">
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=deals"
                  className="hover:text-brand-700"
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=new"
                  className="hover:text-brand-700"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          {/* <div>
            <h4 className="font-semibold text-ink mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <Link href="/login" className="hover:text-brand-700">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-brand-700">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-brand-700">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-brand-700">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Support */}
          <div>
            <h4 className="font-semibold text-ink mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <Link href="/contact" className="hover:text-brand-700">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-700">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-700">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-brand-700">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-10 pt-6 flex flex-col items-center gap-3 text-sm text-ink-muted text-center">
          <p>© {new Date().getFullYear()} Marketly. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brand-700">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-brand-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
