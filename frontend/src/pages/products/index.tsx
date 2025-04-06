import { useEffect, useState } from "react";
import ProductList from "@/components/products/ProductList";
import { generateMockData } from "@/lib/mockData";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Initialize mock data
    generateMockData();

    // Load products from localStorage
    loadProducts();
  }, []);

  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    // Also update any orders that include this product
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = orders.map((order: any) => {
      // Remove the product from order.products
      const updatedOrderProducts = order.products.filter((item: any) => item.productId !== id);

      // If all products were removed, cancel the order
      if (updatedOrderProducts.length === 0) {
        return { ...order, products: [], status: "cancelled" };
      }

      // Otherwise, update the products list
      return { ...order, products: updatedOrderProducts };
    });

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      </div>

      <ProductList products={products} onDelete={handleDeleteProduct} />
    </div>
  );
};

export default ProductsPage;
