const Review = require('../models/review');
const Product = require('../models/product');

const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });

  const numReviews = reviews.length;
  const avgRating = numReviews === 0
    ? 0
    : reviews.reduce((acc, r) => acc + r.rating, 0) / numReviews;

  await Product.findByIdAndUpdate(productId, {
    rating: avgRating.toFixed(1), // e.g., 4.3
    reviews: numReviews,
  });
};

module.exports = updateProductRating;
