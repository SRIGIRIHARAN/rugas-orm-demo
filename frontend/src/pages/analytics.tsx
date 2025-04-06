
import React, { useEffect, useState } from "react";
import { 
  generateMockData, 
  getOrderStatusCounts, 
  getOrderTrends, 
  getTopProducts, 
  getTopCustomers 
} from "@/lib/mockData";
import OrderStatusChart from "@/components/analytics/OrderStatusChart";
import OrderTrendsChart from "@/components/analytics/OrderTrendsChart";
import TopSellingProducts from "@/components/analytics/TopSellingProducts";
import TopCustomers from "@/components/analytics/TopCustomers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  const [orderStatusData, setOrderStatusData] = useState<Array<{
    status: string;
    count: number;
    color: string;
  }>>([]);
  
  const [orderTrendsData, setOrderTrendsData] = useState<Array<{
    name: string;
    orders: number;
    revenue: number;
  }>>([]);
  
  const [topProducts, setTopProducts] = useState<Array<{
    id: string;
    name: string;
    category: string;
    quantity: number;
    revenue: number;
    imageUrl: string;
  }>>([]);
  
  const [totalProductsSold, setTotalProductsSold] = useState(0);
  
  const [topCustomers, setTopCustomers] = useState<Array<{
    id: string;
    name: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
  }>>([]);
  
  useEffect(() => {
    // Initialize mock data
    generateMockData();
    
    // Load analytics data
    setOrderStatusData(getOrderStatusCounts());
    setOrderTrendsData(getOrderTrends());
    
    const topProductsData = getTopProducts();
    setTopProducts(topProductsData.topProducts);
    setTotalProductsSold(topProductsData.totalSold);
    
    setTopCustomers(getTopCustomers());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderTrendsChart data={orderTrendsData} />
        <OrderStatusChart data={orderStatusData} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopSellingProducts products={topProducts} totalSold={totalProductsSold} />
        <TopCustomers customers={topCustomers} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
