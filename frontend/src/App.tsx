import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AppLayout from "./components/layout/AppLayout";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import CustomersPage from "./pages/customers/index";
import NewCustomerPage from "./pages/customers/new";
import EditCustomerPage from "./pages/customers/edit/[id]";
import CustomerDetailsPage from "./pages/customers/[id]";
import ProductsPage from "./pages/products/index";
import NewProductPage from "./pages/products/new";
import EditProductPage from "./pages/products/edit/[id]";
import ProductDetailsPage from "./pages/products/[id]";
import OrdersPage from "./pages/orders/index";
import NewOrderPage from "./pages/orders/new";
import EditOrderPage from "./pages/orders/edit/[id]";
import OrderDetailsPage from "./pages/orders/[id]";
import ProfilePage from "./pages/profile";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./components/ui/use-toast";

// Initialize query client for React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ToastProvider />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes - wrapped in AppLayout */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Customer routes */}
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/customers/new" element={<NewCustomerPage />} />
              <Route path="/customers/edit/:id" element={<EditCustomerPage />} />
              <Route path="/customers/:id" element={<CustomerDetailsPage />} />
              
              {/* Product routes */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/new" element={<NewProductPage />} />
              <Route path="/products/edit/:id" element={<EditProductPage />} />
              <Route path="/products/:id" element={<ProductDetailsPage />} />
              
              {/* Order routes */}
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders/edit/:id" element={<EditOrderPage />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              
              {/* Other routes */}
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
