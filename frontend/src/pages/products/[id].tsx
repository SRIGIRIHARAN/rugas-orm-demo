
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "@/components/products/ProductDetail";
import { generateMockData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const ProductDetailsPage = () => {
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
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/products")}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
      </div>
      
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailsPage;
