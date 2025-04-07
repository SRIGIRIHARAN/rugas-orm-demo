import axiosInstance from '../api/axiosInstance';

export const fetchProductsAPI = async () => {
  const res = await axiosInstance.get('/products');
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
