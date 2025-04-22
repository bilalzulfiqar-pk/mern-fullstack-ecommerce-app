const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createReview,
  getProductReviews,
  checkReviewStatus,
} = require("../controllers/reviewController");

// POST /api/reviews/ — Create a review
router.post("/", authMiddleware, createReview);

// GET /api/reviews/product/:productId — Get all reviews for a product
router.get('/product/:productId', getProductReviews);

// Route to check if the user has reviewed a product in a specific order
router.get('/check-review/:productId/:orderId', authMiddleware, checkReviewStatus);

module.exports = router;
