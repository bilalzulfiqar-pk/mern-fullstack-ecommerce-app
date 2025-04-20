const express = require("express");
const { placeOrder, getOrders, updateOrderStatus, getAllOrders, getOrderDetails, getMyOrders, getMyOrderDetails } = require("../controllers/orderController");
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

// Route to get my orders (User only)
router.get("/my-orders", authMiddleware, getMyOrders);

// Route for logged-in user to get their own order by ID
router.get("/my/:id", authMiddleware, getMyOrderDetails);

// Route to get order details by ID (Admin only)
router.get("/:id", authMiddleware, adminMiddleware, getOrderDetails);


module.exports = router;
