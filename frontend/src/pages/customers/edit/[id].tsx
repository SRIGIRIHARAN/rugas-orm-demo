import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerForm from "@/components/customers/CustomerForm";
import { useCustomerStore } from "@/store/useCustomerStore";
import { Customer } from "@/store/useCustomerStore";

const EditCustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { customers, fetchCustomers } = useCustomerStore();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomer = async () => {
      if (customers.length === 0) {
        await fetchCustomers();
      }

      const found = customers.find((c) => c._id === id);

      if (found) {
        setCustomer(found);
      } else {
        navigate("/customers");
      }

      setLoading(false);
    };

    loadCustomer();
  }, [customers, fetchCustomers, id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return null; 
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Customer</h1>
      </div>

      <CustomerForm
        editMode
        initialData={{
          id: customer._id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
        }}
      />
    </div>
  );
};

export default EditCustomerPage;
