// Generate consistent random data for demo purposes

export const generateMockData = () => {
  // Generate customer data if not exists
  if (!localStorage.getItem("customers")) {
    const customers = [
      {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        address: "123 Main St, San Francisco, CA 94105",
        createdAt: "2023-01-15T10:30:00.000Z",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "(555) 234-5678",
        address: "456 Oak Ave, New York, NY 10001",
        createdAt: "2023-02-20T14:45:00.000Z",
      },
      {
        id: "3",
        name: "Michael Johnson",
        email: "michael.j@example.com",
        phone: "(555) 345-6789",
        address: "789 Pine Rd, Chicago, IL 60007",
        createdAt: "2023-03-10T09:15:00.000Z",
      },
      {
        id: "4",
        name: "Emily Wilson",
        email: "emily.w@example.com",
        phone: "(555) 456-7890",
        address: "321 Maple Dr, Austin, TX 78701",
        createdAt: "2023-04-05T16:20:00.000Z",
      },
      {
        id: "5",
        name: "David Brown",
        email: "david.b@example.com",
        phone: "(555) 567-8901",
        address: "654 Cedar Ln, Seattle, WA 98101",
        createdAt: "2023-05-12T11:10:00.000Z",
      },
    ];
    
    localStorage.setItem("customers", JSON.stringify(customers));
  }
  
  // Generate products data if not exists
  if (!localStorage.getItem("products")) {
    const products = [
      {
        id: "1",
        name: "Smartphone X",
        category: "Electronics",
        price: 799.99,
        description: "Latest model with advanced features and high-resolution camera.",
        imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-01-05T08:30:00.000Z",
      },
      {
        id: "2",
        name: "Laptop Pro",
        category: "Electronics",
        price: 1299.99,
        description: "Powerful laptop with high performance for professionals.",
        imageUrl: "https://images.unsplash.com/photo-1575909812264-6deb974a5d15?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-01-10T09:45:00.000Z",
      },
      {
        id: "3",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 149.99,
        description: "Noise-cancelling headphones with premium sound quality.",
        imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
        createdAt: "2023-01-15T10:15:00.000Z",
      },
      {
        id: "4",
        name: "Casual T-Shirt",
        category: "Clothing",
        price: 24.99,
        description: "Comfortable cotton t-shirt for everyday wear.",
        imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop",
        createdAt: "2023-01-20T11:30:00.000Z",
      },
      {
        id: "5",
        name: "Denim Jeans",
        category: "Clothing",
        price: 59.99,
        description: "Classic denim jeans with perfect fit and durability.",
        imageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-01-25T12:45:00.000Z",
      },
      {
        id: "6",
        name: "Coffee Maker",
        category: "Home & Kitchen",
        price: 89.99,
        description: "Automatic coffee maker for the perfect brew every morning.",
        imageUrl: "https://images.unsplash.com/photo-1517468935973-7dd1e95ba37f?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-02-01T13:00:00.000Z",
      },
      {
        id: "7",
        name: "Blender",
        category: "Home & Kitchen",
        price: 49.99,
        description: "High-speed blender for smoothies and food processing.",
        imageUrl: "https://images.unsplash.com/photo-1543236949-62a3778b6aa4?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-02-05T14:15:00.000Z",
      },
      {
        id: "8",
        name: "Thriller Novel",
        category: "Books",
        price: 14.99,
        description: "Bestselling thriller novel that keeps you on the edge of your seat.",
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop",
        createdAt: "2023-02-10T15:30:00.000Z",
      },
      {
        id: "9",
        name: "Board Game",
        category: "Toys & Games",
        price: 34.99,
        description: "Family board game for hours of entertainment.",
        imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=2071&auto=format&fit=crop",
        createdAt: "2023-02-15T16:45:00.000Z",
      },
      {
        id: "10",
        name: "Facial Cleanser",
        category: "Health & Beauty",
        price: 18.99,
        description: "Gentle facial cleanser for all skin types.",
        imageUrl: "https://images.unsplash.com/photo-1616948006778-0a94ba22567d?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-02-20T17:00:00.000Z",
      },
      {
        id: "11",
        name: "Running Shoes",
        category: "Sports & Outdoors",
        price: 129.99,
        description: "Lightweight running shoes with superior cushioning.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-02-25T18:15:00.000Z",
      },
      {
        id: "12",
        name: "Car Phone Mount",
        category: "Automotive",
        price: 19.99,
        description: "Adjustable phone mount for safe driving.",
        imageUrl: "https://images.unsplash.com/photo-1622033318922-10e1de0a6cc2?q=80&w=2069&auto=format&fit=crop",
        createdAt: "2023-03-01T19:30:00.000Z",
      },
    ];
    
    localStorage.setItem("products", JSON.stringify(products));
  }
  
  // Generate orders data if not exists
  if (!localStorage.getItem("orders")) {
    const orders = [
      {
        id: "1001",
        customerId: "1",
        products: [
          { productId: "1", quantity: 1 },
          { productId: "3", quantity: 1 }
        ],
        status: "delivered",
        total: 949.98,
        notes: "Please deliver to the reception desk.",
        createdAt: "2023-03-05T10:30:00.000Z",
        updatedAt: "2023-03-10T14:30:00.000Z"
      },
      {
        id: "1002",
        customerId: "2",
        products: [
          { productId: "2", quantity: 1 },
          { productId: "6", quantity: 1 }
        ],
        status: "shipped",
        total: 1389.98,
        notes: "",
        createdAt: "2023-03-15T11:45:00.000Z",
        updatedAt: "2023-03-16T15:20:00.000Z"
      },
      {
        id: "1003",
        customerId: "3",
        products: [
          { productId: "4", quantity: 2 },
          { productId: "5", quantity: 1 }
        ],
        status: "delivered",
        total: 109.97,
        notes: "Gift wrap please.",
        createdAt: "2023-03-20T09:15:00.000Z",
        updatedAt: "2023-03-25T17:10:00.000Z"
      },
      {
        id: "1004",
        customerId: "4",
        products: [
          { productId: "7", quantity: 1 },
          { productId: "10", quantity: 2 }
        ],
        status: "placed",
        total: 87.97,
        notes: "",
        createdAt: "2023-04-01T13:20:00.000Z",
        updatedAt: "2023-04-01T13:20:00.000Z"
      },
      {
        id: "1005",
        customerId: "5",
        products: [
          { productId: "8", quantity: 3 },
          { productId: "9", quantity: 1 }
        ],
        status: "cancelled",
        total: 79.96,
        notes: "Changed my mind on this order.",
        createdAt: "2023-04-05T16:30:00.000Z",
        updatedAt: "2023-04-06T10:45:00.000Z"
      },
      {
        id: "1006",
        customerId: "1",
        products: [
          { productId: "11", quantity: 1 }
        ],
        status: "delivered",
        total: 129.99,
        notes: "",
        createdAt: "2023-04-10T14:25:00.000Z",
        updatedAt: "2023-04-15T11:30:00.000Z"
      },
      {
        id: "1007",
        customerId: "2",
        products: [
          { productId: "12", quantity: 2 },
          { productId: "3", quantity: 1 }
        ],
        status: "shipped",
        total: 189.97,
        notes: "Please leave with neighbor if not home.",
        createdAt: "2023-04-15T10:10:00.000Z",
        updatedAt: "2023-04-16T15:50:00.000Z"
      },
      {
        id: "1008",
        customerId: "3",
        products: [
          { productId: "6", quantity: 1 },
          { productId: "7", quantity: 1 }
        ],
        status: "placed",
        total: 139.98,
        notes: "",
        createdAt: "2023-04-20T17:40:00.000Z",
        updatedAt: "2023-04-20T17:40:00.000Z"
      },
      {
        id: "1009",
        customerId: "5",
        products: [
          { productId: "1", quantity: 1 }
        ],
        status: "delivered",
        total: 799.99,
        notes: "This is a gift.",
        createdAt: "2023-04-25T13:15:00.000Z",
        updatedAt: "2023-04-30T14:20:00.000Z"
      },
      {
        id: "1010",
        customerId: "4",
        products: [
          { productId: "5", quantity: 2 },
          { productId: "4", quantity: 3 },
          { productId: "10", quantity: 1 }
        ],
        status: "shipped",
        total: 194.94,
        notes: "",
        createdAt: "2023-05-01T11:30:00.000Z",
        updatedAt: "2023-05-02T16:25:00.000Z"
      }
    ];
    
    localStorage.setItem("orders", JSON.stringify(orders));
  }
};

export const getOrderStatusCounts = () => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  
  const counts = {
    placed: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  };
  
  orders.forEach((order: any) => {
    counts[order.status as keyof typeof counts]++;
  });
  
  return [
    { status: "Placed", count: counts.placed, color: "#3b82f6" },
    { status: "Shipped", count: counts.shipped, color: "#f59e0b" },
    { status: "Delivered", count: counts.delivered, color: "#10b981" },
    { status: "Cancelled", count: counts.cancelled, color: "#ef4444" }
  ];
};

export const getOrderTrends = () => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  
  // Group orders by month
  const monthlyData: Record<string, { orders: number; revenue: number; name: string }> = {};
  
  orders.forEach((order: any) => {
    const date = new Date(order.createdAt);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { orders: 0, revenue: 0, name: monthName };
    }
    
    monthlyData[monthKey].orders++;
    monthlyData[monthKey].revenue += order.total;
  });
  
  // Convert to array and sort by date
  return Object.entries(monthlyData)
    .map(([key, data]) => ({
      name: data.name,
      orders: data.orders,
      revenue: Math.round(data.revenue)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getTopProducts = () => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  
  // Count product quantities and revenue
  const productCounts: Record<string, { quantity: number; revenue: number }> = {};
  
  orders.forEach((order: any) => {
    if (order.status !== "cancelled") {
      order.products.forEach((item: any) => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = { quantity: 0, revenue: 0 };
        }
        
        const product = products.find((p: any) => p.id === item.productId);
        if (product) {
          productCounts[item.productId].quantity += item.quantity;
          productCounts[item.productId].revenue += product.price * item.quantity;
        }
      });
    }
  });
  
  // Get product details and sort by quantity sold
  const topProducts = Object.entries(productCounts)
    .map(([id, data]) => {
      const product = products.find((p: any) => p.id === id);
      return {
        id,
        name: product?.name || "Unknown Product",
        category: product?.category || "Uncategorized",
        quantity: data.quantity,
        revenue: data.revenue,
        imageUrl: product?.imageUrl || ""
      };
    })
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  
  const totalSold = topProducts.reduce((sum, product) => sum + product.quantity, 0);
  
  return { topProducts, totalSold };
};

export const getTopCustomers = () => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const customers = JSON.parse(localStorage.getItem("customers") || "[]");
  
  // Sum up customer spending
  const customerSpending: Record<string, { orders: number; spent: number }> = {};
  
  orders.forEach((order: any) => {
    if (order.status !== "cancelled") {
      if (!customerSpending[order.customerId]) {
        customerSpending[order.customerId] = { orders: 0, spent: 0 };
      }
      
      customerSpending[order.customerId].orders++;
      customerSpending[order.customerId].spent += order.total;
    }
  });
  
  // Get customer details and sort by amount spent
  return Object.entries(customerSpending)
    .map(([id, data]) => {
      const customer = customers.find((c: any) => c.id === id);
      return {
        id,
        name: customer?.name || "Unknown Customer",
        email: customer?.email || "",
        totalOrders: data.orders,
        totalSpent: data.spent
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);
};

export const getCustomerOrderSummary = (customerId: string) => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  
  const customerOrders = orders.filter((order: any) => 
    order.customerId === customerId && order.status !== "cancelled"
  );
  
  if (customerOrders.length === 0) {
    return null;
  }
  
  const totalOrders = customerOrders.length;
  const totalSpent = customerOrders.reduce((sum: number, order: any) => sum + order.total, 0);
  
  // Find the most recent order date
  const lastOrderDate = customerOrders
    .map((order: any) => new Date(order.createdAt))
    .sort((a: Date, b: Date) => b.getTime() - a.getTime())[0]
    .toISOString();
  
  return {
    totalOrders,
    totalSpent,
    lastOrderDate
  };
};
