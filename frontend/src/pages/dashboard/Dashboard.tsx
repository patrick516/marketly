import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Package,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Plus,
  ClipboardList,
} from "lucide-react";
import { getProducts, getOrders } from "@/lib/api";
import type { Product, Order } from "@/lib/api";
import { useOrderAnalytics } from "@/features/analytics/useOrderAnalytics";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalRevenue, totalOrders, last7Days } = useOrderAnalytics("month");

  useEffect(() => {
    Promise.all([getProducts(), getOrders()])
      .then(([productsData, ordersData]) => {
        setProducts(productsData);
        setRecentOrders(
          [...ordersData]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, 5),
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const lowStockProducts = products.filter((p) => (p.stock ?? 0) <= 5);

  const stats = [
    {
      label: "This Month's Revenue",
      value: `MK ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    { label: "Orders This Month", value: totalOrders, icon: ShoppingCart },
    {
      label: "Total Products",
      value: loading ? "…" : products.length,
      icon: Package,
    },
    {
      label: "Low Stock Items",
      value: loading ? "…" : lowStockProducts.length,
      icon: AlertTriangle,
      warn: lowStockProducts.length > 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">
            Welcome back, Admin 👋
          </h1>
          <p className="text-ink-muted text-sm mt-1">
            Here's a quick look at how your store is doing this month.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-xl gap-1.5"
            onClick={() => navigate("/orders")}
          >
            <ClipboardList className="h-4 w-4" />
            View Orders
          </Button>
          <Button
            className="rounded-xl bg-coral-500 hover:bg-coral-600 text-white gap-1.5"
            onClick={() => navigate("/products")}
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, warn }) => (
          <Card key={label} className="shadow-card">
            <CardContent className="pt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-muted">{label}</p>
                <p
                  className={`text-2xl font-bold mt-1 ${
                    warn ? "text-status-pending-text" : "text-ink"
                  }`}
                >
                  {value}
                </p>
              </div>
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  warn ? "bg-status-pending" : "bg-brand-50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    warn ? "text-status-pending-text" : "text-brand-700"
                  }`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {lowStockProducts.length > 0 && (
        <Card className="shadow-card border-status-pending">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-status-pending-text" />
              Running low on stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0"
                >
                  <span className="font-medium text-ink">{p.name}</span>
                  <span className="text-status-pending-text font-semibold">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">This Week's Sales</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f8" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => `MK ${Number(value).toLocaleString()}`}
              />
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
          <CardTitle className="text-base">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-ink-muted">Loading…</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-sm text-ink-muted">
              No orders yet. Record a sale from the Products page.
            </p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between text-sm border-b last:border-0 pb-2 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-ink">{order.productName}</p>
                    <p className="text-xs text-ink-muted">
                      {order.customerName} · {order.quantity} unit
                      {order.quantity > 1 ? "s" : ""} ·{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-coral-500 font-semibold">
                    MK {order.total.toLocaleString()}
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
