import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import SalesByCategory from "@/components/dashboard/SalesByCategory";
import SalesOverTime from "@/components/dashboard/SalesOverTime";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";
import { useDashboardStore } from "../store/useDashboardStore";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { stats, recentOrders, loading, fetchDashboardData } = useDashboardStore();
  console.log('stats', stats)

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span className="text-muted-foreground">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            description="All time revenue"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
            trend={12}
            trendLabel="vs last month"
          />
          <StatCard
            title="Orders"
            value={stats.totalOrders.toString()}
            description="Total orders placed"
            icon={<Package className="h-5 w-5 text-primary" />}
            trend={8}
            trendLabel="vs last month"
          />
          <StatCard
            title="Customers"
            value={stats.totalCustomers.toString()}
            description="Unique customers"
            icon={<Users className="h-5 w-5 text-primary" />}
            trend={5}
            trendLabel="vs last month"
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders.toString()}
            description="Orders awaiting shipment"
            icon={<ShoppingCart className="h-5 w-5 text-primary" />}
            trend={-3}
            trendLabel="vs last month"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesOverTime
          data={[
            { date: "Jan 2023", sales: 2100 },
            { date: "Feb 2023", sales: 2400 },
            { date: "Mar 2023", sales: 2900 },
            { date: "Apr 2023", sales: 3100 },
            { date: "May 2023", sales: 3800 },
          ]}
        />
        <SalesByCategory
          data={[
            { name: "Electronics", value: 3500, color: "#3b82f6" },
            { name: "Clothing", value: 1200, color: "#10b981" },
            { name: "Home & Kitchen", value: 800, color: "#f59e0b" },
            { name: "Books", value: 500, color: "#8b5cf6" },
            { name: "Other", value: 1000, color: "#6b7280" },
          ]}
        />
      </div>

      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
};

export default Dashboard;
