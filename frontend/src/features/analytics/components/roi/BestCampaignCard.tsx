import React from "react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { Trophy } from "lucide-react";

const BestCampaignCard: React.FC = () => {
  const { bestCampaign } = useAnalytics();

  return (
    <div className="bg-white rounded-xl p-4 shadow border-l-4 border-green-500">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="text-yellow-500" size={18} />
        <h3 className="font-semibold">Best Campaign</h3>
      </div>

      {/* CONTENT */}
      <p className="text-sm text-gray-500">Top performing campaign</p>

      <p className="text-xl font-bold mt-2">{bestCampaign.name || "No data"}</p>

      <p className="text-sm text-green-600 font-semibold mt-1">
        Profit: ${bestCampaign.profit.toFixed(2)}
      </p>
    </div>
  );
};

export default BestCampaignCard;
