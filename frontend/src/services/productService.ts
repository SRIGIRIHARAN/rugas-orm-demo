import axiosInstance from '../api/axiosInstance';

export const fetchProductsAPI = async () => {
  const res = await axiosInstance.get('/products');
  return res.data;
};

export const fetchProductByIdAPI = async (id: string) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

export const addProductAPI = async (formData: FormData) => {
  const res = await axiosInstance.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateProductAPI = async (id: string, formData: FormData) => {
  const res = await axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteProductAPI = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
