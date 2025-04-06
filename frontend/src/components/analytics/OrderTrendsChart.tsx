
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderTrend {
  name: string;
  orders: number;
  revenue: number;
}

interface OrderTrendsChartProps {
  data: OrderTrend[];
}

const OrderTrendsChart = ({ data }: OrderTrendsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Trends</CardTitle>
        <CardDescription>
          Monthly orders and revenue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') {
                    return [`$${value}`, 'Revenue'];
                  }
                  return [value, 'Orders'];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="orders" fill="hsl(var(--primary))" name="Orders" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrendsChart;
