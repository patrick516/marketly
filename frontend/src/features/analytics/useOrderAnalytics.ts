import { useEffect, useMemo, useState } from "react";
import { getOrders } from "@/lib/api";
import type { Order } from "@/lib/api";

export type Period = "all" | "year" | "month";

export interface DailySales {
  day: string;
  sales: number;
}

export interface ProductSales {
  name: string;
  quantity: number;
  revenue: number;
}

function isInPeriod(dateStr: string, period: Period) {
  const date = new Date(dateStr);
  const now = new Date();
  if (period === "all") return true;
  if (period === "year") return date.getFullYear() === now.getFullYear();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth()
  );
}

export function useOrderAnalytics(period: Period = "all") {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setAllOrders)
      .finally(() => setLoading(false));
  }, []);

  const orders = useMemo(
    () =>
      allOrders
        .filter((o) => isInPeriod(o.createdAt, period))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [allOrders, period],
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalUnitsSold = orders.reduce((sum, o) => sum + o.quantity, 0);

  const last7Days: DailySales[] = useMemo(() => {
    const days: DailySales[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString(undefined, { weekday: "short" });
      const dayTotal = allOrders
        .filter(
          (o) => new Date(o.createdAt).toDateString() === date.toDateString(),
        )
        .reduce((sum, o) => sum + o.total, 0);
      days.push({ day: label, sales: dayTotal });
    }
    return days;
  }, [allOrders]);

  const productSales: ProductSales[] = useMemo(() => {
    const map = new Map<string, ProductSales>();
    for (const o of orders) {
      const existing = map.get(o.productName);
      if (existing) {
        existing.quantity += o.quantity;
        existing.revenue += o.total;
      } else {
        map.set(o.productName, {
          name: o.productName,
          quantity: o.quantity,
          revenue: o.total,
        });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue);
  }, [orders]);

  return {
    loading,
    orders,
    totalRevenue,
    totalOrders,
    totalUnitsSold,
    last7Days,
    productSales,
  };
}
