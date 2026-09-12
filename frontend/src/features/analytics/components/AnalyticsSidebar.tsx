import React from "react";
import { useAnalytics } from "../hooks/useAnalytics";
import { TrendingUp, Target, MousePointerClick } from "lucide-react";

const AnalyticsSidebar: React.FC = () => {
  const { totalLeads, googleAdsConversionRate, topService, topCampaign } =
    useAnalytics();

  return (
    <div className="px-4 py-4 space-y-4">
      {/* TITLE */}
      <div className="text-xs font-bold uppercase text-white/60">Analytics</div>

      {/* TOTAL LEADS */}
      <div className="bg-white/10 rounded-lg p-3">
        <p className="text-white text-sm font-semibold">Total Leads</p>
        <p className="text-white text-xl font-bold">{totalLeads}</p>
      </div>

      {/* GOOGLE ADS PERFORMANCE */}
      <div className="bg-white/10 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <MousePointerClick size={16} className="text-blue-300" />
          <p className="text-white text-sm font-semibold">Google Ads</p>
        </div>
        <p className="text-white text-lg font-bold">
          {googleAdsConversionRate.toFixed(1)}%
        </p>
        <p className="text-white/50 text-xs">Conversion Rate</p>
      </div>

      {/* TOP SERVICE */}
      <div className="bg-white/10 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-green-300" />
          <p className="text-white text-sm font-semibold">Top Service</p>
        </div>
        <p className="text-white font-bold text-sm">
          {topService.name || "N/A"}
        </p>
        <p className="text-white/50 text-xs">{topService.count} leads</p>
      </div>

      {/* TOP CAMPAIGN */}
      <div className="bg-white/10 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-purple-300" />
          <p className="text-white text-sm font-semibold">Top Campaign</p>
        </div>
        <p className="text-white font-bold text-sm">
          {topCampaign.name || "N/A"}
        </p>
        <p className="text-white/50 text-xs">{topCampaign.count} leads</p>
      </div>
    </div>
  );
};

export default AnalyticsSidebar;
