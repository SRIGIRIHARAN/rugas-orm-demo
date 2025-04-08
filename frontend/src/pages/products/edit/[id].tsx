import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "@/components/products/ProductForm";
import { useProductStore } from "@/store/useProductStore"; // Zustand store
import { Product } from "@/store/useProductStore";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (products.length === 0) {
        await fetchProducts();
      }

      const found = products.find((p) => p._id === id);

      if (found) {
        setProduct(found);
      } else {
        navigate("/products");
      }

      setLoading(false);
    };

    loadProduct();
  }, [products, fetchProducts, id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      </div>

      <ProductForm
        editMode
        initialData={{
          _id: product._id, 
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
        }}
      />

    </div>
  );
};

export default EditProductPage;
