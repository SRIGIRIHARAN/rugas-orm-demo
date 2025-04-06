
import React from "react";
import CustomerForm from "@/components/customers/CustomerForm";

const NewCustomerPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Customer</h1>
      </div>
      
      <CustomerForm />
    </div>
  );
};

export default NewCustomerPage;
