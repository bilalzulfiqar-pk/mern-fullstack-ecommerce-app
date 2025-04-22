const Review = require("../models/review.js");
const Order = require("../models/order.js");
const Product = require("../models/product.js");

// POST: Create a review for a product
const createReview = async (req, res) => {
  const { productId, orderId, rating, comment } = req.body;
  const userId = req.user.id; // Get user ID from the request

  try {
    // 1. Check if this product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // console.log(orderId, userId, rating, comment, productId);

    // 2. Check if the user placed this order
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      "products.productId": productId,
    });

    if (!order)
      return res.status(400).json({ message: "Invalid order or product" });

    // 3. Check if this review already exists
    const existingReview = await Review.findOne({
      product: productId,
      user: userId,
      order: orderId,
    });
    if (existingReview)
      return res
        .status(400)
        .json({ message: "You already reviewed this product in this order" });

    // 4. Create review
    const newReview = new Review({
      product: productId,
      user: userId,
      order: orderId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong, please try again later.",
      // message: err.message
    });
  }
};

// GET: Get all reviews for a product
const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId })
      .populate("user", "name") // show user's name
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: Check if the user has reviewed a product in a specific order
const checkReviewStatus = async (req, res) => {
  try {
    const { productId, orderId } = req.params;
    const userId = req.user.id; // Get user ID from the request

    // console.log(productId, orderId, userId);

    // Find if a review exists for this combination of product, user, and order
    const review = await Review.findOne({
      product: productId,
      user: userId,
      order: orderId,
    });

    // console.log(review);

    if (review) {
      return res.status(200).json({ reviewed: true });
    }

    res.status(200).json({ reviewed: false });
  } catch (error) {
    console.error("Error checking review status:", error);
    res.status(500).json({ message: "Error checking review status" });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  checkReviewStatus,
};
