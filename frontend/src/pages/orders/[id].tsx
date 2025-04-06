
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetail from "@/components/orders/OrderDetail";
import { generateMockData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

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

const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load data
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const productsList = JSON.parse(localStorage.getItem("products") || "[]");
    
    const foundOrder = orders.find((o: Order) => o.id === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
      
      // Load customer data
      const orderCustomer = customers.find((c: Customer) => c.id === foundOrder.customerId);
      setCustomer(orderCustomer);
      
      // Load products data
      setProducts(productsList);
    } else {
      // Order not found, redirect to orders list
      navigate("/orders");
    }
    
    setLoading(false);
  }, [id, navigate]);
  
  const handleStatusChange = (id: string, status: "placed" | "shipped" | "delivered" | "cancelled") => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = orders.map((o: Order) => 
      o.id === id 
        ? { ...o, status, updatedAt: new Date().toISOString() } 
        : o
    );
    
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    // Update local state
    setOrder(prev => prev ? { ...prev, status, updatedAt: new Date().toISOString() } : null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order || !customer) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/orders")}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
      </div>
      
      <OrderDetail 
        order={order} 
        customer={customer} 
        products={products} 
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrderDetailsPage;
