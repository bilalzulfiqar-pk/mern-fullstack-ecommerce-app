const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQty,
  clearCart
} = require("../controllers/cartController");
const { protect } = require("../middleware/cartAuthMiddleware");

const router = express.Router();

// Routes
router.get("/", protect, getCart); // Fetch user's cart
router.patch("/add", protect, addToCart); // Add to cart
router.delete("/clear", protect, clearCart);
router.delete("/:productId", protect, removeFromCart); // Remove from cart
router.patch("/update/:productId", protect, updateCartQty); // New route for updating qty


module.exports = router;
