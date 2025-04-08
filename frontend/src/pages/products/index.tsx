import { useEffect } from "react";
import ProductList from "../../components/products/ProductList";
import { useProductStore } from "../../store/useProductStore";

const ProductsPage = () => {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
