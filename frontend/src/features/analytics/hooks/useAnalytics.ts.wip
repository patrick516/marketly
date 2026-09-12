import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";

// -----------------------------
// TYPES
// -----------------------------
type Message = {
  service?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  createdAt?: string;
  status?: "New" | "Read" | "Replied";
  name?: string;
  email?: string;
};

export const useAnalytics = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  // FETCH DATA
  // -----------------------------
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get("/messages");
      setMessages(res.data || []);
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // -----------------------------
  // CORE
  // -----------------------------
  const totalLeads = messages.length;

  // -----------------------------
  // GROUP HELPER
  // -----------------------------
  const groupBy = (key: keyof Message, fallback = "Unassigned") => {
    return messages.reduce<Record<string, number>>((acc, item) => {
      const value = (item[key] as string) ?? fallback;
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  };

  // -----------------------------
  // GROUPS
  // -----------------------------
  const leadsByService = useMemo(() => groupBy("service"), [messages]);
  const leadsBySource = useMemo(() => groupBy("source", "direct"), [messages]);
  const leadsByCampaign = useMemo(
    () => groupBy("utm_campaign", "none"),
    [messages],
  );

  // -----------------------------
  // CHART DATA
  // -----------------------------
  const serviceChartData = useMemo(
    () =>
      Object.entries(leadsByService).map(([name, value]) => ({ name, value })),
    [leadsByService],
  );

  const sourceChartData = useMemo(
    () =>
      Object.entries(leadsBySource).map(([name, value]) => ({ name, value })),
    [leadsBySource],
  );

  const campaignChartData = useMemo(
    () =>
      Object.entries(leadsByCampaign).map(([name, value]) => ({ name, value })),
    [leadsByCampaign],
  );

  // -----------------------------
  // BUSINESS ASSUMPTIONS (MK - MALAWI KWACHA)
  // -----------------------------
  const CAMPAIGN_COST_PER_LEAD = 3000;
  const SERVICE_COST_PER_LEAD = 2000;
  const REVENUE_PER_LEAD = 15000;

  // -----------------------------
  // CAMPAIGN ROI ENGINE
  // -----------------------------
  const campaignStats = useMemo(() => {
    const map: Record<
      string,
      { leads: number; cost: number; revenue: number; profit: number }
    > = {};

    messages.forEach((m) => {
      const campaign = m.utm_campaign ?? "none";

      if (!map[campaign]) {
        map[campaign] = { leads: 0, cost: 0, revenue: 0, profit: 0 };
      }

      map[campaign].leads += 1;
    });

    Object.keys(map).forEach((key) => {
      const leads = map[key].leads;
      map[key].cost = leads * CAMPAIGN_COST_PER_LEAD;
      map[key].revenue = leads * REVENUE_PER_LEAD;
      map[key].profit = map[key].revenue - map[key].cost;
    });

    return map;
  }, [messages]);

  const bestCampaign = useMemo(() => {
    return Object.entries(campaignStats).reduce(
      (best, [name, data]) => {
        return data.profit > best.profit ? { name, profit: data.profit } : best;
      },
      { name: "", profit: 0 },
    );
  }, [campaignStats]);

  // -----------------------------
  // SERVICE PROFIT ENGINE
  // -----------------------------
  const serviceProfitStats = useMemo(() => {
    const map: Record<string, { leads: number; profit: number }> = {};

    messages.forEach((m) => {
      const service = m.service ?? "Unassigned";

      if (!map[service]) {
        map[service] = { leads: 0, profit: 0 };
      }

      map[service].leads += 1;
    });

    Object.keys(map).forEach((key) => {
      const leads = map[key].leads;
      const revenue = leads * REVENUE_PER_LEAD;
      const cost = leads * SERVICE_COST_PER_LEAD;

      map[key].profit = revenue - cost;
    });

    return map;
  }, [messages]);

  // -----------------------------
  // SOURCE ROI ENGINE
  // -----------------------------
  const sourceCostMap: Record<string, number> = {
    google_ads: 3000,
    facebook: 2000,
    direct: 0,
    organic: 1000,
  };

  const sourceROI = useMemo(() => {
    const map: Record<string, { leads: number; roi: number }> = {};

    messages.forEach((m) => {
      const source = m.source ?? "direct";

      if (!map[source]) {
        map[source] = { leads: 0, roi: 0 };
      }

      map[source].leads += 1;
    });

    Object.keys(map).forEach((key) => {
      const leads = map[key].leads;
      const cost = leads * (sourceCostMap[key] ?? 1000);
      const revenue = leads * REVENUE_PER_LEAD;

      map[key].roi = cost === 0 ? 0 : ((revenue - cost) / cost) * 100;
    });

    return map;
  }, [messages]);

  // -----------------------------
  // TOP FINDERS
  // -----------------------------
  const getTop = (data: Record<string, number>) =>
    Object.entries(data).reduce(
      (top, [name, count]) => (count > top.count ? { name, count } : top),
      { name: "", count: 0 },
    );

  const topService = useMemo(() => getTop(leadsByService), [leadsByService]);
  const topSource = useMemo(() => getTop(leadsBySource), [leadsBySource]);
  const topCampaign = useMemo(() => getTop(leadsByCampaign), [leadsByCampaign]);

  // -----------------------------
  // ADS ROI ENGINE
  // -----------------------------
  const googleAdsLeads = useMemo(
    () => messages.filter((m) => m.source === "google_ads").length,
    [messages],
  );

  const googleAdsCost = googleAdsLeads * 3000;
  const googleAdsRevenue = googleAdsLeads * REVENUE_PER_LEAD;

  const googleAdsROI = useMemo(() => {
    if (googleAdsCost === 0) return 0;
    return ((googleAdsRevenue - googleAdsCost) / googleAdsCost) * 100;
  }, [googleAdsCost, googleAdsRevenue]);

  const googleAdsConversionRate = useMemo(() => {
    if (totalLeads === 0) return 0;
    return (googleAdsLeads / totalLeads) * 100;
  }, [googleAdsLeads, totalLeads]);

  // -----------------------------
  // EXPORT
  // -----------------------------
  return {
    loading,
    messages,

    // core
    totalLeads,

    // breakdowns
    leadsByService,
    leadsBySource,
    leadsByCampaign,

    // charts
    serviceChartData,
    sourceChartData,
    campaignChartData,

    // ROI engines
    campaignStats,
    serviceProfitStats,
    sourceROI,
    bestCampaign,

    // insights
    topService,
    topSource,
    topCampaign,

    // ads
    googleAdsLeads,
    googleAdsCost,
    googleAdsRevenue,
    googleAdsROI,
    googleAdsConversionRate,
  };
};
