
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Tag, Clock, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card className="md:col-span-2 overflow-hidden">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img 
            src={product.imageUrl || "/placeholder.svg"} 
            alt={product.name}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </div>
      </Card>
      
      <Card className="md:col-span-3">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <CardDescription>Product Details</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate(`/products/edit/${product.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Description</h3>
            <p className="text-muted-foreground">
              {product.description || "No description provided."}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Price</p>
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                <p className="text-xl font-bold">{formatCurrency(product.price)}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Added On</p>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <p>{formatDate(product.createdAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/products")}
          >
            Back to Products
          </Button>
          <Button 
            onClick={() => navigate(`/orders/new?product=${product.id}`)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Create Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetail;
