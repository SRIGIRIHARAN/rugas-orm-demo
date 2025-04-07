import axiosInstance from "../api/axiosInstance";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiResponse = {
  status: boolean;
  message: string;
  token?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
};

export const fetchCustomersAPI = async () => {
  const res = await axiosInstance.get("/customers");
  return res.data;
};

export const registerCustomerAPI = async (
  payload: RegisterPayload
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.post("/auth/register", payload);
    return {
      status: res.status,
      ...res.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error?.response?.data?.message || "Unexpected error",
    };
  }
};

export const loginCustomerAPI = async (
  payload: LoginPayload
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.post("/auth/login", payload);
    return {
      status: res.status,
      ...res.data,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};
