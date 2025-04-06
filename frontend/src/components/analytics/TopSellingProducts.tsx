
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TopProduct {
  id: string;
  name: string;
  category: string;
  quantity: number;
  revenue: number;
  imageUrl: string;
}

interface TopSellingProductsProps {
  products: TopProduct[];
  totalSold: number;
}

const TopSellingProducts = ({ products, totalSold }: TopSellingProductsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>
          Products with the highest sales volume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded overflow-hidden bg-muted shrink-0">
                  <img 
                    src={product.imageUrl || "/placeholder.svg"} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate pr-2">
                      {product.name}
                    </p>
                    <span className="text-sm font-semibold shrink-0">
                      {formatCurrency(product.revenue)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{product.category}</span>
                    <span>{product.quantity} sold</span>
                  </div>
                </div>
              </div>
              <Progress value={(product.quantity / totalSold) * 100} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
