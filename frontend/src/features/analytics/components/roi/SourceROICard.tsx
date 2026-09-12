import React from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { Globe } from "lucide-react";

const SourceROICard: React.FC = () => {
  const { sourceROI } = useAnalytics();

  // Convert object → array
  const data = Object.entries(sourceROI).map(([name, stats]) => ({
    name,
    ...stats,
  }));

  // Sort by ROI (highest first)
  const sorted = data.sort((a, b) => b.roi - a.roi);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <Globe size={18} />
        <h3 className="font-semibold">Traffic Source ROI</h3>
      </div>

      {/* TOP INSIGHT */}
      {sorted[0] && (
        <div className="mb-4 p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">Best Performing Source</p>
          <p className="text-lg font-bold">{sorted[0].name}</p>
          <p className="text-sm text-green-600 font-semibold">
            ROI: {sorted[0].roi.toFixed(1)}%
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
            {/* SOURCE NAME */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  index === 0 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <p className="text-sm font-medium">{item.name || "Unknown"}</p>
            </div>

            {/* ROI VALUE */}
            <p
              className={`text-sm font-semibold ${
                item.roi >= 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.roi.toFixed(1)}%
            </p>
          </div>
        ))}

        {/* EMPTY STATE */}
        {sorted.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            No source data available
          </p>
        )}
      </div>
    </div>
  );
};

export default SourceROICard;
