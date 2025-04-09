import axiosInstance from "../api/axiosInstance";

export const fetchDashboardStatsAPI = async () => {
  const res = await axiosInstance.get("/dashboard/stats");
  return res.data;
};

export const fetchRecentOrdersAPI = async () => {
  const res = await axiosInstance.get("/dashboard/recent-orders");
  return res.data;
};
