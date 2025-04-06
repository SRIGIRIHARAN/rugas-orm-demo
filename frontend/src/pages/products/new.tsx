
import React from "react";
import ProductForm from "@/components/products/ProductForm";

const NewProductPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Product</h1>
      </div>
      
      <ProductForm />
    </div>
  );
};

export default NewProductPage;
