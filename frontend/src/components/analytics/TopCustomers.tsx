
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopCustomer {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
}

interface TopCustomersProps {
  customers: TopCustomer[];
}

const TopCustomers = ({ customers }: TopCustomersProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>
          Customers with the highest spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer, index) => (
            <div key={customer.id} className="flex items-center gap-3 p-3 rounded-md bg-muted/40 border">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm shrink-0">
                {index + 1}
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-medium truncate">{customer.name}</p>
                <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold">{formatCurrency(customer.totalSpent)}</p>
                <Badge variant="outline" className="mt-1">
                  {customer.totalOrders} {customer.totalOrders === 1 ? 'order' : 'orders'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCustomers;
