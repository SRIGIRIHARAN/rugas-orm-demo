import { create } from 'zustand';
import { fetchOrdersAPI, createOrderAPI } from '../services/orderService';

type Order = {
  _id: string;
  customerId: string;
  productId: string;
  quantity: number;
};

type OrderStore = {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  createOrder: (orderData: any) => Promise<void>;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,

  fetchOrders: async () => {
    set({ loading: true });
    const data = await fetchOrdersAPI();
    set({ orders: data, loading: false });
  },

  createOrder: async (orderData) => {
    const newOrder = await createOrderAPI(orderData);
    set((state) => ({ orders: [...state.orders, newOrder] }));
  },
}));
