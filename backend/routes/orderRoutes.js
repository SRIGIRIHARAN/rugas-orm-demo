const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const orderController = require("../controllers/orderController");
// Create a new order
router.post("/", orderController.createOrder);

// Get all orders with optional query filters
router.get("/getAllorder", orderController.getAllOrders);

// Get a single order by ID
router.get("/:id", orderController.getOrderById);

// Update order status
router.patch("/:id/status", orderController.updateOrderStatus);

// Update full order (general update)
router.put("/:id", orderController.updateOrder);

module.exports = router;
