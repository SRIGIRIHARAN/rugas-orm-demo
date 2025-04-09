import React, { useEffect } from "react";
import OrderList from "@/components/orders/OrderList";
import { useOrderStore } from "../../store/useOrderStore";
import { useCustomerStore } from "../../store/useCustomerStore";
import { useProductStore } from "../../store/useProductStore";

const OrdersPage = () => {
  const { orders, fetchOrders, updateOrderStatus } = useOrderStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    await Promise.all([fetchOrders(), fetchCustomers(), fetchProducts()]);
  };

  const handleStatusChange = async (
    id: string,
    status: "placed" | "shipped" | "delivered" | "cancelled"
  ) => {
    await updateOrderStatus(id, status);
  };

  const mappedOrders = orders.map((order) => {
    const product = order.product?.[0];
    const productData = products.find((p) => p._id === product?._id);
    const orderTotal = (productData?.price || 0) * order.quantity;

    return {
      id: order._id,
      customerId: order.customer, 
      productId: product?._id || "",
      quantity: order.quantity,
      total: orderTotal,
      status: (order.status || "placed") as "placed" | "shipped" | "delivered" | "cancelled",
      createdAt: order.createdAt ?? "",
      updatedAt: order.updatedAt ?? "",
    };
  });
  const mappedCustomers = customers.map((c) => ({
    id: c._id,
    name: c.name,
  }));

  const mappedProducts = products.map((p) => ({
    id: p._id,
    name: p.name,
    category: p.category,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>
      <OrderList
        orders={mappedOrders}
        customers={mappedCustomers}
        products={mappedProducts}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrdersPage;
