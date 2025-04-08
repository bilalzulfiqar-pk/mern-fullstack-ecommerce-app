const Order = require("../models/order");
const Product = require("../models/product"); // To check if the product exists
const User = require("../models/user"); // To find the user who placed the order

// Place Order Controller
const placeOrder = async (req, res) => {
  const userId = req.user.id; // Extracted from token
  const { cartItems, shippingDetails } = req.body; // Get data from the request body

  try {
    // Ensure that user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Prepare the products in the order
    const orderProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        // Safely default tax to 0 if undefined
        const tax = product.tax || 0;

        return {
          productId: product._id,
          name: product.name,
          qty: item.qty,
          price: product.currentPrice,
          previousPrice: product.previousPrice || null,
          tax,
          image: product.image,
          supplier: product.supplier?.name || "",
        };
      })
    );

    // Calculate subtotal using previousPrice if it exists, else currentPrice
    const subtotal = orderProducts.reduce((acc, item) => {
      const priceToUse =
        item.previousPrice > 0 ? item.previousPrice : item.price;
      return acc + priceToUse * item.qty;
    }, 0);

    // Calculate total discount
    const totalDiscount = orderProducts.reduce((acc, item) => {
      const hasDiscount = item.previousPrice > 0 && item.price;
      const discount = hasDiscount
        ? (item.previousPrice - item.price) * item.qty
        : 0;
      return acc + discount;
    }, 0);

    // Calculate total tax
    const totalTax = orderProducts.reduce((acc, item) => {
      return acc + (item.tax || 0) * item.qty;
    }, 0);

    // Final total price
    const totalPrice = subtotal - totalDiscount + totalTax;

    // Create the order
    const order = new Order({
      user: user._id,
      products: orderProducts,
      shippingDetails,
      subtotal,
      totalDiscount,
      totalTax,
      totalPrice,
    });

    // Save the order in the database
    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

module.exports = { placeOrder };
