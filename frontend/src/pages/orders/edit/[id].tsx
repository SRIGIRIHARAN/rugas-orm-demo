
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderForm from "@/components/orders/OrderForm";
import { generateMockData } from "@/lib/mockData";

interface Order {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  notes: string;
}

const EditOrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load order data
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o: Order) => o.id === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Order not found, redirect to orders list
      navigate("/orders");
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
      </div>
      
      <OrderForm editMode initialData={order} />
    </div>
  );
};

export default EditOrderPage;
