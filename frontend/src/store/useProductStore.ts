import { create } from "zustand";
import {
  fetchProductsAPI,
  fetchProductByIdAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../services/productService";

export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
};

type ProductStore = {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    const data = await fetchProductsAPI();
    set({ products: data, loading: false });
  },

  fetchProductById: async (id) => {
    try {
      const product = await fetchProductByIdAPI(id);
      return product;
    } catch (err) {
      console.error("Failed to fetch product by ID:", err);
      return null;
    }
  },

  addProduct: async (formData) => {
    const newProduct = await addProductAPI(formData);
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: async (id, formData) => {
    const updatedProduct = await updateProductAPI(id, formData);
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? updatedProduct : p)),
    }));
  },

  deleteProduct: async (id) => {
    await deleteProductAPI(id);
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
  },
}));
