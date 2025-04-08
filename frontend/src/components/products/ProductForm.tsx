import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ImagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useProductStore } from "../../store/useProductStore";

interface ProductFormProps {
  editMode?: boolean;
  initialData?: {
    _id?: string;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  };
}

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

const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  description: yup.string().optional(),
  imageUrl: yup.string().url("Must be a valid URL").optional()
});

type ProductFormValues = yup.InferType<typeof schema>;

const ProductForm = ({ editMode = false, initialData }: ProductFormProps) => {
  const navigate = useNavigate();
  const { addProduct, updateProduct } = useProductStore();

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || ""
    }
  });

  const imageUrl = watch("imageUrl");

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("price", values.price.toString());
      formData.append("description", values.description || "");
      formData.append("imageUrl", values.imageUrl || "/placeholder.svg");

      if (editMode && initialData?._id) {
        await updateProduct(initialData._id, formData);
        toast({
          title: "Product updated",
          description: "Product updated successfully",
          variant: "success"
        });
      } else {
        await addProduct(formData);
        toast({
          title: "Product added",
          description: "New product added successfully",
          variant: "success"
        });
      }

      reset();
      navigate("/products");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "error"
      });
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" {...register("name")} disabled={isSubmitting} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
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
                )}
              />
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
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
                  className="pl-7"
                  {...register("price")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                {...register("imageUrl")}
                disabled={isSubmitting}
              />
              {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...register("description")}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
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
