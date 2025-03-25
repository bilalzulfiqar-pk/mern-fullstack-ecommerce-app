const Cart = require("../models/cart");

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Fix: req.user.id is a string, not an object
    if (!userId)
      return res
        .status(401)
        .json({ message: "Unauthorized, userId is missing" });

    // const cart = await Cart.findOne({ userId }).populate("items.productId");

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "_id name sizes material supplier previousPrice currentPrice tax image"
    );

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add to cart / Increment quantity
const addToCart = async (req, res) => {
  try {
    // Could also use const userId = req.user.id;
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "User ID and Product ID are required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, qty: 1 }], // Ensure productId is being set correctly
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex !== -1) {
        cart.items[itemIndex].qty += 1;
      } else {
        cart.items.push({ productId, qty: 1 });
      }
    }

    await cart.save();
    res.json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from the middleware
    const { productId } = req.params; // Get productId from URL params

    if (!userId || !productId) {
      return res.status(400).json({ message: "User ID and Product ID are required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.json({ success: true, message: "Product removed", cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update item quantity in cart
const updateCartQty = async (req, res) => {
  try {
    const userId = req.user.id; // Extract from middleware
    const { productId } = req.params;
    const { qty } = req.body;

    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ message: "Invalid product ID or quantity" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items[itemIndex].qty = qty;
    await cart.save();

    res.json({ success: true, message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized, userId missing" });
    }

    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { getCart, addToCart, removeFromCart, updateCartQty, clearCart };
