import React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CampaignStatsCard: React.FC = () => {
  const { campaignChartData, topCampaign } = useAnalytics();

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <Target size={18} />
        <h3 className="font-semibold">Campaign Performance</h3>
      </div>

      {/* TOP CAMPAIGN INSIGHT */}
      <div className="mb-4">
        <p className="text-xs text-gray-500">Top Campaign</p>
        <p className="font-bold">{topCampaign.name}</p>
        <p className="text-xs text-gray-400">
          {topCampaign.count} leads generated
        </p>
      </div>

      {/* BAR CHART */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaignChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignStatsCard;
