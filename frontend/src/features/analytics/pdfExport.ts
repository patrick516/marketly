import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Order } from "../../lib/api";
import type { ProductSales } from "./useOrderAnalytics";

interface ExportReportParams {
  periodLabel: string;
  storeName: string;
  totalRevenue: number;
  totalOrders: number;
  totalUnitsSold: number;
  productSales: ProductSales[];
  orders: Order[];
}

export function exportAnalyticsPdf({
  periodLabel,
  storeName,
  totalRevenue,
  totalOrders,
  totalUnitsSold,
  productSales,
  orders,
}: ExportReportParams) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(30, 58, 95);
  doc.text(`${storeName} — Sales Report`, 14, 18);

  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Period: ${periodLabel}`, 14, 26);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 32);

  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(`Total Revenue: MK ${totalRevenue.toLocaleString()}`, 14, 44);
  doc.text(`Total Orders: ${totalOrders}`, 14, 51);
  doc.text(`Units Sold: ${totalUnitsSold}`, 14, 58);

  autoTable(doc, {
    startY: 66,
    head: [["Product", "Quantity Sold", "Revenue (MK)"]],
    body: productSales.map((p) => [
      p.name,
      p.quantity.toString(),
      p.revenue.toLocaleString(),
    ]),
    headStyles: { fillColor: [30, 58, 95] },
    styles: { fontSize: 10 },
  });

  const afterProductsY = (doc as any).lastAutoTable.finalY + 12;

  doc.setFontSize(13);
  doc.setTextColor(30, 58, 95);
  doc.text("Order History", 14, afterProductsY);

  autoTable(doc, {
    startY: afterProductsY + 4,
    head: [["Date", "Customer", "Product", "Qty", "Total (MK)"]],
    body: orders.map((o) => [
      new Date(o.createdAt).toLocaleDateString(),
      o.customerName,
      o.productName,
      o.quantity.toString(),
      o.total.toLocaleString(),
    ]),
    headStyles: { fillColor: [255, 107, 74] },
    styles: { fontSize: 9 },
  });

  doc.save(
    `sales-report-${periodLabel.toLowerCase().replace(/\s+/g, "-")}.pdf`,
  );
}
