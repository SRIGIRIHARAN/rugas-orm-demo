const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { customerId, products, status, notes } = req.body;
    const order = new Order({
      customer: customerId,
      products: products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity,
      })),
      status,
      notes,
    });

    await order.save();
    res.status(201).json({ status: "success", data: order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(400).json({ status: "error", message: err.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const filters = {};
    const { status, customer, category } = req.query;

    if (status) filters.status = status;
    if (customer) filters.customer = customer;

    const orders = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("product");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
