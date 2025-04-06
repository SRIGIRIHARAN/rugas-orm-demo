
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerDetail from "@/components/customers/CustomerDetail";
import { generateMockData, getCustomerOrderSummary } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface OrderSummary {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load customer data
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const foundCustomer = customers.find((c: Customer) => c.id === id);
    
    if (foundCustomer) {
      setCustomer(foundCustomer);
      
      // Get customer order summary
      const summary = getCustomerOrderSummary(id!);
      setOrderSummary(summary);
    } else {
      // Customer not found, redirect to customers list
      navigate("/customers");
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/customers")}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Customer Details</h1>
      </div>
      
      <CustomerDetail 
        customer={customer} 
        orderSummary={orderSummary!}
      />
    </div>
  );
};

export default CustomerDetailsPage;
