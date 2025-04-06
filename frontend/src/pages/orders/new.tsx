
import React from "react";
import OrderForm from "@/components/orders/OrderForm";

const NewOrderPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">New Order</h1>
      </div>
      
      <OrderForm />
    </div>
  );
};

export default NewOrderPage;
