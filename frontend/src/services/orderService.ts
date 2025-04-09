import axiosInstance from "../api/axiosInstance";

export type Order = {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
  };
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
  };
  quantity: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  notes?: string;
};

export type CreateOrderPayload = {
  customer: string;
  product: string;
  quantity: number;
  status?: string;
};

export const fetchOrdersAPI = async (): Promise<Order[]> => {
  const res = await axiosInstance.get("/orders/getAllOrder");
  return res.data;
};

export const createOrderAPI = async (payload: CreateOrderPayload): Promise<Order> => {
  const res = await axiosInstance.post("/orders", payload);
  return res.data;
};

export const updateOrderStatusAPI = async (
  id: string,
  status: string
): Promise<Order> => {
  const res = await axiosInstance.patch(`/orders/${id}/status`, { status });
  return res.data;
};

export const updateOrderAPI = async (
  id: string,
  payload: Partial<CreateOrderPayload>
): Promise<Order> => {
  const res = await axiosInstance.put(`/orders/${id}`, payload);
  return res.data;
};

export const deleteOrderAPI = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/orders/${id}`);
};
