import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/api";

// Placeholder until an orders endpoint exists
const salesData = [
  { day: "Mon", sales: 4200 },
  { day: "Tue", sales: 5100 },
  { day: "Wed", sales: 3800 },
  { day: "Thu", sales: 6200 },
  { day: "Fri", sales: 7400 },
  { day: "Sat", sales: 8900 },
  { day: "Sun", sales: 6700 },
];

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: loading ? "…" : products.length,
      icon: Package,
    },
    { label: "Orders", value: "—", icon: ShoppingCart },
    { label: "Revenue", value: "—", icon: DollarSign },
    { label: "Customers", value: "—", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">Welcome back, Admin 👋</h1>
        <p className="text-ink-muted text-sm mt-1">
          Here's what's happening with your marketplace today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="shadow-card">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-muted">{label}</p>
                <p className="text-2xl font-bold text-ink mt-1">{value}</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Sales Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f8" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#FF6B4A"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-ink-muted">Loading…</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-ink-muted">No products yet.</p>
          ) : (
            <div className="space-y-3">
              {products.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-9 w-9 rounded-md object-cover"
                    />
                    <span className="font-medium text-ink">{p.name}</span>
                  </div>
                  <span className="text-coral-500 font-semibold">
                    MK {p.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
