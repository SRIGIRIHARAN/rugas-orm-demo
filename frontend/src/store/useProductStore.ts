// src/stores/useProductStore.ts
import { create } from 'zustand';
import { fetchProductsAPI, addProductAPI } from '../services/productService';

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type ProductStore = {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (formData: FormData) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    const data = await fetchProductsAPI();
    set({ products: data, loading: false });
  },

  addProduct: async (formData) => {
    const newProduct = await addProductAPI(formData);
    set((state) => ({ products: [...state.products, newProduct] }));
  },
}));
