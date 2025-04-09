const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getRecentOrders,
} = require("../controllers/dashboardController");

router.get("/stats", getDashboardStats);
router.get("/recent-orders", getRecentOrders);

module.exports = router;
