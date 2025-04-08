import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useProductStore, Product } from "../../store/useProductStore";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const navigate = useNavigate();
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || product.category === categoryFilter)
  );

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      toast({
        title: "Product deleted",
        description: "The product has been deleted successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: "Something went wrong. Please try again.",
        variant: "error",
      });
    }
  };

  const formatCurrency = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex h-10 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Books">Books</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <Button onClick={() => navigate("/products/new")}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/30">
          {products.length === 0 ? (
            <div className="space-y-3">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Get started by adding your first product
              </p>
              <Button
                variant="outline"
                onClick={() => navigate("/products/new")}
                className="mt-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add your first product
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Search className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="text-lg font-medium">No matching products</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("");
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="truncate-2">
                      {product.description || "No description provided"}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/products/edit/${product._id}`)
                        }
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <AlertDialog>
                          <AlertDialogTrigger className="w-full flex items-center px-2 py-1.5 text-sm cursor-default text-red-600 focus:bg-accent">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                product.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-grow">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 pt-0 border-t mt-auto">
                <p className="font-bold">{formatCurrency(product.price)}</p>
                <Button
                  size="sm"
                  onClick={() => navigate(`/orders/new?product=${product._id}`)}
                >
                  Create Order
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
