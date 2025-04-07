
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  MoreVertical,
  Plus,
  Search,
  Truck,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToastProvider } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
}

interface Order {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderListProps {
  orders: Order[];
  customers: Customer[];
  products: Product[];
  onStatusChange: (id: string, status: "placed" | "shipped" | "delivered" | "cancelled") => void;
}

const statusStyles = {
  placed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  shipped: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  delivered: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
};

const OrderList = ({ orders, customers, products, onStatusChange }: OrderListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [customerFilter, setCustomerFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract all unique product categories
  const categories = Array.from(
    new Set(products.map(product => product.category))
  ).sort();

  // Apply filters
  const filteredOrders = orders.filter(order => {
    // Customer name filter
    const customer = customers.find(c => c.id === order.customerId);
    const customerName = customer ? customer.name.toLowerCase() : "";
    const matchesSearch = customerName.includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = !statusFilter || order.status === statusFilter;

    // Customer filter
    const matchesCustomer = !customerFilter || order.customerId === customerFilter;

    // Category filter - check if any product in order belongs to the selected category
    const matchesCategory = !categoryFilter || order.products.some(item => {
      const product = products.find(p => p.id === item.productId);
      return product && product.category === categoryFilter;
    });

    return matchesSearch && matchesStatus && matchesCustomer && matchesCategory;
  });

  // Get customer name by ID
  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : "Unknown Customer";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleStatusChange = (orderId: string, newStatus: "placed" | "shipped" | "delivered" | "cancelled") => {
    onStatusChange(orderId, newStatus);

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

  // Check if there's a customer filter in the URL params
  React.useEffect(() => {
    const customerIdFromUrl = searchParams.get("customer");
    if (customerIdFromUrl) {
      setCustomerFilter(customerIdFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate("/orders/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filters:</span>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 text-xs px-3 w-[130px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="placed">Placed</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={customerFilter} onValueChange={setCustomerFilter}>
            <SelectTrigger className="h-8 text-xs px-3 w-[150px]">
              <SelectValue placeholder="All Customers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Customers</SelectItem>
              {customers.map(customer => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-8 text-xs px-3 w-[150px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(statusFilter || customerFilter || categoryFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatusFilter("");
                setCustomerFilter("");
                setCategoryFilter("");
              }}
              className="h-8 px-3"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  {orders.length === 0 ? (
                    <div className="flex flex-col items-center gap-2">
                      <p>No orders found</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/orders/new")}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create your first order
                      </Button>
                    </div>
                  ) : (
                    "No orders match your filters"
                  )}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{getCustomerName(order.customerId)}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Badge className={cn(statusStyles[order.status], "capitalize")}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigate(`/orders/${order.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/orders/edit/${order.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          disabled={order.status === "placed"}
                          onClick={() => handleStatusChange(order.id, "placed")}
                        >
                          <ShoppingBag className="mr-2 h-4 w-4 text-blue-600" />
                          Mark as Placed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "shipped" || order.status === "cancelled"}
                          onClick={() => handleStatusChange(order.id, "shipped")}
                        >
                          <Truck className="mr-2 h-4 w-4 text-yellow-600" />
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "delivered" || order.status === "cancelled"}
                          onClick={() => handleStatusChange(order.id, "delivered")}
                        >
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Mark as Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "cancelled"}
                          onClick={() => handleStatusChange(order.id, "cancelled")}
                        >
                          <XCircle className="mr-2 h-4 w-4 text-red-600" />
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrderList;
