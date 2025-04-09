import { create } from "zustand";
import {
  fetchDashboardStatsAPI,
  fetchRecentOrdersAPI,
} from "../services/dashboardService";

type StatData = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
};

type RecentOrder = {
  id: string;
  customer: string;
  date: string;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  total: string;
};

type DashboardStore = {
  stats: StatData | null;
  recentOrders: RecentOrder[];
  loading: boolean;
  fetchDashboardData: () => Promise<void>;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  recentOrders: [],
  loading: false,

  fetchDashboardData: async () => {
    set({ loading: true });
    try {
      const [statsRes, ordersRes] = await Promise.all([
        fetchDashboardStatsAPI(),
        fetchRecentOrdersAPI(),
      ]);

      set({
        stats: statsRes.data,
        recentOrders: ordersRes.data,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      set({ loading: false });
    }
  },
}));
