
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CustomerFormProps {
  editMode?: boolean;
  initialData?: {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

const CustomerForm = ({ editMode = false, initialData }: CustomerFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call - in a real app, this would connect to your backend
    setTimeout(() => {
      const customers = JSON.parse(localStorage.getItem("customers") || "[]");
      
      if (editMode && initialData?.id) {
        const updatedCustomers = customers.map((customer: any) => 
          customer.id === initialData.id 
            ? { ...customer, name, email, phone, address } 
            : customer
        );
        
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
        
        toast({
          title: "Customer updated",
          description: "Customer information has been updated successfully",
        });
      } else {
        const newCustomer = {
          id: Date.now().toString(),
          name,
          email,
          phone,
          address,
          createdAt: new Date().toISOString(),
        };
        
        customers.push(newCustomer);
        localStorage.setItem("customers", JSON.stringify(customers));
        
        toast({
          title: "Customer added",
          description: "New customer has been added successfully",
        });
      }
      
      navigate("/customers");
      setIsLoading(false);
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Customer" : "Add New Customer"}</CardTitle>
        <CardDescription>
          {editMode 
            ? "Update customer information" 
            : "Enter the details to add a new customer"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              placeholder="123 Main St, City, State, ZIP"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/customers")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading 
                ? (editMode ? "Updating..." : "Creating...") 
                : (editMode ? "Update Customer" : "Add Customer")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;
