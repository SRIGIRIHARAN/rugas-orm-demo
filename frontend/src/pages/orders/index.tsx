
import React, { useEffect, useState } from "react";
import OrderList from "@/components/orders/OrderList";
import { generateMockData } from "@/lib/mockData";

interface Order {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load data from localStorage
    loadData();
  }, []);
  
  const loadData = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    
    setOrders(storedOrders);
    setCustomers(storedCustomers);
    setProducts(storedProducts);
  };
  
  const handleStatusChange = (id: string, status: "placed" | "shipped" | "delivered" | "cancelled") => {
    const updatedOrders = orders.map(order => 
      order.id === id 
        ? { ...order, status, updatedAt: new Date().toISOString() } 
        : order
    );
    
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>
      
      <OrderList 
        orders={orders} 
        customers={customers} 
        products={products} 
        onStatusChange={handleStatusChange} 
      />
    </div>
  );
};

export default OrdersPage;
