import { create } from "zustand";
import {
  fetchOrdersAPI,
  createOrderAPI,
  updateOrderStatusAPI,
  updateOrderAPI,
  deleteOrderAPI,
  Order,
  CreateOrderPayload,
} from "../services/orderService";

type OrderStore = {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  createOrder: (data: CreateOrderPayload) => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  updateOrder: (id: string, data: Partial<CreateOrderPayload>) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const orders = await fetchOrdersAPI();
      set({ orders, loading: false });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      set({ loading: false });
    }
  },

  createOrder: async (data) => {
    try {
      const newOrder = await createOrderAPI(data);
      set((state) => ({ orders: [...state.orders, newOrder] }));
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const updated = await updateOrderStatusAPI(id, status);
      set((state) => ({
        orders: state.orders.map((o) => (o._id === id ? updated : o)),
      }));
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  },

  updateOrder: async (id, data) => {
    try {
      const updated = await updateOrderAPI(id, data);
      set((state) => ({
        orders: state.orders.map((o) => (o._id === id ? updated : o)),
      }));
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  },

  deleteOrder: async (id) => {
    try {
      await deleteOrderAPI(id);
      set((state) => ({
        orders: state.orders.filter((o) => o._id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  },
}));
