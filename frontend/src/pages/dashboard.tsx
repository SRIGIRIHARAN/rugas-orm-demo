
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import SalesByCategory from "@/components/dashboard/SalesByCategory";
import SalesOverTime from "@/components/dashboard/SalesOverTime";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { generateMockData, getOrderStatusCounts } from "@/lib/mockData";

interface Order {
  id: string;
  customerId: string;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
}

interface Customer {
  id: string;
  name: string;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load data from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    
    setOrders(storedOrders);
    setCustomers(storedCustomers);
  }, []);
  
  // Calculate statistics
  const totalOrders = orders.length;
  const totalCustomers = customers.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === "placed").length;
  
  // Format numbers
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Get recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map(order => ({
      id: order.id,
      customer: customers.find(c => c.id === order.customerId)?.name || "Unknown",
      date: new Date(order.createdAt).toLocaleDateString(),
      status: order.status,
      total: formatCurrency(order.total)
    }));
  
  // Chart data
  const salesByCategoryData = [
    { name: "Electronics", value: 3500, color: "#3b82f6" },
    { name: "Clothing", value: 1200, color: "#10b981" },
    { name: "Home & Kitchen", value: 800, color: "#f59e0b" },
    { name: "Books", value: 500, color: "#8b5cf6" },
    { name: "Other", value: 1000, color: "#6b7280" },
  ];
  
  const salesOverTimeData = [
    { date: "Jan 2023", sales: 2100 },
    { date: "Feb 2023", sales: 2400 },
    { date: "Mar 2023", sales: 2900 },
    { date: "Apr 2023", sales: 3100 },
    { date: "May 2023", sales: 3800 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(totalRevenue)} 
          description="All time revenue"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          trend={12}
          trendLabel="vs last month"
        />
        <StatCard 
          title="Orders" 
          value={totalOrders.toString()} 
          description="Total orders placed"
          icon={<Package className="h-5 w-5 text-primary" />}
          trend={8}
          trendLabel="vs last month"
        />
        <StatCard 
          title="Customers" 
          value={totalCustomers.toString()} 
          description="Unique customers"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend={5}
          trendLabel="vs last month"
        />
        <StatCard 
          title="Pending Orders" 
          value={pendingOrders.toString()} 
          description="Orders awaiting shipment"
          icon={<ShoppingCart className="h-5 w-5 text-primary" />}
          trend={-3}
          trendLabel="vs last month"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesOverTime data={salesOverTimeData} />
        <SalesByCategory data={salesByCategoryData} />
      </div>
      
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
};

export default Dashboard;
