import React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { Wrench } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ServiceStatsCard: React.FC = () => {
  const { serviceChartData, topService } = useAnalytics();

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <Wrench size={18} />
        <h3 className="font-semibold">Service Performance</h3>
      </div>

      {/* TOP SERVICE */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">Top Performing Service</p>
        <p className="font-bold">{topService.name}</p>
        <p className="text-xs text-gray-400">{topService.count} leads</p>
      </div>

      {/* BAR CHART */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={serviceChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ServiceStatsCard;
