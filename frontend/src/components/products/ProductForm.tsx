
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus } from "lucide-react";

interface ProductFormProps {
  editMode?: boolean;
  initialData?: {
    id?: string;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  };
}

const ProductForm = ({ editMode = false, initialData }: ProductFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books",
    "Toys & Games",
    "Health & Beauty",
    "Sports & Outdoors",
    "Automotive",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !price) {
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
      const products = JSON.parse(localStorage.getItem("products") || "[]");

      if (editMode && initialData?.id) {
        const updatedProducts = products.map((product: any) =>
          product.id === initialData.id
            ? {
              ...product,
              name,
              category,
              price: parseFloat(price),
              description,
              imageUrl
            }
            : product
        );

        localStorage.setItem("products", JSON.stringify(updatedProducts));

        toast({
          title: "Product updated",
          description: "Product information has been updated successfully",
        });
      } else {
        const newProduct = {
          id: Date.now().toString(),
          name,
          category,
          price: parseFloat(price),
          description,
          imageUrl: imageUrl || "/placeholder.svg",
          createdAt: new Date().toISOString(),
        };

        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));

        toast({
          title: "Product added",
          description: "New product has been added successfully",
        });
      }

      navigate("/products");
      setIsLoading(false);
    }, 800);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Product" : "Add New Product"}</CardTitle>
        <CardDescription>
          {editMode
            ? "Update product information"
            : "Enter the details to add a new product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={isLoading}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-7"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={4}
            />
          </div>

          {/* Image preview */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Image Preview</p>
            {imageUrl ? (
              <div className="border rounded-md overflow-hidden w-full max-w-xs h-40">
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            ) : (
              <div className="border rounded-md w-full max-w-xs h-40 flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <ImagePlus className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">No image provided</p>
                  <p className="text-xs">Default placeholder will be used</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/products")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? (editMode ? "Updating..." : "Creating...")
                : (editMode ? "Update Product" : "Add Product")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
