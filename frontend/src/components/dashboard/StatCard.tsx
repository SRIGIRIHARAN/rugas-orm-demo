
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendLabel,
  className,
}: StatCardProps) => {
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    "text-xs font-medium",
                    isTrendPositive && "text-green-600",
                    isTrendNegative && "text-red-600",
                    !isTrendPositive && !isTrendNegative && "text-muted-foreground"
                  )}
                >
                  {isTrendPositive && "+"}
                  {trend}%
                </span>
                {trendLabel && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {trendLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
