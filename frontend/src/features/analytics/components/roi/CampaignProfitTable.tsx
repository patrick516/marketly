import React from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { BarChart3 } from "lucide-react";

const CampaignProfitTable: React.FC = () => {
  const { campaignStats } = useAnalytics();

  // Convert object → sortable array
  const data = Object.entries(campaignStats).map(([name, stats]) => ({
    name,
    ...stats,
  }));

  // Sort by profit (highest first)
  const sorted = data.sort((a, b) => b.profit - a.profit);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center gap-2 px-5 py-4 border-b">
        <BarChart3 size={18} />
        <h3 className="font-semibold">Campaign Profit Breakdown</h3>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="px-5 py-3 text-left">Campaign</th>
              <th className="px-5 py-3 text-left">Leads</th>
              <th className="px-5 py-3 text-left">Cost</th>
              <th className="px-5 py-3 text-left">Revenue</th>
              <th className="px-5 py-3 text-left">Profit</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((item, index) => (
              <tr
                key={item.name}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Campaign */}
                <td className="px-5 py-3 font-medium">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        index === 0 ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    {item.name || "Unknown"}
                  </div>
                </td>

                {/* Leads */}
                <td className="px-5 py-3">{item.leads}</td>

                {/* Cost */}
                <td className="px-5 py-3 text-red-500">
                  ${item.cost.toFixed(2)}
                </td>

                {/* Revenue */}
                <td className="px-5 py-3 text-blue-500">
                  ${item.revenue.toFixed(2)}
                </td>

                {/* Profit */}
                <td
                  className={`px-5 py-3 font-semibold ${
                    item.profit >= 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ${item.profit.toFixed(2)}
                </td>
              </tr>
            ))}

            {/* EMPTY STATE */}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No campaign data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignProfitTable;
