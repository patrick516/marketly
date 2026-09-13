import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DollarSign, ShoppingCart, Package, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrderAnalytics } from "@/features/analytics/useOrderAnalytics";
import type { Period } from "@/features/analytics/useOrderAnalytics";
import { exportAnalyticsPdf } from "@/features/analytics/pdfExport";
import { getSettings } from "@/lib/api";

const periodLabels: Record<Period, string> = {
  all: "All time",
  year: "This year",
  month: "This month",
};

export default function Analytics() {
  const [period, setPeriod] = useState<Period>("all");
  const {
    loading,
    orders,
    totalRevenue,
    totalOrders,
    totalUnitsSold,
    last7Days,
    productSales,
  } = useOrderAnalytics(period);

  const stats = [
    {
      label: "Total Revenue",
      value: `MK ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart },
    { label: "Units Sold", value: totalUnitsSold, icon: Package },
  ];

  async function handleExport() {
    const settings = await getSettings();
    exportAnalyticsPdf({
      periodLabel: periodLabels[period],
      storeName: settings.storeName,
      totalRevenue,
      totalOrders,
      totalUnitsSold,
      productSales,
      orders,
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Analytics</h1>
          <p className="text-ink-muted text-sm mt-1">
            Based on orders you've recorded.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="rounded-xl w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="rounded-xl gap-1.5"
            onClick={handleExport}
            disabled={loading || totalOrders === 0}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : totalOrders === 0 ? (
        <div className="text-center py-16 text-ink-muted bg-white rounded-2xl border shadow-card">
          <p>No sales recorded for this period yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <CardTitle className="text-base">Revenue — last 7 days</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f8" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) =>
                      `MK ${Number(value).toLocaleString()}`
                    }
                  />
                  <Bar dataKey="sales" fill="#FF6B4A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Best Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productSales.map((p, i) => (
                      <TableRow key={p.name}>
                        <TableCell className="font-medium text-ink-muted">
                          #{i + 1}
                        </TableCell>
                        <TableCell className="font-medium text-ink">
                          {p.name}
                        </TableCell>
                        <TableCell>{p.quantity}</TableCell>
                        <TableCell className="font-semibold text-coral-500">
                          MK {p.revenue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Sales History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="text-ink-muted">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{o.customerName}</TableCell>
                        <TableCell>{o.productName}</TableCell>
                        <TableCell>{o.quantity}</TableCell>
                        <TableCell className="font-semibold text-coral-500">
                          MK {o.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
