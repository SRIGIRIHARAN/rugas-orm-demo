
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "@/components/customers/CustomerForm";
import { generateMockData } from "@/lib/mockData";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const EditCustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load customer data
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const foundCustomer = customers.find((c: Customer) => c.id === id);
    
    if (foundCustomer) {
      setCustomer(foundCustomer);
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
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Customer</h1>
      </div>
      
      <CustomerForm editMode initialData={customer} />
    </div>
  );
};

export default EditCustomerPage;
