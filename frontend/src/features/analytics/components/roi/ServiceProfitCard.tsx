import React from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { Wrench } from "lucide-react";

const ServiceProfitCard: React.FC = () => {
  const { serviceProfitStats } = useAnalytics();

  // Convert object → array
  const data = Object.entries(serviceProfitStats).map(([name, stats]) => ({
    name,
    ...stats,
  }));

  // Sort by profit (highest first)
  const sorted = data.sort((a, b) => b.profit - a.profit);

  // Top service
  const top = sorted[0];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <Wrench size={18} />
        <h3 className="font-semibold">Service Profit Analysis</h3>
      </div>

      {/* TOP INSIGHT */}
      {top && (
        <div className="mb-4 p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">Most Profitable Service</p>
          <p className="text-lg font-bold">{top.name}</p>
          <p className="text-sm text-green-600 font-semibold">
            Profit: ${top.profit.toFixed(2)}
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-2">
        {sorted.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
          >
            {/* SERVICE NAME */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <p className="text-sm font-medium">{item.name || "Unknown"}</p>
            </div>

            {/* PROFIT */}
            <p
              className={`text-sm font-semibold ${
                item.profit >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              ${item.profit.toFixed(2)}
            </p>
          </div>
        ))}

        {/* EMPTY STATE */}
        {sorted.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No service data available
          </p>
        )}
      </div>
    </div>
  );
};

export default ServiceProfitCard;
