import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCustomerStore } from '../../store/useCustomerStore';
import { useProductStore } from '../../store/useProductStore';
import { useOrderStore } from '../../store/useOrderStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const orderSchema = yup.object().shape({
  customerId: yup.string().required('Customer is required'),
  products: yup
    .array()
    .of(
      yup.object().shape({
        productId: yup.string().required('Product is required'),
        quantity: yup
          .number()
          .required('Quantity is required')
          .min(1, 'Quantity must be at least 1'),
      })
    )
    .min(1, 'At least one product must be selected'),
  status: yup
    .string()
    .oneOf(['placed', 'shipped', 'delivered', 'cancelled'])
    .required('Status is required'),
  notes: yup.string(),
});

interface OrderFormData {
  id?: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  status: "placed" | "shipped" | "delivered" | "cancelled";
  notes: string;
}

interface OrderFormProps {
  editMode?: boolean;
  initialData?: OrderFormData;
  onSubmit: (data: OrderFormData) => void;
}
const OrderForm = ({ editMode = false, initialData }: OrderFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { customers, fetchCustomers } = useCustomerStore();
  const { products, fetchProducts } = useProductStore();
  const { createOrder, updateOrder } = useOrderStore();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      customerId: initialData?.customerId || '',
      products: initialData?.products || [{ productId: '', quantity: 1 }],
      status: initialData?.status || 'placed',
      notes: initialData?.notes || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  useEffect(() => {
    fetchCustomers();
    fetchProducts();

    const customerIdParam = searchParams.get('customer');
    const productIdParam = searchParams.get('product');

    if (customerIdParam && !initialData) {
      setValue('customerId', customerIdParam);
    }
    if (productIdParam && !initialData) {
      setValue('products', [{ productId: productIdParam, quantity: 1 }]);
    }
  }, [fetchCustomers, fetchProducts, searchParams, initialData, setValue]);

  const onSubmit = async (data: any) => {
    try {
      if (editMode && initialData?.id) {
        await updateOrder(initialData.id, data);
      } else {
        await createOrder(data);
        console.log('data.customerId', data.customerId)
      }

      toast({
        title: editMode ? 'Order updated' : 'Order created',
        description: editMode
          ? 'Order has been updated successfully.'
          : 'New order has been created successfully.',
        variant: 'success',
      });
      navigate('/orders');
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: 'Error',
        description: 'Something went wrong while saving the order.',
        variant: 'error',
      });
    }
  };

  const calculateTotal = () => {
    return fields.reduce((total, item, index) => {
      const product = products.find(
        (p) => p._id === watch(`products.${index}.productId`)
      );
      const quantity = watch(`products.${index}.quantity`);
      return total + (product?.price || 0) * (quantity || 0);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-3xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>{editMode ? 'Edit Order' : 'Create Order'}</CardTitle>
          <CardDescription>Fill in the order details below.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Customer</Label>
            <Controller
              control={control}
              name="customerId"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer._id} value={customer._id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.customerId && (
              <p className="text-sm text-red-500 mt-1">
                {errors.customerId.message}
              </p>
            )}
          </div>

          {/* Products */}
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-lg relative"
            >
              <div>
                <Label>Product</Label>
                <Controller
                  control={control}
                  name={`products.${index}.productId`}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product._id} value={product._id}>
                            {product.name} - ${product.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.products?.[index]?.productId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.products[index]?.productId?.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Quantity</Label>
                <Controller
                  control={control}
                  name={`products.${index}.quantity`}
                  render={({ field }) => (
                    <Input type="number" min={1} {...field} />
                  )}
                />
                {errors.products?.[index]?.quantity && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.products[index]?.quantity?.message}
                  </p>
                )}
              </div>

              <Button
                type="button"
                variant="ghost"
                className="absolute top-2 right-2 text-red-500"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ productId: '', quantity: 1 })}
          >
            + Add Product
          </Button>

          {/* Status */}
          <div>
            <Label>Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placed">Placed</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-sm text-red-500 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <Label>Notes</Label>
            <Controller
              control={control}
              name="notes"
              render={({ field }) => <Textarea rows={3} {...field} />}
            />
          </div>

          <div className="text-right font-medium text-lg">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {editMode ? 'Update Order' : 'Create Order'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default OrderForm;
