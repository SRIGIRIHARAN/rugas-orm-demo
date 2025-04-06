
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "@/components/products/ProductForm";
import { generateMockData } from "@/lib/mockData";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load product data
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const foundProduct = products.find((p: Product) => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Product not found, redirect to products list
      navigate("/products");
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
      </div>
      
      <ProductForm editMode initialData={product} />
    </div>
  );
};

export default EditProductPage;
