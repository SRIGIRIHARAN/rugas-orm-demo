
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  User,
  Calendar,
  Clock,
  Truck,
  ShoppingBag,
  CheckCircle,
  XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ToastProvider } from "@/components/ui/use-toast";
import { toast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  customerId: string;
  products: OrderItem[];
  status: "placed" | "shipped" | "delivered" | "cancelled";
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetailProps {
  order: Order;
  customer: Customer;
  products: Product[];
  onStatusChange: (id: string, status: "placed" | "shipped" | "delivered" | "cancelled") => void;
}

const statusStyles = {
  placed: "bg-blue-100 text-blue-800",
  shipped: "bg-yellow-100 text-yellow-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderDetail = ({ order, customer, products, onStatusChange }: OrderDetailProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getOrderItems = () => {
    return order.products.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        product,
        quantity: item.quantity,
        subtotal: product ? product.price * item.quantity : 0
      };
    });
  };

  const handleStatusChange = (newStatus: "placed" | "shipped" | "delivered" | "cancelled") => {
    onStatusChange(order.id, newStatus);

    // Show toast notification
    const statusMessages = {
      placed: "Order status set to Placed",
      shipped: "Order has been marked as Shipped",
      delivered: "Order has been marked as Delivered",
      cancelled: "Order has been Cancelled"
    };

    toast({
      title: "Status Updated",
      description: statusMessages[newStatus],
      variant: "success"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Created on {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/orders/edit/${order.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Order
          </Button>

          {order.status !== "placed" && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange("placed")}
              className="text-blue-600"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Mark as Placed
            </Button>
          )}

          {order.status !== "shipped" && order.status !== "cancelled" && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange("shipped")}
              className="text-yellow-600"
            >
              <Truck className="mr-2 h-4 w-4" />
              Mark as Shipped
            </Button>
          )}

          {order.status !== "delivered" && order.status !== "cancelled" && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange("delivered")}
              className="text-green-600"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Delivered
            </Button>
          )}

          {order.status !== "cancelled" && (
            <Button
              variant="outline"
              onClick={() => handleStatusChange("cancelled")}
              className="text-red-600"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Status:</span>
          <Badge className={cn("text-sm capitalize px-3 py-1", statusStyles[order.status])}>
            {order.status}
          </Badge>
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(order.total)}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-lg">{customer.name}</p>
              <p className="text-muted-foreground">{customer.email}</p>
              <p className="text-muted-foreground">{customer.phone}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Shipping Address</p>
              <p className="text-muted-foreground">{customer.address}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              size="sm"
              onClick={() => navigate(`/customers/${customer.id}`)}
            >
              View Customer
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Order Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
              <div>
                <p className="font-medium">Order Created</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            {order.createdAt !== order.updatedAt && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <div>
                  <p className="font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>
            )}

            {order.status !== "placed" && (
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2",
                  order.status === "shipped" && "bg-yellow-600",
                  order.status === "delivered" && "bg-green-600",
                  order.status === "cancelled" && "bg-red-600",
                )} />
                <div>
                  <p className="font-medium">
                    Order {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.updatedAt)}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Order Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.notes ? (
              <p>{order.notes}</p>
            ) : (
              <p className="text-muted-foreground">No notes provided for this order.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            {order.products.length} {order.products.length === 1 ? "item" : "items"} in this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getOrderItems().map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-muted">
                        <img
                          src={item.product?.imageUrl || "/placeholder.svg"}
                          alt={item.product?.name || "Product"}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.product?.category || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(item.product?.price || 0)}
                  </TableCell>
                  <TableCell>
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(item.subtotal)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="text-right font-bold">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(order.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
