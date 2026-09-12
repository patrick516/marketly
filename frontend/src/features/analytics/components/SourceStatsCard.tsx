import React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Globe } from "lucide-react";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

const SourceStatsCard: React.FC = () => {
  const { sourceChartData, topSource } = useAnalytics();

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <Globe size={18} />
        <h3 className="font-semibold">Traffic Sources</h3>
      </div>

      {/* TOP SOURCE */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">Top Source</p>
        <p className="font-bold">{topSource.name}</p>
        <p className="text-xs text-gray-400">{topSource.count} leads</p>
      </div>

      {/* PIE CHART */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sourceChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {sourceChartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SourceStatsCard;
