import React, { useEffect } from "react";
import CustomerList from "@/components/customers/CustomerList";
import { useCustomerStore } from "@/store/useCustomerStore";

const CustomersPage = () => {
  const { customers, fetchCustomers, deleteCustomer } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
      </div>
      <CustomerList customers={customers} onDelete={deleteCustomer} />
    </div>
  );
};

export default CustomersPage;
