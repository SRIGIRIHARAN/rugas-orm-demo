
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

interface OrderFormProps {
  editMode?: boolean;
  initialData?: {
    id?: string;
    customerId: string;
    products: Array<{
      productId: string;
      quantity: number;
    }>;
    status: "placed" | "shipped" | "delivered" | "cancelled";
    notes: string;
  };
}

const OrderForm = ({ editMode = false, initialData }: OrderFormProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(initialData?.customerId || "");
  const [selectedProducts, setSelectedProducts] = useState<Array<{productId: string; quantity: number}>>(
    initialData?.products || []
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [status, setStatus] = useState<"placed" | "shipped" | "delivered" | "cancelled">(
    initialData?.status || "placed"
  );
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Load customers and products from localStorage
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    
    setCustomers(storedCustomers);
    setProducts(storedProducts);
    
    // Check for customer or product from URL params
    const customerIdParam = searchParams.get("customer");
    const productIdParam = searchParams.get("product");
    
    if (customerIdParam && !initialData) {
      setSelectedCustomerId(customerIdParam);
    }
    
    if (productIdParam && !initialData) {
      setSelectedProducts([{ productId: productIdParam, quantity: 1 }]);
    }
  }, [searchParams, initialData]);
  
  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { productId: "", quantity: 1 }]);
  };
  
  const handleRemoveProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };
  
  const handleProductChange = (index: number, productId: string) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].productId = productId;
    setSelectedProducts(updatedProducts);
  };
  
  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = quantity;
    setSelectedProducts(updatedProducts);
  };
  
  const calculateTotal = () => {
    return selectedProducts.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCustomerId) {
      toast({
        title: "Error",
        description: "Please select a customer",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedProducts.length === 0 || selectedProducts.some(p => !p.productId)) {
      toast({
        title: "Error",
        description: "Please select at least one product",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      
      if (editMode && initialData?.id) {
        const updatedOrders = orders.map((order: any) => 
          order.id === initialData.id 
            ? { 
                ...order, 
                customerId: selectedCustomerId, 
                products: selectedProducts, 
                status, 
                notes,
                updatedAt: new Date().toISOString()
              } 
            : order
        );
        
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        
        toast({
          title: "Order updated",
          description: "Order has been updated successfully",
        });
      } else {
        const newOrder = {
          id: Date.now().toString(),
          customerId: selectedCustomerId,
          products: selectedProducts,
          status,
          notes,
          total: calculateTotal(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
        
        toast({
          title: "Order created",
          description: "New order has been created successfully",
        });
      }
      
      navigate("/orders");
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Order" : "Create New Order"}</CardTitle>
        <CardDescription>
          {editMode 
            ? "Update order information" 
            : "Fill out the form to create a new order"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer *</Label>
            <Select
              value={selectedCustomerId}
              onValueChange={setSelectedCustomerId}
              disabled={isLoading}
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Customers</SelectLabel>
                  {customers.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No customers available
                    </SelectItem>
                  ) : (
                    customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {customers.length === 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                No customers found. Please{" "}
                <Button 
                  variant="link" 
                  className="h-auto p-0" 
                  onClick={() => navigate("/customers/new")}
                >
                  add a customer
                </Button>{" "}
                first.
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Products *</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddProduct}
                disabled={isLoading || products.length === 0}
              >
                Add Product
              </Button>
            </div>
            
            {products.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No products found. Please{" "}
                <Button 
                  variant="link" 
                  className="h-auto p-0" 
                  onClick={() => navigate("/products/new")}
                >
                  add a product
                </Button>{" "}
                first.
              </p>
            ) : (
              selectedProducts.length === 0 ? (
                <div className="text-center py-8 border rounded-md bg-muted/30">
                  <p className="text-muted-foreground">
                    No products selected. Click "Add Product" to add products to this order.
                  </p>
                </div>
              ) : (
                selectedProducts.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 p-3 border rounded-md bg-card">
                    <div className="flex-grow">
                      <Select
                        value={item.productId}
                        onValueChange={(value) => handleProductChange(index, value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Products</SelectLabel>
                            {products.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} ({formatCurrency(product.price)})
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="w-full sm:w-24">
                      <Input
                        type="number"
                        min="1"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveProduct(index)}
                      disabled={isLoading}
                      className="sm:self-center flex-shrink-0"
                    >
                      ✕
                    </Button>
                  </div>
                ))
              )
            )}
          </div>
          
          {editMode && (
            <div className="space-y-2">
              <Label htmlFor="status">Order Status</Label>
              <Select
                value={status}
                onValueChange={(value: "placed" | "shipped" | "delivered" | "cancelled") => setStatus(value)}
                disabled={isLoading}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placed">Placed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any special instructions or notes about this order"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
          
          {selectedProducts.length > 0 && selectedProducts.every(p => p.productId) && (
            <div className="bg-muted p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Total:</span>
                <span className="font-bold text-lg">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/orders")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading 
                ? (editMode ? "Updating..." : "Creating...") 
                : (editMode ? "Update Order" : "Create Order")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
