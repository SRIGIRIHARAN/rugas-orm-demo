import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useCustomerStore, CustomerFormPayload } from "@/store/useCustomerStore";

const schema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
}).required();

type FormData = yup.InferType<typeof schema>;

interface CustomerFormProps {
  editMode?: boolean;
  initialData?: Partial<FormData> & { id?: string };
}

const CustomerForm: React.FC<CustomerFormProps> = ({ editMode = false, initialData }) => {
  const navigate = useNavigate();
  const { addCustomer, editCustomer } = useCustomerStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (editMode && initialData?.id) {
        await editCustomer(initialData.id, data as CustomerFormPayload);
        toast({
          title: "Customer Updated",
          description: "Customer details updated successfully.",
          variant: "success",
        });
      } else {
        await addCustomer(data as CustomerFormPayload);
        toast({
          title: "Customer Added",
          description: "New customer added successfully.",
          variant: "success",
        });
      }

      reset();
      navigate("/customers");
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "error",
      });
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input id="name" {...field} disabled={isSubmitting} />
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input id="email" type="email" {...field} disabled={isSubmitting} />
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input id="phone" {...field} disabled={isSubmitting} />
              )}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <Textarea
                  id="address"
                  rows={3}
                  {...field}
                  disabled={isSubmitting}
                />
              )}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/customers")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? editMode
                  ? "Updating..."
                  : "Creating..."
                : editMode
                  ? "Update Customer"
                  : "Add Customer"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CustomerForm;