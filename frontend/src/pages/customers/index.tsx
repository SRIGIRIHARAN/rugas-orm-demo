
import React, { useEffect, useState } from "react";
import CustomerList from "@/components/customers/CustomerList";
import { generateMockData } from "@/lib/mockData";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load customers from localStorage
    loadCustomers();
  }, []);
  
  const loadCustomers = () => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    setCustomers(storedCustomers);
  };
  
  const handleDeleteCustomer = (id: string) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    setCustomers(updatedCustomers);
    
    // Also update or delete any associated orders
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = orders.filter((order: any) => order.customerId !== id);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
      </div>
      
      <CustomerList customers={customers} onDelete={handleDeleteCustomer} />
    </div>
  );
};

export default CustomersPage;
