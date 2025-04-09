const Order = require("../models/Order");
const Customer = require("../models/Customer");

exports.getDashboardStats = async (req, res) => {
    try {
        const orders = await Order.find();
        const customers = await Customer.find();

        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(o => o.status === "placed").length;

        res.json({
            status: "success",
            data: {
                totalRevenue,
                totalOrders: orders.length,
                totalCustomers: customers.length,
                pendingOrders,
            },
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

exports.getRecentOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(5).lean();
      const customers = await Customer.find().lean();
  
      const data = orders.map((order) => ({
        id: order._id,
        customer:
          customers.find((c) => c._id.toString() === order.customer?.toString())
            ?.name || "Unknown",
        date: new Date(order.createdAt).toLocaleDateString(),
        status: order.status,
        total: `$${order.total?.toLocaleString() ?? "0"}`,
      }));
  
      res.json({
        status: "success",
        data,
      });
    } catch (err) {
      console.error("Error fetching recent orders:", err);
      res.status(500).json({ status: "error", message: "Failed to fetch orders" });
    }
  };
  
