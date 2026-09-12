import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { User, MapPin, ClipboardList, ChevronRight } from "lucide-react";

const links = [
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/orders", label: "Order History", icon: ClipboardList },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          My Account
        </h1>

        <div className="bg-white rounded-2xl border shadow-card divide-y">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between px-5 py-4 hover:bg-surface-muted transition"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-brand-700" />
                <span className="font-medium text-ink">{label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-ink-muted" />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
