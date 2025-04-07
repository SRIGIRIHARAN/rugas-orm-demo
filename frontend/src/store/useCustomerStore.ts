import { create } from "zustand";
import {
  fetchCustomersAPI,
  registerCustomerAPI,
  loginCustomerAPI,
  RegisterPayload,
  LoginPayload,
  ApiResponse,
} from "../services/customerService";

type Customer = {
  _id: string;
  name: string;
  email: string;
};

type CustomerStore = {
  customers: Customer[];
  loading: boolean;
  fetchCustomers: () => Promise<void>;
  registerCustomer: (data: RegisterPayload) => Promise<ApiResponse>;
  loginCustomer: (data: LoginPayload) => Promise<ApiResponse>; 
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  loading: false,

  fetchCustomers: async () => {
    set({ loading: true });
    const data = await fetchCustomersAPI();
    set({ customers: data, loading: false });
  },

  registerCustomer: async (payload) => {
    const result = await registerCustomerAPI(payload);
    if (result?.status) {
      set((state) => ({
        customers: [...state.customers, result.user],
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

