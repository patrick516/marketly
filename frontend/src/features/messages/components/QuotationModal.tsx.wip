import React, { useState } from "react";
import { X, Plus, Trash2, Send, Download, Loader2 } from "lucide-react";
import api from "../../../lib/api";
import toast from "react-hot-toast";

interface QuotationItem {
  description: string;
  quantity: number;
  price: number;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
}

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
  onSuccess: () => void;
}

const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  message,
  onSuccess,
}) => {
  const [items, setItems] = useState<QuotationItem[]>([
    { description: "", quantity: 1, price: 0 },
  ]);
  const [formData, setFormData] = useState({
    validUntil: "",
    projectDescription: "",
    vat: 0,
    otherCharges: 0,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, price: 0 }]);

  const removeItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));

  const updateItem = (
    index: number,
    field: keyof QuotationItem,
    value: string | number,
  ) => {
    const updated = [...items];
    (updated[index] as any)[field] = value;
    setItems(updated);
  };

  const calculateSubtotal = () =>
    items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const calculateTotal = () =>
    calculateSubtotal() + formData.vat + formData.otherCharges;

  // Build payload (shared between preview and send)
  const buildPayload = () => ({
    validUntil: formData.validUntil,
    customerId: message!._id,
    customerName: message!.name,
    customerEmail: message!.email,
    customerPhone: message!.phone || "",
    projectDescription: formData.projectDescription,
    items,
    vat: formData.vat,
    otherCharges: formData.otherCharges,
    notes: formData.notes,
    messageId: message!._id,
  });

  // Validation
  const validate = (): boolean => {
    if (!formData.validUntil) {
      toast.error("Please set a valid until date");
      return false;
    }
    if (!formData.projectDescription.trim()) {
      toast.error("Please enter a project description");
      return false;
    }
    if (items.some((i) => !i.description || i.quantity <= 0 || i.price <= 0)) {
      toast.error("Please fill all item details correctly");
      return false;
    }
    return true;
  };

  // ── Download Preview PDF ─────────────────────────────────────────────
  const handleDownloadPreview = async () => {
    if (!message || !validate()) return;
    setDownloading(true);
    try {
      const response = await api.post("/quotations/preview", buildPayload(), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `quotation_${message.name.replace(/\s+/g, "_")}_preview.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch {
      toast.error("Failed to generate PDF preview");
    } finally {
      setDownloading(false);
    }
  };

  // ── Send Quotation ────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !validate()) return;

    setLoading(true);
    try {
      await api.post("/quotations", buildPayload());
      toast.success("Quotation sent successfully!");
      onSuccess();
      onClose();
    } catch {
      toast.error("Failed to send quotation");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !message) return null;

  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl"
        style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      >
        {/* Modal Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-7 py-4 border-b"
          style={{ background: "#fff", borderColor: "#f0f0f0" }}
        >
          <div>
            <h2 className="text-lg font-bold" style={{ color: "#111827" }}>
              Create Quotation
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
              For: {message.name} · {message.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "#6b7280" }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-6">
          {/* Customer Info */}
          <div
            className="grid grid-cols-3 gap-4 p-4 rounded-xl"
            style={{ background: "#f9fafb", border: "1px solid #f0f0f0" }}
          >
            <div>
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "#9ca3af" }}
              >
                Customer Name
              </p>
              <p className="text-sm font-semibold" style={{ color: "#111827" }}>
                {message.name}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "#9ca3af" }}
              >
                Email
              </p>
              <p className="text-sm" style={{ color: "#374151" }}>
                {message.email}
              </p>
            </div>
            <div>
              <p
                className="text-xs font-medium mb-1"
                style={{ color: "#9ca3af" }}
              >
                Phone
              </p>
              <p className="text-sm" style={{ color: "#374151" }}>
                {message.phone || "Not provided"}
              </p>
            </div>
          </div>

          {/* Project + Valid Until */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#374151" }}
              >
                Project Description <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.projectDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectDescription: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none transition-all resize-none"
                style={{ borderColor: "#e5e7eb", color: "#111827" }}
                placeholder="Describe the project scope..."
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#374151" }}
              >
                Valid Until <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                type="date"
                required
                value={formData.validUntil}
                onChange={(e) =>
                  setFormData({ ...formData, validUntil: e.target.value })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: "#e5e7eb", color: "#111827" }}
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-sm font-semibold"
                style={{ color: "#111827" }}
              >
                Items / Services
              </h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                style={{ background: "#e8f5ee", color: "#2d7a4f" }}
              >
                <Plus size={14} /> Add Item
              </button>
            </div>

            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "#e5e7eb" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#2d7a4f" }}>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white">
                      Description
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-white w-20">
                      Qty
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-white w-28">
                      Price (R)
                    </th>
                    <th className="px-3 py-3 text-center text-xs font-semibold text-white w-24">
                      Total
                    </th>
                    <th className="px-3 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t"
                      style={{
                        borderColor: "#f0f0f0",
                        background: index % 2 === 0 ? "#fff" : "#fafafa",
                      }}
                    >
                      <td className="px-4 py-2.5">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(index, "description", e.target.value)
                          }
                          className="w-full px-2 py-1.5 text-sm rounded-lg border outline-none"
                          style={{ borderColor: "#e5e7eb" }}
                          placeholder="Item description"
                          required
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "quantity",
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-full px-2 py-1.5 text-sm rounded-lg border outline-none text-center"
                          style={{ borderColor: "#e5e7eb" }}
                          min="1"
                          required
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "price",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="w-full px-2 py-1.5 text-sm rounded-lg border outline-none text-center"
                          style={{ borderColor: "#e5e7eb" }}
                          min="0"
                          step="0.01"
                          required
                        />
                      </td>
                      <td
                        className="px-3 py-2.5 text-center font-semibold text-sm"
                        style={{ color: "#2d7a4f" }}
                      >
                        R{(item.quantity * item.price).toLocaleString()}
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-1 rounded hover:bg-red-50 transition-colors"
                          style={{ color: "#ef4444" }}
                          disabled={items.length === 1}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VAT + Other Charges + Notes */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#374151" }}
              >
                VAT (ZAR)
              </label>
              <input
                type="number"
                value={formData.vat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    vat: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: "#e5e7eb" }}
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#374151" }}
              >
                Other Charges (ZAR)
              </label>
              <input
                type="number"
                value={formData.otherCharges}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherCharges: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: "#e5e7eb" }}
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#374151" }}
              >
                Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
                style={{ borderColor: "#e5e7eb" }}
                placeholder="Additional notes..."
              />
            </div>
          </div>

          {/* Totals Summary */}
          <div
            className="rounded-xl overflow-hidden border"
            style={{ borderColor: "#e5e7eb" }}
          >
            <div
              className="px-5 py-3 flex justify-between text-sm"
              style={{ background: "#f9fafb" }}
            >
              <span style={{ color: "#6b7280" }}>Subtotal</span>
              <span className="font-medium" style={{ color: "#111827" }}>
                R{subtotal.toLocaleString()}
              </span>
            </div>
            <div
              className="px-5 py-3 flex justify-between text-sm border-t"
              style={{ borderColor: "#f0f0f0" }}
            >
              <span style={{ color: "#6b7280" }}>Value-Added Tax</span>
              <span className="font-medium" style={{ color: "#111827" }}>
                {formData.vat > 0
                  ? `R${formData.vat.toLocaleString()}`
                  : "0000"}
              </span>
            </div>
            <div
              className="px-5 py-3 flex justify-between text-sm border-t"
              style={{ borderColor: "#f0f0f0" }}
            >
              <span style={{ color: "#6b7280" }}>Others</span>
              <span className="font-medium" style={{ color: "#111827" }}>
                {formData.otherCharges > 0
                  ? `R${formData.otherCharges.toLocaleString()}`
                  : "0000"}
              </span>
            </div>
            <div
              className="px-5 py-3 flex justify-between text-sm font-bold border-t"
              style={{ background: "#2d7a4f", borderColor: "#2d7a4f" }}
            >
              <span style={{ color: "#fff" }}>Total</span>
              <span style={{ color: "#fff" }}>R{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                border: "1px solid #e5e7eb",
                color: "#374151",
                background: "#fff",
              }}
              disabled={loading || downloading}
            >
              Cancel
            </button>

            {/* Download Preview */}
            <button
              type="button"
              onClick={handleDownloadPreview}
              disabled={downloading || loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: "#e8f5ee",
                color: "#2d7a4f",
                border: "1px solid #c6e8d5",
              }}
            >
              {downloading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              {downloading ? "Generating..." : "Download PDF"}
            </button>

            {/* Send Quotation */}
            <button
              type="submit"
              disabled={loading || downloading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: loading
                  ? "#86efac"
                  : "linear-gradient(135deg, #2d7a4f 0%, #1d5c38 100%)",
                boxShadow: "0 2px 8px rgba(45,122,79,0.3)",
              }}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {loading ? "Sending..." : "Send Quotation to Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationModal;
