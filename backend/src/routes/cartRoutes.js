const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQty,
  clearCart
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Routes
router.get("/", authMiddleware, getCart); // Fetch user's cart
router.patch("/add", authMiddleware, addToCart); // Add to cart
router.delete("/clear", authMiddleware, clearCart);
router.delete("/:productId", authMiddleware, removeFromCart); // Remove from cart
router.patch("/update/:productId", authMiddleware, updateCartQty); // New route for updating qty


module.exports = router;
