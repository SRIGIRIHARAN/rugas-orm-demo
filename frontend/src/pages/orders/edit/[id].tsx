import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderForm from "@/components/orders/OrderForm";
import { useOrderStore } from "@/store/useOrderStore";

interface OrderFormData {
  id?: string;
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

  const { orders, fetchOrders, updateOrder } = useOrderStore();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<OrderFormData | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      if (orders.length === 0) {
        await fetchOrders();
      }

      const found = orders.find((o) => o._id === id);
      if (!found) {
        navigate("/orders");
        return;
      }

      setOrderData({
        customerId:
          typeof found.customer === "string"
            ? found.customer
            : found.customer?._id ?? "",
        products: [
          {
            productId:
              typeof found.product === "string"
                ? found.product
                : found.product?._id ?? "",
            quantity: found.quantity,
          },
        ],
        status: found.status as "placed" | "shipped" | "delivered" | "cancelled",
        notes: found.notes ?? "",
      });

      setLoading(false);
    };

    loadOrder();
  }, [id, orders, fetchOrders, navigate]);

  const handleUpdate = async (data: OrderFormData) => {
    if (!id) return;

    const transformed = {
      customerId: data.customerId,
      product: data.products[0].productId,
      quantity: data.products[0].quantity,
      status: data.status,
      notes: data.notes,
    };

    await updateOrder(id, transformed);
    navigate("/orders");
  };

  if (loading || !orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
      </div>

      <OrderForm editMode initialData={orderData} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditOrderPage;
