import axiosInstance from "../api/axiosInstance";

export const fetchOrdersAPI = async () => {
  const res = await axiosInstance.get("/orders");
  return res.data;
};

export const createOrderAPI = async (payload: any) => {
  const res = await axiosInstance.post("/orders", payload);
  return res.data;
};
