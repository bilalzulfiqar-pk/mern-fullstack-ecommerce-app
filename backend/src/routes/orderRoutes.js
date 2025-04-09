const express = require("express");
const { placeOrder, getOrders, updateOrderStatus, getAllOrders, getOrderDetails } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Route to place an order
router.post("/place-order", authMiddleware, placeOrder);

// Fetch all orders (Admin only)
// router.get("/", authMiddleware, adminMiddleware, getAllOrders);

// Route to get all orders (with optional status filter and pagination)
router.get("/", authMiddleware, adminMiddleware, getOrders);

// Update order status (Admin only)
router.patch(
  "/:orderId/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// Route to get order details by ID (Admin only)
router.get("/:id", authMiddleware, adminMiddleware, getOrderDetails);

module.exports = router;
