import { create } from "zustand";
import axiosInstance from "../api/axiosInstance";
import {
  registerCustomerAPI,
  loginCustomerAPI,
  RegisterPayload,
  LoginPayload,
  ApiResponse,
} from "../services/customerService";

export type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
};

export type CustomerFormPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type CustomerStore = {
  customers: Customer[];
  loading: boolean;
  fetchCustomers: () => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  addCustomer: (payload: CustomerFormPayload) => Promise<void>;
  editCustomer: (id: string, payload: CustomerFormPayload) => Promise<void>;
  registerCustomer: (data: RegisterPayload) => Promise<ApiResponse>;
  loginCustomer: (data: LoginPayload) => Promise<ApiResponse>;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  loading: false,

  fetchCustomers: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/customers");
      set({ customers: res.data.data, loading: false }); 
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      set({ loading: false });
    }
  },

  deleteCustomer: async (id: string) => {
    try {
      await axiosInstance.delete(`/customers/${id}`);
      set((state) => ({
        customers: state.customers.filter((c) => c._id !== id),
      }));
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  },

  addCustomer: async (payload: CustomerFormPayload) => {
    try {
      const res = await axiosInstance.post("/customers", payload);
      const newCustomer: Customer = res.data.data;
      set((state) => ({
        customers: [...state.customers, newCustomer],
      }));
    } catch (err) {
      console.error("Failed to add customer:", err);
    }
  },

  editCustomer: async (id: string, payload: CustomerFormPayload) => {
    try {
      const res = await axiosInstance.put(`/customers/${id}`, payload);
      const updatedCustomer: Customer = res.data.data;
      set((state) => ({
        customers: state.customers.map((c) =>
          c._id === id ? updatedCustomer : c
        ),
      }));
    } catch (err) {
      console.error("Failed to edit customer:", err);
    }
  },

  registerCustomer: async (payload) => {
    const result = await registerCustomerAPI(payload);
    if (result?.status === "success" && result.user) {
      const userWithUnderscoreId: Customer = {
        _id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        phone: (result.user as any).phone ?? "",
        address: (result.user as any).address ?? "",
        createdAt: new Date().toISOString(),
      };

      set((state) => ({
        customers: [...state.customers, userWithUnderscoreId],
      }));
    }
    return result;
  },

  loginCustomer: async (payload) => {
    const result = await loginCustomerAPI(payload);
    if (result?.status && result.token && result.user) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
    }
    return result;
  },
}));
