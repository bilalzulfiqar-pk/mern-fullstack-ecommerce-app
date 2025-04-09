const express = require("express");
const { placeOrder } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// Route to place an order
router.post("/place-order", authMiddleware, placeOrder);

// Fetch all orders (Admin only)
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

// Update order status (Admin only)
router.patch(
  "/:orderId/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;
