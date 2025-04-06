
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Mail, Phone, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

interface CustomerDetailProps {
  customer: Customer;
  orderSummary?: OrderSummary;
}

const CustomerDetail = ({ customer, orderSummary }: CustomerDetailProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{customer.name}</CardTitle>
            <CardDescription>Customer Details</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate(`/customers/edit/${customer.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <p>{customer.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <p>{customer.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <div className="flex items-start">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
              <p>{customer.address}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Customer since</p>
            <p>{formatDate(customer.createdAt)}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Customer's order history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {orderSummary ? (
            <>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orderSummary.totalOrders}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(orderSummary.totalSpent)}
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Order</p>
                <p>{formatDate(orderSummary.lastOrderDate)}</p>
              </div>
              
              <Button className="w-full" onClick={() => navigate(`/orders?customer=${customer.id}`)}>
                View Orders
              </Button>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <Badge variant="outline" className="mx-auto">No Orders</Badge>
              <p className="text-sm text-muted-foreground">
                This customer hasn't placed any orders yet.
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/orders/new?customer=${customer.id}`)}
              >
                Create Order
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetail;
